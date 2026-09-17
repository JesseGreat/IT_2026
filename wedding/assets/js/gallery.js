/* ============================================================================
   gallery.js — a slow, romantic slideshow.
   Generous dwell, long crossfade, a gentle Ken Burns settle. Swipe or tap the
   arrows to take over. Videos play muted so they never fight the music; if a
   guest unmutes one, the background track steps aside until it is muted again.
   A video holds the stage until it finishes rather than for the usual dwell,
   and is shown whole — a portrait phone clip sits over a blurred copy of its
   own poster instead of being cropped to fit the frame.
   ========================================================================== */
(function () {
  "use strict";

  const { esc, Music, onLeave } = window.Site;

  const ARROW_L =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
  const ARROW_R =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';

  function slideMarkup(slide, i) {
    const caption = slide.caption
      ? '<div class="slide__caption">' + esc(slide.caption) + "</div>" : "";

    if (slide.type === "video") {
      return (
        '<div class="slide slide--video" data-i="' + i + '" data-video>' +
          (slide.poster
            ? '<img class="slide__backdrop" src="' + esc(slide.poster) + '" alt="" aria-hidden="true" loading="lazy">'
            : "") +
          "<video " +
            'src="' + esc(slide.src) + '" ' +
            (slide.poster ? 'poster="' + esc(slide.poster) + '" ' : "") +
            'muted playsinline preload="' + (i === 0 ? "auto" : "metadata") + '"></video>' +
          (slide.sound === false ? "" :
            '<button class="unmute" type="button" data-unmute>Tap for sound</button>') +
          caption +
        "</div>"
      );
    }
    return (
      '<div class="slide" data-i="' + i + '">' +
        '<img src="' + esc(slide.src) + '" alt="' + esc(slide.caption || "") + '" ' +
        (i === 0 ? 'fetchpriority="high"' : 'loading="lazy"') + ">" +
        caption +
      "</div>"
    );
  }

  function mount(root, cfg) {
    const slides = (cfg && cfg.slides) || [];
    if (!slides.length) { root.hidden = true; return; }

    const dwell = cfg.dwellMs || 7000;
    let index = 0;
    let timer = null;
    let held = false;          // a video is unmuted — hold the slideshow
    let blocked = false;       // the active video refused to play

    root.className = "gallery";
    root.innerHTML =
      '<div class="gallery__stage" data-stage>' +
        slides.map(slideMarkup).join("") +
        '<button class="gallery__arrow gallery__arrow--prev" type="button" ' +
          'data-prev aria-label="Previous photo">' + ARROW_L + "</button>" +
        '<button class="gallery__arrow gallery__arrow--next" type="button" ' +
          'data-next aria-label="Next photo">' + ARROW_R + "</button>" +
      "</div>" +
      '<div class="gallery__dots" data-dots></div>';

    const stage = root.querySelector("[data-stage]");
    const dots = root.querySelector("[data-dots]");
    const els = Array.from(root.querySelectorAll(".slide"));

    dots.innerHTML = slides
      .map((s, i) => '<button type="button" data-go="' + i + '" aria-label="Photo ' + (i + 1) + '"></button>')
      .join("");

    function show(i) {
      index = (i + slides.length) % slides.length;
      els.forEach((el, n) => {
        const active = n === index;
        el.classList.toggle("is-active", active);
        const v = el.querySelector("video");
        if (v) {
          if (active) {
            try { v.currentTime = 0; } catch (e) {}
            // Blocked (e.g. iPhone low-power mode): the poster shows and the
            // usual dwell moves things along instead.
            v.play().catch(() => { if (index === n) { blocked = true; schedule(); } });
          } else {
            v.pause(); v.muted = true; releaseHold(el);
          }
        }
      });
      Array.from(dots.children).forEach((b, n) =>
        b.setAttribute("aria-current", n === index ? "true" : "false"));
    }

    function releaseHold(el) {
      const btn = el.querySelector("[data-unmute]");
      if (btn) btn.textContent = "Tap for sound";
      if (held) { held = false; Music.duck(false); schedule(); }
    }

    function activeVideo() {
      return blocked ? null : els[index].querySelector("video");
    }

    function schedule() {
      clearTimeout(timer);
      if (held || document.hidden || slides.length < 2) return;
      const v = activeVideo();
      // A playing video advances on "ended"; this is only a safety net in
      // case that event never arrives.
      const wait = v
        ? Math.max(dwell, ((isFinite(v.duration) ? v.duration : 60) - v.currentTime) * 1000 + 2000)
        : dwell;
      timer = setTimeout(() => go(index + 1), wait);
    }

    function go(i) { blocked = false; show(i); schedule(); }

    els.forEach((el, n) => {
      const v = el.querySelector("video");
      if (!v) return;
      v.addEventListener("ended", () => {
        if (n !== index) return;
        if (slides.length < 2) { v.play().catch(() => {}); return; }
        releaseHold(el);
        go(index + 1);
      });
      // Duration is only known once metadata loads; re-plan the safety net.
      v.addEventListener("loadedmetadata", () => { if (n === index) schedule(); });
    });

    root.querySelector("[data-next]").addEventListener("click", () => go(index + 1));
    root.querySelector("[data-prev]").addEventListener("click", () => go(index - 1));
    dots.addEventListener("click", (e) => {
      const b = e.target.closest("[data-go]");
      if (b) go(+b.dataset.go);
    });

    /* Unmute a video: hush the background music while it speaks. */
    stage.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-unmute]");
      if (!btn) return;
      const slide = btn.closest(".slide");
      const v = slide.querySelector("video");
      if (!v) return;
      if (v.muted) {
        v.muted = false;
        v.play().catch(() => {});
        btn.textContent = "Mute";
        held = true;
        Music.duck(true);
        clearTimeout(timer);
      } else {
        v.muted = true;
        releaseHold(slide);
      }
    });

    /* Swipe. */
    let sx = 0, sy = 0, tracking = false;
    stage.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
      clearTimeout(timer);
    }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? index + 1 : index - 1);
      else schedule();
    }, { passive: true });

    const onVisibility = () => { if (document.hidden) clearTimeout(timer); else schedule(); };
    document.addEventListener("visibilitychange", onVisibility);

    /* Leaving for another tab: stop the clock and any video, and give the
       music back if a video had it hushed. */
    onLeave(() => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      els.forEach((el) => { const v = el.querySelector("video"); if (v) { v.pause(); v.muted = true; } });
      if (held) { held = false; Music.duck(false); }
    });

    show(0);
    schedule();
  }

  window.Gallery = { mount };
})();
