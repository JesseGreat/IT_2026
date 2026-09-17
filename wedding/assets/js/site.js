/* ============================================================================
   site.js — shared chrome for every page: masthead, navigation, music, offline.
   Content comes from data.js; nothing in here needs editing to change wording.
   ========================================================================== */
(function () {
  "use strict";

  const W = window.WEDDING;
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ── small helpers ────────────────────────────────────────────────────── */
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /** "19:45" → "7:45 pm" */
  function prettyTime(hhmm) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || "").trim());
    if (!m) return hhmm || "";
    let h = +m[1];
    const suffix = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return h + ":" + m[2] + " " + suffix;
  }

  /* Which page are we on? Tolerant of hosts that serve "/church" instead of
     "/church.html", so the nav still highlights correctly either way. */
  const stem = (path) => String(path).split("/").pop().replace(/\.html$/, "") || "index";
  function pageFor(path) {
    const here = stem(path);
    const match = (window.WEDDING.nav || []).find((n) => stem(n.href) === here);
    return match ? match.href : "index.html";
  }
  let currentPage = pageFor(location.pathname);

  /* ── navigation icons ─────────────────────────────────────────────────── */
  const ICONS = {
    "index.html":
      '<path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/>',
    "church.html":
      '<path d="M12 2v3.5"/><path d="M10.2 3.7h3.6"/><path d="M5 21V11l7-4.6 7 4.6v10"/><path d="M9.6 21v-4.6a2.4 2.4 0 0 1 4.8 0V21"/>',
    "traditional.html":
      '<path d="M7.2 7h9.6l-1.4 11.5a1 1 0 0 1-1 .9H9.6a1 1 0 0 1-1-.9z"/><path d="M6 7h12"/><path d="M9 4.5c1-1.2 5-1.2 6 0"/><path d="M8.6 11.2h6.8"/>',
    "reception.html":
      '<path d="M6 4h12l-5.4 6.6v6.9"/><path d="M9.2 17.5h5.6"/><path d="M6 4l6 6.6"/>',
    "details.html":
      '<circle cx="12" cy="12" r="9"/><path d="M12 11.2v5"/><path d="M12 8h.01"/>',
  };

  function svgIcon(href) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONS[href] || ICONS["details.html"]) +
      "</svg>"
    );
  }

  /* ── masthead + bottom nav ────────────────────────────────────────────── */
  function fillMasthead() {
    const head = $("[data-masthead]");
    if (head) {
      head.className = "masthead";
      head.innerHTML =
        '<span class="masthead__mono">' + esc(W.couple.monogram) + "</span>" +
        '<span class="masthead__date">' + esc(W.event.dateShort) + "</span>";
    }
  }

  function markCurrentTab() {
    $$(".nav a").forEach((a) => {
      if (a.getAttribute("href") === currentPage) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function buildChrome() {
    fillMasthead();

    const nav = document.createElement("nav");
    nav.className = "nav";
    nav.setAttribute("data-persist", "");   // survives moving between tabs
    nav.setAttribute("aria-label", "Wedding programme");
    nav.innerHTML = W.nav
      .map((item) => {
        const here = item.href === currentPage;
        return (
          '<a href="' + esc(item.href) + '"' +
          (here ? ' aria-current="page"' : "") + ">" +
          svgIcon(item.href) +
          "<span>" + esc(item.short) + "</span></a>"
        );
      })
      .join("");
    document.body.appendChild(nav);
  }

  /* ══ MUSIC ═════════════════════════════════════════════════════════════
     Browsers refuse to play sound until the visitor interacts with the page.
     The envelope tap on the invitation is that interaction; from then on we
     carry the music across pages using sessionStorage, and fall back to a
     tap-to-resume button whenever the browser declines.

     Moving between tabs swaps the page content in place (see NAVIGATION
     below) rather than loading a new page, so the same audio element keeps
     playing uninterrupted. Only the music button stops it.
     ════════════════════════════════════════════════════════════════════ */
  const Music = (function () {
    const cfg = W.music || {};
    let audio = null;
    let toggle = null;
    let ducked = false;      // temporarily silenced (e.g. a gallery video is unmuted)
    let needsSeek = false;   // fresh element on a full page load: resume the saved spot

    const store = {
      get on()  { try { return sessionStorage.getItem("wed:music") !== "off"; } catch (e) { return true; } },
      set on(v) { try { sessionStorage.setItem("wed:music", v ? "on" : "off"); } catch (e) {} },
      get at()  { try { return parseFloat(sessionStorage.getItem("wed:musicAt")) || 0; } catch (e) { return 0; } },
      set at(v) { try { sessionStorage.setItem("wed:musicAt", String(v)); } catch (e) {} },
      get entered()  { try { return sessionStorage.getItem("wed:entered") === "1"; } catch (e) { return false; } },
      set entered(v) { try { sessionStorage.setItem("wed:entered", v ? "1" : "0"); } catch (e) {} },
    };

    /* iOS makes HTMLMediaElement.volume read-only — the physical buttons own
       it — so assigning to it there is silently ignored and the track would
       play at full blast. Detect that, and route through a Web Audio gain
       node instead, which iOS does honour. Everywhere else the plain
       .volume path is left exactly as it was. */
    let ctx = null, gainNode = null, useGain = false;

    function volumeIsSettable(a) {
      const original = a.volume;
      try {
        a.volume = 0.123;
        const ok = Math.abs(a.volume - 0.123) < 0.001;
        a.volume = original;
        return ok;
      } catch (e) { return false; }
    }

    function setupGain(a) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        const source = ctx.createMediaElementSource(a);   // once per element
        gainNode = ctx.createGain();
        gainNode.gain.value = 0;
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        useGain = true;
      } catch (e) {
        ctx = null; gainNode = null; useGain = false;     // fall back quietly
      }
    }

    function ensureAudio() {
      if (audio || !cfg.file) return audio;
      audio = new Audio(cfg.file);
      needsSeek = true;
      audio.loop = true;
      audio.preload = "auto";
      audio.addEventListener("error", () => {
        // No file supplied yet (see assets/audio/README.md) — fail silently.
        if (toggle) toggle.hidden = true;
      });

      if (volumeIsSettable(audio)) {
        audio.volume = 0;
      } else {
        setupGain(audio);          // iOS: the gain node carries the volume
      }
      return audio;
    }

    /** Fade to a target volume so nothing ever starts or stops abruptly. */
    function fadeTo(target, ms) {
      if (!audio) return;

      if (useGain && gainNode && ctx) {
        if (ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
        const now = ctx.currentTime;
        try {
          gainNode.gain.cancelScheduledValues(now);
          gainNode.gain.setValueAtTime(gainNode.gain.value, now);
          gainNode.gain.linearRampToValueAtTime(Math.max(0.0001, target), now + ms / 1000);
        } catch (e) {
          gainNode.gain.value = target;
        }
        if (target === 0) {
          setTimeout(() => {
            if (audio && !audio.paused && (!store.on || ducked)) audio.pause();
          }, ms + 30);
        }
        return;
      }

      const from = audio.volume;
      const start = performance.now();
      (function step(now) {
        const t = Math.min(1, (now - start) / ms);
        audio.volume = Math.max(0, Math.min(1, from + (target - from) * t));
        if (t < 1) requestAnimationFrame(step);
        else if (target === 0 && audio.paused === false && !store.on) audio.pause();
      })(start);
    }

    function paint() {
      if (!toggle) return;
      const playing = audio && !audio.paused && store.on && !ducked;
      toggle.classList.toggle("is-muted", !playing);
      toggle.setAttribute("aria-label", playing ? "Pause the music" : "Play the music");
      toggle.setAttribute("aria-pressed", playing ? "true" : "false");
    }

    function play(fromSaved) {
      const a = ensureAudio();
      if (!a) return Promise.resolve(false);
      // Only a brand-new element needs moving to the saved spot. Seeking a
      // paused element that already knows where it is would jump backwards.
      if (fromSaved && needsSeek && store.at) {
        const at = store.at;
        const seek = () => { try { a.currentTime = at; } catch (e) {} };
        // Seeking before the metadata arrives is ignored by some browsers,
        // which is what made the song restart from the top.
        if (a.readyState >= 1) seek();
        else a.addEventListener("loadedmetadata", seek, { once: true });
      }
      needsSeek = false;
      // A context created outside a gesture starts suspended; this is the
      // gesture, so wake it before asking for sound.
      if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
      const p = a.play();
      const done = (ok) => { paint(); return ok; };
      if (!p || !p.then) { fadeTo(cfg.volume != null ? cfg.volume : 0.35, 1800); return Promise.resolve(done(true)); }
      return p.then(() => {
        fadeTo(cfg.volume != null ? cfg.volume : 0.35, 1800);
        return done(true);
      }).catch(() => done(false));
    }

    function pause() {
      if (!audio) return;
      fadeTo(0, 450);
      setTimeout(() => { if (audio && (!store.on || ducked)) audio.pause(); paint(); }, 470);
      paint();
    }

    /* Public: called by the envelope on the invitation page. */
    function startFromGate() {
      store.on = true;
      store.entered = true;
      if (toggle) toggle.hidden = false;
      return play(false);
    }

    /* Public: hush the music while a guest unmutes a gallery video. */
    function duck(on) {
      ducked = !!on;
      if (ducked) pause();
      else if (store.on) play(false);
      paint();
    }

    function mount() {
      if (!cfg.file) return;

      toggle = document.createElement("button");
      toggle.className = "music-toggle";
      toggle.setAttribute("data-persist", "");
      toggle.type = "button";
      toggle.hidden = true;
      toggle.innerHTML = '<span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
      toggle.addEventListener("click", () => {
        if (audio && !audio.paused && store.on) { store.on = false; pause(); }
        else { store.on = true; play(true); }
      });
      document.body.appendChild(toggle);

      // Remember where we were, so the track continues across pages.
      const remember = () => { if (audio && !audio.paused) store.at = audio.currentTime; };
      window.addEventListener("pagehide", remember);
      document.addEventListener("visibilitychange", () => { if (document.hidden) remember(); });
      setInterval(remember, 2000);   // a phone may kill the tab without pagehide

      // Arriving on a page other than the entrance, having already entered:
      // try to keep playing. If the browser blocks it, the button is waiting.
      if (store.entered) {
        toggle.hidden = false;
        if (store.on) play(true);
        paint();
      }
    }

    return {
      mount, startFromGate, duck, paint,
      get entered() { return store.entered; },
      get playing() { return !!(audio && !audio.paused); },
    };
  })();

  /* ── page lifecycle ───────────────────────────────────────────────────
     Page scripts set themselves up through Site.page(fn) instead of
     DOMContentLoaded, so the same setup can run again when a guest comes
     back to that tab without a reload. Anything that would outlive the page
     (timers, document-level listeners) is undone through Site.onLeave(fn).
     ──────────────────────────────────────────────────────────────────── */
  const inits = {};      // script URL → its setup, for scripts already loaded
  let leaving = [];

  function page(fn) {
    const s = document.currentScript;
    if (s && s.src) inits[s.src] = fn;
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function onLeave(fn) { leaving.push(fn); }

  /* ══ NAVIGATION ════════════════════════════════════════════════════════
     A tap on a tab fetches that page and swaps it in, keeping the nav bar,
     the music button and — most importantly — the playing audio. Anything
     unexpected (offline with nothing cached, an error) falls back to an
     ordinary page load, so the worst case is the old behaviour.
     ════════════════════════════════════════════════════════════════════ */
  const Nav = (function () {
    const pages = new Set((W.nav || []).map((n) => stem(n.href)));
    let seq = 0;
    let stale = false;   // a new version is live; the next tap loads it properly

    function runSafely(fn) { try { fn(); } catch (e) { console.error(e); } }

    function loadScript(src) {
      return new Promise((resolve) => {
        const el = document.createElement("script");
        el.src = src;
        el.onload = el.onerror = () => resolve();
        document.body.appendChild(el);
      });
    }

    async function go(url, push) {
      if (stale || !window.fetch || !window.DOMParser) { location.href = url; return; }
      const token = ++seq;

      let doc;
      try {
        const res = await fetch(url, { credentials: "same-origin" });
        if (!res.ok) throw new Error(res.status);
        doc = new DOMParser().parseFromString(await res.text(), "text/html");
      } catch (e) {
        location.href = url;
        return;
      }
      if (token !== seq) return;          // a later tap overtook this one

      leaving.splice(0).forEach(runSafely);

      if (push) history.pushState({ soft: true }, "", url);
      currentPage = pageFor(new URL(url, location.href).pathname);

      // Swap everything except the persistent chrome and the loaded scripts.
      Array.from(document.body.children).forEach((el) => {
        if (el.tagName !== "SCRIPT" && !el.hasAttribute("data-persist")) el.remove();
      });
      const anchor = document.body.firstChild;
      Array.from(doc.body.children).forEach((el) => {
        if (el.tagName !== "SCRIPT") document.body.insertBefore(document.importNode(el, true), anchor);
      });

      document.title = doc.title.replace("{{names}}", W.couple.partnerA + " & " + W.couple.partnerB);
      const desc = doc.querySelector('meta[name="description"]');
      const here = $('meta[name="description"]');
      if (desc && here) here.setAttribute("content", desc.getAttribute("content"));

      fillMasthead();
      markCurrentTab();
      window.scrollTo(0, 0);

      // Run the new page's scripts in order: re-run the setup of ones we
      // already have, load the ones we don't, and execute inline blocks.
      for (const s of Array.from(doc.querySelectorAll("body script"))) {
        if (s.getAttribute("src")) {
          const src = new URL(s.getAttribute("src"), url).href;
          if (Array.from(document.scripts).some((x) => x.src === src)) {
            if (inits[src]) runSafely(inits[src]);
          } else {
            await loadScript(src);
          }
        } else {
          const el = document.createElement("script");
          el.textContent = s.textContent;
          document.body.appendChild(el);    // runs immediately
          el.remove();
        }
      }
    }

    function mount() {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";

      document.addEventListener("click", (e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = e.target.closest && e.target.closest("a[href]");
        if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin || !pages.has(stem(url.pathname))) return;
        if (stem(url.pathname) === stem(location.pathname)) {
          if (url.hash) return;             // an in-page anchor
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        e.preventDefault();
        go(url.href, true);
      });

      window.addEventListener("popstate", () => {
        if (pageFor(location.pathname) !== currentPage) go(location.href, false);
      });
    }

    /* A new deploy has taken over. Refresh straight away — unless the music
       is playing, in which case wait for the next tab tap, so the song isn't
       cut off mid-verse. */
    function newVersion() {
      if (Music.playing) stale = true;
      else location.reload();
    }

    return { mount, newVersion };
  })();

  /* ── offline support + picking up new deploys ─────────────────────────
     Every deploy stamps sw.js with a fresh build id (see vercel.json), so
     the browser sees a new service worker, installs it, and hands it
     control. That handover is our cue to refresh. */
  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol === "file:") return;      // only works over http(s)

    // The very first install also hands over control; that one isn't news.
    let hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (hadController) Nav.newVersion();
      hadController = true;
    });

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then((reg) => {
        // Tabs no longer reload, so ask for updates ourselves: whenever the
        // guest comes back to the site, and every few minutes while it's open.
        const check = () => reg.update().catch(() => {});
        document.addEventListener("visibilitychange", () => { if (!document.hidden) check(); });
        setInterval(check, 5 * 60 * 1000);
      }).catch(() => {});
    });
  }

  /* ── boot ─────────────────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    document.title = document.title.replace("{{names}}", W.couple.partnerA + " & " + W.couple.partnerB);
    buildChrome();
    Music.mount();
    Nav.mount();
    registerServiceWorker();
  });

  /* Shared toolkit for the page scripts. */
  window.Site = {
    $, $$, esc, prettyTime, Music, page, onLeave,
    get currentPage() { return currentPage; },
  };
})();
