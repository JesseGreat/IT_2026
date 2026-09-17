/* ============================================================================
   booklet.js — the page-turning program booklet.

   A real leaf of paper: the current page rotates on its binding edge (a CSS 3D
   rotateY around the left edge) while the next page waits underneath. No
   library — one element, two faces, a moving shadow.
   ========================================================================== */
(function () {
  "use strict";

  const { esc, prettyTime, onLeave } = window.Site;
  const TURN_MS = 760;

  const FLEURON =
    '<svg class="fleuron fleuron--paper" width="88" height="12" viewBox="0 0 88 12" ' +
    'fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">' +
    '<path d="M0 6h30"/><path d="M58 6h30"/>' +
    '<path d="M44 1.5c3.1 2 4.7 3.4 4.7 4.5S47.1 8.5 44 10.5C40.9 8.5 39.3 7.1 39.3 6S40.9 3.5 44 1.5Z"/>' +
    '<circle cx="34.5" cy="6" r="1.1"/><circle cx="53.5" cy="6" r="1.1"/></svg>';

  const ARROW_L =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  const ARROW_R =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

  /* ── "what is happening now" ──────────────────────────────────────────── */

  /** Minutes since midnight, or null. Honours ?now=HH:MM for previewing. */
  function nowMinutes() {
    const forced = new URLSearchParams(location.search).get("now");
    if (forced) {
      const m = /^(\d{1,2}):(\d{2})$/.exec(forced);
      if (m) return +m[1] * 60 + +m[2];
    }
    const today = new Date();
    const iso = today.getFullYear() + "-" +
      String(today.getMonth() + 1).padStart(2, "0") + "-" +
      String(today.getDate()).padStart(2, "0");
    // Only light up the "now" marker on the day itself.
    if (iso !== window.WEDDING.event.dateISO) return null;
    return today.getHours() * 60 + today.getMinutes();
  }

  function toMinutes(hhmm) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || ""));
    return m ? +m[1] * 60 + +m[2] : null;
  }

  /**
   * Walk every timed item in the booklet and decide which one is current:
   * the last item whose start time has passed.
   * Returns { pageIndex, itemIndex } or null.
   */
  function findNow(book) {
    const at = nowMinutes();
    if (at == null) return null;
    let best = null;
    book.pages.forEach((page, pi) => {
      (page.items || []).forEach((item, ii) => {
        const t = toMinutes(item.time);
        if (t != null && t <= at) best = { pageIndex: pi, itemIndex: ii, time: t };
      });
    });
    // Don't mark anything if the whole programme finished over 2 hours ago.
    if (best && at - best.time > 120) return null;
    return best;
  }

  /* ── rendering one leaf ───────────────────────────────────────────────── */

  function renderItem(item, isNow) {
    const hasTime = !!item.time;
    return (
      '<li class="' + (isNow ? "is-now" : "") + '">' +
        '<div class="order__row">' +
          (hasTime ? '<div class="order__time">' + esc(prettyTime(item.time)) + "</div>" : "") +
          "<div>" +
            '<div class="order__title">' + esc(item.title) +
              (isNow ? '<span class="now-tag">Now</span>' : "") +
            "</div>" +
            (item.by   ? '<div class="order__by">'   + esc(item.by)   + "</div>" : "") +
            (item.note ? '<div class="order__note">' + esc(item.note) + "</div>" : "") +
          "</div>" +
        "</div>" +
      "</li>"
    );
  }

  /* The running head printed at the top of every leaf, as on a real programme. */
  function runningHead() {
    const c = window.WEDDING.couple;
    return c.partnerA + " & " + c.partnerB;
  }

  function renderLeaf(book, index, now) {
    const page = book.pages[index];
    const items = page.items || [];
    return (
      '<article class="leaf">' +
        '<p class="leaf__eyebrow">' + esc(runningHead()) + "</p>" +
        '<h2 class="leaf__heading">' + esc(page.heading) + "</h2>" +
        (page.subtitle ? '<p class="leaf__sub">' + esc(page.subtitle) + "</p>" : "") +
        FLEURON +
        (items.length
          ? '<ul class="order">' +
              items.map((it, ii) =>
                renderItem(it, !!now && now.pageIndex === index && now.itemIndex === ii)
              ).join("") +
            "</ul>"
          : "") +
        (page.prose ? '<p class="order__prose">' + esc(page.prose) + "</p>" : "") +
        '<p class="leaf__folio">&#183;&nbsp;' + (index + 1) + '&nbsp;&#183;</p>' +
      "</article>"
    );
  }

  /* ── the booklet itself ───────────────────────────────────────────────── */

  function mount(root, book) {
    const total = book.pages.length;
    let index = 0;
    let busy = false;
    let now = findNow(book);

    root.innerHTML =
      '<div class="book">' +
        '<div class="book__stack" data-stack>' +
          '<div class="book__shade" data-shade></div>' +
          '<div data-leaf></div>' +
        "</div>" +
      "</div>" +
      '<div class="book__controls">' +
        '<button class="turn" type="button" data-prev>' + ARROW_L + "Back</button>" +
        '<div class="pips" data-pips role="tablist" aria-label="Booklet pages"></div>' +
        '<button class="turn" type="button" data-next>Next' + ARROW_R + "</button>" +
      "</div>" +
      '<p class="folio-count" data-count aria-live="polite"></p>';

    const stack = root.querySelector("[data-stack]");
    const shade = root.querySelector("[data-shade]");
    const leafBox = root.querySelector("[data-leaf]");
    const pips = root.querySelector("[data-pips]");
    const btnPrev = root.querySelector("[data-prev]");
    const btnNext = root.querySelector("[data-next]");
    const count = root.querySelector("[data-count]");

    pips.innerHTML = book.pages
      .map((p, i) =>
        '<button type="button" role="tab" data-go="' + i + '" ' +
        'aria-label="Page ' + (i + 1) + ': ' + esc(p.heading) + '"></button>')
      .join("");

    function paint() {
      btnPrev.disabled = index === 0;
      btnNext.disabled = index === total - 1;
      count.textContent = "Page " + (index + 1) + " of " + total;
      Array.from(pips.children).forEach((b, i) =>
        b.setAttribute("aria-current", i === index ? "true" : "false"));
    }

    function setLeaf(i) {
      leafBox.innerHTML = renderLeaf(book, i, now);
    }

    /**
     * Turn to page `to`. dir = 1 turns forward (the current leaf swings away
     * to the left), dir = -1 brings the previous leaf back over the top.
     */
    function turn(to, dir) {
      if (busy || to === index || to < 0 || to >= total) return;
      busy = true;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        index = to;
        setLeaf(index);
        paint();
        busy = false;
        return;
      }

      const flipper = document.createElement("div");
      flipper.className = "flipper";
      flipper.innerHTML =
        '<div class="face face--front">' + renderLeaf(book, dir > 0 ? index : to, now) + "</div>" +
        '<div class="face face--back"></div>';

      // Forward: the page underneath is already the new one.
      // Backward: the page underneath stays put until the returning leaf covers it.
      if (dir > 0) setLeaf(to);

      flipper.style.transition = "none";
      flipper.style.transform = dir > 0 ? "rotateY(0deg)" : "rotateY(-180deg)";
      // Past 90° the leaf swings out beyond the left edge of a phone screen.
      // Fading it across that threshold reads as the page passing out of view,
      // rather than being chopped off by the edge of the display.
      flipper.style.opacity = dir > 0 ? "1" : "0";
      stack.appendChild(flipper);

      // force a frame so the starting transform is committed
      void flipper.offsetWidth;

      const fade = Math.round(TURN_MS * 0.3);
      flipper.style.transition =
        "transform " + TURN_MS + "ms cubic-bezier(.36,.06,.24,1), " +
        "opacity " + fade + "ms linear " + (dir > 0 ? Math.round(TURN_MS * 0.55) : 0) + "ms";
      flipper.style.transform = dir > 0 ? "rotateY(-180deg)" : "rotateY(0deg)";
      flipper.style.opacity = dir > 0 ? "0" : "1";

      // the shadow the lifting page throws across the leaf below
      shade.style.transition = "opacity " + (TURN_MS / 2) + "ms ease";
      shade.style.opacity = dir > 0 ? "0.5" : "0";
      setTimeout(() => { shade.style.opacity = dir > 0 ? "0" : "0.5"; }, TURN_MS / 2);
      setTimeout(() => { shade.style.opacity = "0"; }, TURN_MS);

      index = to;
      paint();

      setTimeout(() => {
        if (dir < 0) setLeaf(index);
        flipper.remove();
        busy = false;
      }, TURN_MS);
    }

    const next = () => turn(index + 1, 1);
    const prev = () => turn(index - 1, -1);
    function goTo(i) { if (i !== index) turn(i, i > index ? 1 : -1); }

    btnNext.addEventListener("click", next);
    btnPrev.addEventListener("click", prev);
    pips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-go]");
      if (b) goTo(+b.dataset.go);
    });

    /* Tap the outer third of the paper, like a real booklet. */
    stack.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      const r = stack.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      if (x > 0.62) next();
      else if (x < 0.38) prev();
    });

    /* Swipe. */
    let sx = 0, sy = 0, tracking = false;
    stack.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
    }, { passive: true });
    stack.addEventListener("touchend", (e) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.6) {
        if (dx < 0) next(); else prev();
      }
    }, { passive: true });

    /* Keyboard, for the desktop view. */
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);

    /* Open straight to whatever is happening right now. */
    if (now) index = now.pageIndex;

    setLeaf(index);
    paint();

    /* Keep the "now" marker honest while a guest leaves the page open. */
    const clock = setInterval(() => {
      const fresh = findNow(book);
      const changed = JSON.stringify(fresh) !== JSON.stringify(now);
      if (changed) { now = fresh; if (!busy) setLeaf(index); }
    }, 60000);

    onLeave(() => {
      document.removeEventListener("keydown", onKey);
      clearInterval(clock);
    });
  }

  window.Booklet = { mount };
})();
