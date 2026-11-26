/* ============================================================================
   comingsoon.js — the holding page for programmes we haven't published yet.

   The real content is untouched in data.js and still rendered by booklet.js /
   details.js. This only draws over the top while the matching flag in
   WEDDING.comingSoon is true. Set a flag to false and that page goes live
   with no other change.
   ========================================================================== */
(function () {
  "use strict";

  const { $, esc, onLeave } = window.Site;

  /* An olive laurel grown along a heart curve — the crest's sibling. */
  const HEART = '<path fill="none" d="M110.0 80.0 L110.0 79.6 L110.1 79.1 L110.3 78.4 L110.5 77.5 L110.8 76.5 L111.1 75.4 L111.6 74.1 L112.2 72.8 L113.0 71.4 L113.8 70.0 L114.8 68.6 L116.0 67.2 L117.2 65.8 L118.6 64.5 L120.2 63.3 L121.8 62.2 L123.6 61.2 L125.4 60.3 L127.4 59.6 L129.4 59.0 L131.6 58.6 L133.7 58.5 L135.9 58.5 L138.1 58.7 L140.3 59.1 L142.4 59.7 L144.6 60.5 L146.6 61.4 L148.6 62.6 L150.5 63.9 L152.2 65.4 L153.9 67.0 L155.3 68.8 L156.6 70.6 L157.8 72.6 L158.7 74.6 L159.4 76.8 L160.0 78.9 L160.3 81.2 L160.4 83.4 L160.3 85.7 L160.0 87.9 L159.4 90.2 L158.7 92.5 L157.8 94.7 L156.6 96.9 L155.3 99.1 L153.9 101.3 L152.2 103.4 L150.5 105.5 L148.6 107.6 L146.6 109.6 L144.6 111.6 L142.4 113.6 L140.3 115.5 L138.1 117.4 L135.9 119.3 L133.7 121.2 L131.6 123.0 L129.4 124.8 L127.4 126.6 L125.4 128.4 L123.6 130.1 L121.8 131.8 L120.2 133.5 L118.6 135.1 L117.2 136.7 L116.0 138.2 L114.8 139.6 L113.8 141.0 L113.0 142.3 L112.2 143.5 L111.6 144.7 L111.1 145.7 L110.8 146.6 L110.5 147.4 L110.3 148.1 L110.1 148.7 L110.0 149.1 L110.0 149.4"/><path d="M110.6 77.1 Q111.4 71.9 106.2 69.2 Q105.8 75.1 110.6 77.1Z"/><path d="M110.6 77.1 Q108.4 73.9 104.2 75.2 Q107.0 78.6 110.6 77.1Z"/><path d="M117.7 65.4 Q121.6 60.7 117.9 54.8 Q113.9 60.5 117.7 65.4Z"/><path d="M117.7 65.4 Q117.3 60.9 112.2 59.7 Q113.2 64.8 117.7 65.4Z"/><path d="M134.2 58.4 Q141.2 57.5 142.7 49.6 Q134.8 51.4 134.2 58.4Z"/><path d="M134.2 58.4 Q137.4 54.3 134.0 49.4 Q130.8 54.4 134.2 58.4Z"/><path d="M152.4 65.6 Q158.8 70.4 166.3 65.1 Q158.5 60.3 152.4 65.6Z"/><path d="M152.4 65.6 Q158.3 64.7 159.4 58.0 Q152.8 59.6 152.4 65.6Z"/><path d="M160.4 83.4 Q161.4 92.3 171.4 94.4 Q169.3 84.4 160.4 83.4Z"/><path d="M160.4 83.4 Q165.6 87.6 171.9 83.4 Q165.6 79.2 160.4 83.4Z"/><path d="M152.4 103.2 Q148.2 110.0 154.0 117.0 Q158.1 108.8 152.4 103.2Z"/><path d="M152.4 103.2 Q153.7 109.0 160.5 109.6 Q158.4 103.1 152.4 103.2Z"/><path d="M134.2 120.8 Q129.3 125.9 133.2 133.0 Q138.2 126.6 134.2 120.8Z"/><path d="M134.2 120.8 Q134.3 126.0 140.1 127.7 Q139.4 121.7 134.2 120.8Z"/><path d="M117.7 136.1 Q114.2 141.1 118.3 146.7 Q121.8 140.7 117.7 136.1Z"/><path d="M117.7 136.1 Q118.4 140.6 123.6 141.4 Q122.2 136.3 117.7 136.1Z"/><path d="M110.6 147.1 Q109.4 152.1 114.4 155.2 Q115.3 149.3 110.6 147.1Z"/><path d="M110.6 147.1 Q112.6 150.4 116.9 149.3 Q114.2 145.8 110.6 147.1Z"/><path fill="none" d="M110.0 149.4 L110.0 149.1 L109.9 148.7 L109.7 148.1 L109.5 147.4 L109.2 146.6 L108.9 145.7 L108.4 144.7 L107.8 143.5 L107.0 142.3 L106.2 141.0 L105.2 139.6 L104.0 138.2 L102.8 136.7 L101.4 135.1 L99.8 133.5 L98.2 131.8 L96.4 130.1 L94.6 128.4 L92.6 126.6 L90.6 124.8 L88.4 123.0 L86.3 121.2 L84.1 119.3 L81.9 117.4 L79.7 115.5 L77.6 113.6 L75.4 111.6 L73.4 109.6 L71.4 107.6 L69.5 105.5 L67.8 103.4 L66.1 101.3 L64.7 99.1 L63.4 96.9 L62.2 94.7 L61.3 92.5 L60.6 90.2 L60.0 87.9 L59.7 85.7 L59.6 83.4 L59.7 81.2 L60.0 78.9 L60.6 76.8 L61.3 74.6 L62.2 72.6 L63.4 70.6 L64.7 68.8 L66.1 67.0 L67.8 65.4 L69.5 63.9 L71.4 62.6 L73.4 61.4 L75.4 60.5 L77.6 59.7 L79.7 59.1 L81.9 58.7 L84.1 58.5 L86.3 58.5 L88.4 58.6 L90.6 59.0 L92.6 59.6 L94.6 60.3 L96.4 61.2 L98.2 62.2 L99.8 63.3 L101.4 64.5 L102.8 65.8 L104.0 67.2 L105.2 68.6 L106.2 70.0 L107.0 71.4 L107.8 72.8 L108.4 74.1 L108.9 75.4 L109.2 76.5 L109.5 77.5 L109.7 78.4 L109.9 79.1 L110.0 79.6 L110.0 80.0"/><path d="M109.4 147.1 Q107.2 142.4 101.3 143.2 Q104.4 148.3 109.4 147.1Z"/><path d="M109.4 147.1 Q105.8 145.8 103.1 149.3 Q107.4 150.4 109.4 147.1Z"/><path d="M102.3 136.1 Q97.8 132.0 91.7 135.5 Q97.3 139.7 102.3 136.1Z"/><path d="M102.3 136.1 Q97.8 136.3 96.4 141.4 Q101.6 140.6 102.3 136.1Z"/><path d="M85.8 120.8 Q80.0 116.8 73.6 121.8 Q80.7 125.6 85.8 120.8Z"/><path d="M85.8 120.8 Q80.6 121.7 79.9 127.7 Q85.7 126.0 85.8 120.8Z"/><path d="M67.6 103.2 Q62.0 97.5 53.8 101.6 Q60.8 107.5 67.6 103.2Z"/><path d="M67.6 103.2 Q61.6 103.1 59.5 109.6 Q66.3 109.0 67.6 103.2Z"/><path d="M59.6 83.4 Q58.6 74.5 48.6 72.4 Q50.7 82.4 59.6 83.4Z"/><path d="M59.6 83.4 Q54.4 79.2 48.1 83.4 Q54.4 87.6 59.6 83.4Z"/><path d="M67.6 65.6 Q72.8 59.5 68.1 51.7 Q62.8 59.2 67.6 65.6Z"/><path d="M67.6 65.6 Q67.2 59.6 60.6 58.0 Q61.7 64.7 67.6 65.6Z"/><path d="M85.8 58.4 Q92.9 57.8 94.6 50.0 Q86.7 51.4 85.8 58.4Z"/><path d="M85.8 58.4 Q89.2 54.4 86.0 49.4 Q82.6 54.3 85.8 58.4Z"/><path d="M102.3 65.4 Q107.2 69.1 112.9 65.2 Q107.0 61.5 102.3 65.4Z"/><path d="M102.3 65.4 Q106.8 64.8 107.8 59.7 Q102.7 60.9 102.3 65.4Z"/><path d="M109.4 77.1 Q111.4 81.9 117.3 81.4 Q114.5 76.2 109.4 77.1Z"/><path d="M109.4 77.1 Q113.0 78.6 115.8 75.2 Q111.6 73.9 109.4 77.1Z"/>';

  function petals(n) {
    let out = "";
    for (let i = 0; i < n; i++) {
      // spread them across the width with unhurried, uneven drifts
      const left = Math.round((i + 0.5) * (100 / n) + (i % 3) * 4 - 4);
      const delay = (i * 2.3) % 11;
      const dur = 13 + (i % 4) * 3.5;
      const size = 7 + (i % 3) * 3;
      out += '<i class="petal" style="left:' + left + "%;" +
             "animation-delay:-" + delay.toFixed(1) + "s;" +
             "animation-duration:" + dur.toFixed(1) + "s;" +
             "width:" + size + "px;height:" + size + 'px"></i>';
    }
    return out;
  }

  /**
   * Draw the holding page over `key`'s content.
   * @returns {boolean} true if it took over, so the caller can stop.
   */
  function mount(key) {
    const cfg = window.WEDDING.comingSoon;
    if (!cfg || !cfg[key]) return false;

    const wrap = document.querySelector("main .wrap");
    if (!wrap) return false;

    wrap.innerHTML = soonHTML(cfg, "");
    return true;
  }

  function soonHTML(cfg, extra) {
    const initials = cfg.initials || ["O", "O"];
    return (
      '<section class="soon" aria-live="polite">' +
        '<div class="soon__petals" aria-hidden="true">' + petals(9) + "</div>" +
        '<div class="soon__inner">' +
          '<div class="soon__heart" aria-hidden="true">' +
            '<svg viewBox="44 45 132 114"><g>' + HEART + "</g></svg>" +
          "</div>" +
          '<div class="soon__mono">' +
            "<span>" + esc(initials[0]) + "</span>" +
            '<i class="soon__bar" aria-hidden="true"></i>' +
            "<span>" + esc(initials[1]) + "</span>" +
          "</div>" +
          (cfg.year ? '<p class="soon__year">' + esc(cfg.year) + "</p>" : "") +
          '<p class="soon__headline">' + esc(cfg.headline || "Coming Soon") + "</p>" +
          (cfg.note ? '<p class="soon__note">' + esc(cfg.note) + "</p>" : "") +
          extra +
        "</div>" +
      "</section>"
    );
  }

  /* ── the passcode lock ────────────────────────────────────────────────
     For a page in WEDDING.comingSoon.locked: open it for anyone holding the
     passcode, and for everybody from the morning of `openOn`. */

  const storeKey = (key) => "wedding-unlock-" + key;

  function remembered(key, passcode) {
    try { return localStorage.getItem(storeKey(key)) === passcode; }
    catch (e) { return false; }
  }

  function remember(key, passcode) {
    try { localStorage.setItem(storeKey(key), passcode); } catch (e) { /* private mode */ }
  }

  /* Has `openOn` arrived? Takes "2026-11-28T07:00+01:00", or a bare
     "2026-11-28" (midnight, phone's own time). */
  function openAt(openOn) {
    if (!openOn) return NaN;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(openOn);
    return m ? new Date(+m[1], +m[2] - 1, +m[3]).getTime() : Date.parse(openOn);
  }
  function isOpen(openOn) {
    const at = openAt(openOn);
    return !isNaN(at) && Date.now() >= at;
  }

  /* "Saturday 28 November · 7:00 am", in Nigerian time whatever the phone says. */
  function whenText(at) {
    const d = new Date(at);
    try {
      const day = d.toLocaleDateString("en-GB",
        { weekday: "long", day: "numeric", month: "long", timeZone: "Africa/Lagos" });
      const time = d.toLocaleTimeString("en-US",
        { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Africa/Lagos" })
        .replace("AM", "am").replace("PM", "pm");
      return day.replace(",", "") + " \u00b7 " + time;
    } catch (e) {
      return d.toString();
    }
  }

  /* The boxes, as on the invitation's countdown. */
  function countHTML(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const parts = [
      [Math.floor(s / 86400), "Days"],
      [Math.floor(s / 3600) % 24, "Hours"],
      [Math.floor(s / 60) % 60, "Mins"],
      [s % 60, "Secs"],
    ];
    return parts.map(([n, label]) =>
      "<div><b>" + String(n).padStart(2, "0") + "</b><span>" + label + "</span></div>").join("");
  }

  /* Forgive the case and stray spaces a phone keyboard adds. */
  const tidy = (s) => String(s || "").replace(/\s+/g, "").toUpperCase();

  /**
   * Show `key`'s page through `open()` if it is free to see — otherwise draw
   * Coming Soon, or Coming Soon with a passcode box when the page is locked.
   */
  function gate(key, open) {
    if (mount(key)) return;

    const cfg = window.WEDDING.comingSoon || {};
    const lock = cfg.locked && cfg.locked[key];
    const wrap = document.querySelector("main .wrap");

    if (!lock || !wrap ||
        isOpen(lock.openOn) ||
        remembered(key, lock.passcode)) {
      open();
      return;
    }

    const page = wrap.innerHTML;      // the real page, put back on unlock
    const at = openAt(lock.openOn);
    const timed = !isNaN(at);
    wrap.innerHTML = soonHTML(cfg,
      (timed
        ? '<div class="opens">' +
            '<p class="opens__label">Opens to everyone</p>' +
            '<p class="opens__when">' + esc(whenText(at)) + "</p>" +
            '<div class="countdown opens__count" aria-hidden="true">' + countHTML(at - Date.now()) + "</div>" +
          "</div>"
        : "") +
      '<form class="unlock" novalidate>' +
        '<label class="unlock__label" for="unlockCode">Minister’s access</label>' +
        '<div class="unlock__row">' +
          '<input class="unlock__input" id="unlockCode" type="password" ' +
            'autocomplete="off" autocapitalize="characters" spellcheck="false" ' +
            'placeholder="Passcode" aria-describedby="unlockMsg">' +
          '<button class="unlock__btn" type="submit">Open</button>' +
        "</div>" +
        '<p class="unlock__msg" id="unlockMsg" aria-live="polite"></p>' +
      "</form>");

    const form = wrap.querySelector(".unlock");
    const input = form.querySelector("input");
    const msg = form.querySelector(".unlock__msg");

    let done = false;
    function reveal() {
      if (done) return;
      done = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", check);
      wrap.innerHTML = page;
      open();
    }

    /* The countdown ticks every second, and a guest already looking at the
       page sees it open on the hour — or as soon as the phone wakes. */
    const count = wrap.querySelector(".opens__count");
    const check = () => {
      if (document.hidden) return;
      if (isOpen(lock.openOn)) { reveal(); return; }
      if (count) count.innerHTML = countHTML(at - Date.now());
    };
    const timer = setInterval(check, 1000);
    document.addEventListener("visibilitychange", check);
    onLeave(() => {
      done = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", check);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (tidy(input.value) === tidy(lock.passcode)) {
        remember(key, lock.passcode);
        reveal();
      } else {
        msg.textContent = "That passcode isn’t right — please try again.";
        input.select();
      }
    });
  }

  /* The laurel heart and the petals are shared with the details page. */
  window.ComingSoon = { mount, gate, HEART, petals };
})();
