/* ============================================================================
   home.js — the invitation page: the envelope, the card, the live countdown,
   the calendar, the slideshow and the note of thanks.
   ========================================================================== */
(function () {
  "use strict";

  const W = window.WEDDING;
  const { $, esc, prettyTime, Music } = window.Site;

  const FLEURON =
    '<svg class="fleuron fleuron--paper" width="88" height="12" viewBox="0 0 88 12" ' +
    'fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">' +
    '<path d="M0 6h30"/><path d="M58 6h30"/>' +
    '<path d="M44 1.5c3.1 2 4.7 3.4 4.7 4.5S47.1 8.5 44 10.5C40.9 8.5 39.3 7.1 39.3 6S40.9 3.5 44 1.5Z"/>' +
    '<circle cx="34.5" cy="6" r="1.1"/><circle cx="53.5" cy="6" r="1.1"/></svg>';

  /* ── the invitation card ──────────────────────────────────────────────────
     Kept to the formal essentials: who, when, and the closing line. The venue
     and the families each get a section of their own below.
     ───────────────────────────────────────────────────────────────────── */
  function renderInvitation() {
    const c = W.couple, e = W.event;

    $("#invitation").innerHTML =
      '<p class="label">' + esc(e.city) + "</p>" +
      '<p class="card__invite">' + esc(e.invitationLine) + "</p>" +
      '<h1 class="card__names">' + esc(c.partnerA) +
        '<span class="card__amp">and</span>' + esc(c.partnerB) + "</h1>" +
      FLEURON +
      '<p class="card__date">' + esc(e.dateLong) + "<br>" +
        '<span class="card__year">' + esc(e.year) + "</span></p>" +
      '<p class="card__foot">' + esc(e.footerLine) + "</p>";
  }

  /* ── the venue, with a map ────────────────────────────────────────────── */
  function mapQuery() {
    const v = W.venue;
    return v.mapQuery || (v.name + ", " + v.address.replace(/\n/g, " "));
  }

  function renderVenue() {
    const v = W.venue;
    const section = $("#venueSection");
    if (!v) { section.hidden = true; return; }

    const rows = (W.schedule || []).map((s) =>
      '<a class="sched__row sched__row--link" href="' + esc(s.href || "#") + '">' +
        '<span class="sched__label">' + esc(s.label) + "</span>" +
        '<span class="sched__dots" aria-hidden="true"></span>' +
        '<span class="sched__time">' + esc(prettyTime(s.time)) + "</span>" +
      "</a>"
    ).join("");

    const q = encodeURIComponent(mapQuery());
    const embed = v.mapEmbed || ("https://www.google.com/maps?q=" + q + "&output=embed");

    /* The map needs the network. Offline, the address and the buttons still
       do the job, so we simply leave the frame out rather than show a void. */
    const map = navigator.onLine
      ? '<div class="venue__map">' +
          '<iframe src="' + esc(embed) + '" title="Map to ' + esc(v.name) + '" ' +
          'loading="lazy" referrerpolicy="no-referrer-when-downgrade" ' +
          'allowfullscreen></iframe>' +
        "</div>"
      : "";

    section.className = "panel venue";
    section.innerHTML =
      '<p class="label">The Venue</p>' +
      '<h2 class="panel__title" id="venueTitle">' + esc(v.name) + "</h2>" +
      '<p class="venue__meta">' + esc(v.address) + "</p>" +
      (rows ? '<div class="card__schedule">' + rows + "</div>" : "") +
      (v.note ? '<p class="panel__body">' + esc(v.note) + "</p>" : "") +
      map +
      '<div class="venue__actions">' +
        '<a class="panel__link" target="_blank" rel="noopener" ' +
          'href="https://www.google.com/maps/search/?api=1&query=' + q + '">Open in maps</a>' +
        '<a class="panel__link panel__link--ghost" target="_blank" rel="noopener" ' +
          'href="https://www.google.com/maps/dir/?api=1&destination=' + q + '">Get directions</a>' +
      "</div>";
  }

  /* ── both families ────────────────────────────────────────────────────── */
  function renderParents() {
    const list = (W.couple && W.couple.parents) || [];
    const section = $("#parentsSection");
    if (!list.length) { section.hidden = true; return; }

    section.className = "families";
    section.innerHTML =
      '<div class="families__grid">' +
        list.map((p) =>
          '<div class="families__col">' +
            '<span class="families__side">' + esc(p.side) + "</span>" +
            '<span class="families__names">' + esc(p.names) + "</span>" +
          "</div>"
        ).join("") +
      "</div>";
  }

  /* ── countdown, ticking every second ──────────────────────────────────── */
  function renderCountdown() {
    const box = $("#countdown");
    const target = new Date(W.event.dateISO + "T00:00:00");
    if (isNaN(target)) { box.hidden = true; return; }

    const cell = (n, label) =>
      "<div><b>" + String(n).padStart(2, "0") + "</b><span>" + label + "</span></div>";

    function tick() {
      const diff = target - new Date();
      if (diff <= 0) {
        box.innerHTML = '<div class="countdown__today"><b>Today</b><span>the day is here</span></div>';
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      box.innerHTML =
        cell(days, days === 1 ? "day" : "days") +
        cell(hours, "hours") +
        cell(mins, "minutes") +
        cell(secs, "seconds");
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── the month, with the day ringed ───────────────────────────────────── */
  const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const DOW = ["S", "M", "T", "W", "T", "F", "S"];

  function renderCalendar() {
    const box = $("#calendar");
    const iso = W.event.dateISO;
    const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!box || !parts) { if (box) box.hidden = true; return; }

    const year = +parts[1], month = +parts[2] - 1, day = +parts[3];
    const firstDow = new Date(year, month, 1).getDay();      // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let cells = "";
    for (let i = 0; i < firstDow; i++) cells += '<span class="cal__pad"></span>';
    for (let d = 1; d <= daysInMonth; d++) {
      cells += '<span class="cal__day' + (d === day ? " is-day" : "") + '"' +
        (d === day ? ' aria-current="date"' : "") + ">" + d + "</span>";
    }

    box.innerHTML =
      '<div class="cal">' +
        '<p class="cal__month">' + MONTHS[month] + " " + year + "</p>" +
        '<div class="cal__grid">' +
          DOW.map((d, i) => '<span class="cal__dow" aria-hidden="true">' + d + "</span>").join("") +
          cells +
        "</div>" +
        '<button class="cal__add" type="button" id="addToCalendar">Add to my calendar</button>' +
      "</div>";

    $("#addToCalendar").addEventListener("click", downloadIcs);
  }

  /* ── a calendar file the guest can keep ───────────────────────────────── */
  function icsEscape(s) {
    return String(s)
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\r?\n/g, "\\n");
  }

  /* RFC 5545 asks for lines no longer than 75 octets, folded with a space. */
  function fold(line) {
    if (line.length <= 74) return line;
    let out = line.slice(0, 74);
    let rest = line.slice(74);
    while (rest.length > 73) {
      out += "\r\n " + rest.slice(0, 73);
      rest = rest.slice(73);
    }
    return out + "\r\n " + rest;
  }

  function downloadIcs() {
    const e = W.event, v = W.venue, c = W.couple;
    const stamp = e.dateISO.replace(/-/g, "");
    const sched = W.schedule || [];
    const start = (sched[0] && sched[0].time || "08:00").replace(":", "") + "00";
    const end = "200000";     // the celebration runs into the evening

    const summary = c.partnerA + " & " + c.partnerB + " — Wedding";
    const location = v ? v.name + ", " + v.address.replace(/\n/g, " ") : "";
    const description = sched
      .map((s) => s.label + " — " + prettyTime(s.time))
      .join("\n");

    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Site//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:" + stamp + "-" + Math.random().toString(36).slice(2) + "@wedding",
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, ""),
      "DTSTART:" + stamp + "T" + start,
      "DTEND:" + stamp + "T" + end,
      "SUMMARY:" + icsEscape(summary),
      "LOCATION:" + icsEscape(location),
      "DESCRIPTION:" + icsEscape(description),
      "END:VEVENT",
      "END:VCALENDAR",
    ].map(fold).join("\r\n");

    const blob = new Blob([lines], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "wedding.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* ── the note of thanks ───────────────────────────────────────────────── */
  function renderThanksgiving() {
    const t = W.thanksgiving;
    const section = $("#thanksSection");
    if (!t) { section.hidden = true; return; }
    $("#thanksTitle").textContent = t.title;
    $("#thanksBody").textContent = t.body;
  }


  /* ── the crest, shown until the photographs arrive ────────────────────────
     An olive laurel — the third colour of the day — drawn around the
     monogram. The moment a photo is added to gallery.slides, the slideshow
     takes this section back over.
     ───────────────────────────────────────────────────────────────────── */
  const WREATH = '<path fill="none" d="M80.8 182.3 L77.9 181.1 L75.2 179.8 L72.4 178.4 L69.7 176.8 L67.1 175.2 L64.6 173.4 L62.1 171.6 L59.7 169.6 L57.4 167.6 L55.2 165.5 L53.0 163.3 L51.0 161.0 L49.0 158.6 L47.1 156.1 L45.3 153.6 L43.7 151.0 L42.1 148.4 L40.6 145.7 L39.3 142.9 L38.0 140.1 L36.9 137.2 L35.9 134.3 L35.0 131.3 L34.2 128.3 L33.5 125.3 L33.0 122.3 L32.5 119.2 L32.2 116.2 L32.1 113.1 L32.0 110.0 L32.1 106.9 L32.2 103.8 L32.5 100.8 L33.0 97.7 L33.5 94.7 L34.2 91.7 L35.0 88.7 L35.9 85.7 L36.9 82.8 L38.0 79.9 L39.3 77.1 L40.6 74.3 L42.1 71.6 L43.7 69.0 L45.3 66.4 L47.1 63.9 L49.0 61.4 L51.0 59.0 L53.0 56.7 L55.2 54.5 L57.4 52.4 L59.7 50.4 L62.1 48.4 L64.6 46.6 L67.1 44.8 L69.7 43.2 L72.4 41.6 L75.2 40.2 L77.9 38.9 L80.8 37.7"/><path d="M80.8 182.3 Q75.4 180.8 71.9 186.1 Q78.2 187.3 80.8 182.3Z"/><path d="M80.8 182.3 Q82.2 178.4 78.3 175.6 Q77.2 180.2 80.8 182.3Z"/><path d="M58.4 168.5 Q52.8 164.5 46.5 169.2 Q53.3 173.2 58.4 168.5Z"/><path d="M58.4 168.5 Q61.6 164.5 58.3 159.7 Q55.1 164.5 58.4 168.5Z"/><path d="M41.9 148.0 Q37.2 141.3 28.3 144.1 Q34.3 151.2 41.9 148.0Z"/><path d="M41.9 148.0 Q47.1 144.8 45.3 138.1 Q39.7 142.3 41.9 148.0Z"/><path d="M33.1 123.2 Q30.6 114.0 19.8 113.7 Q23.6 123.8 33.1 123.2Z"/><path d="M33.1 123.2 Q40.0 121.6 40.7 113.6 Q33.0 116.1 33.1 123.2Z"/><path d="M33.1 96.8 Q33.8 87.4 23.7 83.5 Q24.0 94.3 33.1 96.8Z"/><path d="M33.1 96.8 Q40.1 97.7 43.4 90.3 Q35.3 90.1 33.1 96.8Z"/><path d="M41.9 72.0 Q45.1 64.5 38.0 58.4 Q35.2 67.3 41.9 72.0Z"/><path d="M41.9 72.0 Q47.3 74.7 52.1 69.7 Q45.6 67.2 41.9 72.0Z"/><path d="M58.4 51.5 Q63.1 46.5 59.1 39.7 Q54.4 45.9 58.4 51.5Z"/><path d="M58.4 51.5 Q62.0 55.2 67.2 52.5 Q62.7 48.7 58.4 51.5Z"/><path d="M80.8 37.7 Q85.7 35.1 84.5 28.8 Q79.2 32.3 80.8 37.7Z"/><path d="M80.8 37.7 Q82.5 41.5 87.2 40.8 Q84.8 36.7 80.8 37.7Z"/><path fill="none" d="M139.2 182.3 L142.1 181.1 L144.8 179.8 L147.6 178.4 L150.3 176.8 L152.9 175.2 L155.4 173.4 L157.9 171.6 L160.3 169.6 L162.6 167.6 L164.8 165.5 L167.0 163.3 L169.0 161.0 L171.0 158.6 L172.9 156.1 L174.7 153.6 L176.3 151.0 L177.9 148.4 L179.4 145.7 L180.7 142.9 L182.0 140.1 L183.1 137.2 L184.1 134.3 L185.0 131.3 L185.8 128.3 L186.5 125.3 L187.0 122.3 L187.5 119.2 L187.8 116.2 L187.9 113.1 L188.0 110.0 L187.9 106.9 L187.8 103.8 L187.5 100.8 L187.0 97.7 L186.5 94.7 L185.8 91.7 L185.0 88.7 L184.1 85.7 L183.1 82.8 L182.0 79.9 L180.7 77.1 L179.4 74.3 L177.9 71.6 L176.3 69.0 L174.7 66.4 L172.9 63.9 L171.0 61.4 L169.0 59.0 L167.0 56.7 L164.8 54.5 L162.6 52.4 L160.3 50.4 L157.9 48.4 L155.4 46.6 L152.9 44.8 L150.3 43.2 L147.6 41.6 L144.8 40.2 L142.1 38.9 L139.2 37.7"/><path d="M139.2 182.3 Q141.8 187.3 148.1 186.1 Q144.6 180.8 139.2 182.3Z"/><path d="M139.2 182.3 Q142.8 180.2 141.7 175.6 Q137.8 178.4 139.2 182.3Z"/><path d="M161.6 168.5 Q166.7 173.2 173.5 169.2 Q167.2 164.5 161.6 168.5Z"/><path d="M161.6 168.5 Q164.9 164.5 161.7 159.7 Q158.4 164.5 161.6 168.5Z"/><path d="M178.1 148.0 Q185.7 151.2 191.7 144.1 Q182.8 141.3 178.1 148.0Z"/><path d="M178.1 148.0 Q180.3 142.3 174.7 138.1 Q172.9 144.8 178.1 148.0Z"/><path d="M186.9 123.2 Q196.4 123.8 200.2 113.7 Q189.4 114.0 186.9 123.2Z"/><path d="M186.9 123.2 Q187.0 116.1 179.3 113.6 Q180.0 121.6 186.9 123.2Z"/><path d="M186.9 96.8 Q196.0 94.3 196.3 83.5 Q186.2 87.4 186.9 96.8Z"/><path d="M186.9 96.8 Q184.7 90.1 176.6 90.3 Q179.9 97.7 186.9 96.8Z"/><path d="M178.1 72.0 Q184.8 67.3 182.0 58.4 Q174.9 64.5 178.1 72.0Z"/><path d="M178.1 72.0 Q174.4 67.2 167.9 69.7 Q172.7 74.7 178.1 72.0Z"/><path d="M161.6 51.5 Q165.6 45.9 160.9 39.7 Q156.9 46.5 161.6 51.5Z"/><path d="M161.6 51.5 Q157.3 48.7 152.8 52.5 Q158.0 55.2 161.6 51.5Z"/><path d="M139.2 37.7 Q140.8 32.3 135.5 28.8 Q134.3 35.1 139.2 37.7Z"/><path d="M139.2 37.7 Q135.2 36.7 132.8 40.8 Q137.5 41.5 139.2 37.7Z"/>';

  function renderCrest(ph) {
    const box = $("#gallery");
    box.className = "crest";
    box.innerHTML =
      '<div class="crest__medallion">' +
        '<svg viewBox="0 0 220 220" role="img" aria-label="Monogram of ' +
          esc(W.couple.partnerA) + " and " + esc(W.couple.partnerB) + '">' +
          '<g class="crest__laurel">' + WREATH + "</g>" +
          '<circle cx="110" cy="110" r="54" class="crest__ring"/>' +
          '<circle cx="110" cy="110" r="50" class="crest__ring crest__ring--fine"/>' +
          '<text x="110" y="110" class="crest__mono" text-anchor="middle" ' +
            'dominant-baseline="central">' + esc(W.couple.monogram) + "</text>" +
        "</svg>" +
      "</div>" +
      (ph.verse
        ? '<p class="crest__verse">' + esc(ph.verse) + "</p>" +
          (ph.reference ? '<p class="crest__ref">' + esc(ph.reference) + "</p>" : "")
        : "") +
      (ph.note ? '<p class="crest__note">' + esc(ph.note) + "</p>" : "");
  }

  /* ── the entrance ─────────────────────────────────────────────────────── */
  function setupGate() {
    const gate = $("#gate");
    const envelope = $("#envelope");
    $("#seal").textContent = W.couple.monogram;

    // Already opened it this visit? Don't make them do it again.
    if (Music.entered) {
      gate.remove();
      $("#invitation").classList.add("is-revealed");
      return;
    }

    let opening = false;
    function open() {
      if (opening) return;
      opening = true;

      // Start the music on this tap — the one moment the browser allows it.
      Music.startFromGate();

      gate.classList.add("is-opening");
      setTimeout(() => {
        gate.classList.add("is-open");
        $("#invitation").classList.add("is-revealed");
      }, 620);
      setTimeout(() => gate.remove(), 1700);
    }

    envelope.addEventListener("click", open);
    envelope.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); open(); }
    });
  }

  /* ── boot ─────────────────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    renderInvitation();
    renderVenue();
    renderParents();
    renderCountdown();
    renderCalendar();
    renderThanksgiving();
    setupGate();

    const g = W.gallery;
    if (g && g.slides && g.slides.length) {
      $("#galleryTitle").textContent = g.heading;
      window.Gallery.mount($("#gallery"), g);
    } else if (g && g.placeholder) {
      $("#galleryTitle").textContent = g.heading;
      renderCrest(g.placeholder);
    } else {
      $("#gallerySection").hidden = true;
    }

    $("#colophon").textContent = W.couple.hashtag || "";
  });
})();
