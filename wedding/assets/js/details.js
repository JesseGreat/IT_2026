/* ============================================================================
   details.js — venues, dress code, travel, RSVP, the wedding party and the
   questions guests always ask. Every block is optional: leave it out of
   data.js (or set it to null) and it simply doesn't appear.
   ========================================================================== */
(function () {
  "use strict";

  const W = window.WEDDING;
  const { $, esc, prettyTime } = window.Site;

  const mapLink = (v) =>
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(v.name + ", " + v.address.replace(/\n/g, " "));

  /* One venue, three ceremonies — so the address is stated once and the
     order of the day sits underneath it. */
  function venuePanel() {
    const v = W.venue;
    if (!v) return "";
    const rows = (W.schedule || []).map((s) =>
      '<a class="sched__row sched__row--link" href="' + esc(s.href || "#") + '">' +
        '<span class="sched__label">' + esc(s.label) + "</span>" +
        '<span class="sched__dots" aria-hidden="true"></span>' +
        '<span class="sched__time">' + esc(prettyTime(s.time)) + "</span>" +
      "</a>"
    ).join("");

    return (
      '<section class="panel">' +
        '<p class="label">The Venue</p>' +
        '<h2 class="panel__title">' + esc(v.name) + "</h2>" +
        '<p class="venue__meta">' + esc(v.address) + "</p>" +
        (rows ? '<div class="card__schedule">' + rows + "</div>" : "") +
        (v.note ? '<p class="panel__body">' + esc(v.note) + "</p>" : "") +
        '<a class="panel__link" href="' + esc(mapLink(v)) + '" ' +
          'target="_blank" rel="noopener">Open in maps</a>' +
      "</section>"
    );
  }

  /* The colours of the day, as swatches guests can match fabric against. */
  function coloursPanel(block) {
    if (!block || !W.colours || !W.colours.length) return textPanel(block);
    return (
      '<section class="panel">' +
        '<h2 class="panel__title">' + esc(block.title) + "</h2>" +
        '<p class="panel__body">' + esc(block.body) + "</p>" +
        '<div class="swatches">' +
          W.colours.map((c) =>
            '<div class="swatch"><i style="background:' + esc(c.hex) + '"></i>' +
            "<span>" + esc(c.name) + "</span></div>"
          ).join("") +
        "</div>" +
      "</section>"
    );
  }

  function textPanel(block) {
    if (!block) return "";
    return (
      '<section class="panel">' +
        '<h2 class="panel__title">' + esc(block.title) + "</h2>" +
        '<p class="panel__body">' + esc(block.body) + "</p>" +
        (block.linkHref
          ? '<a class="panel__link" href="' + esc(block.linkHref) + '" ' +
            'target="_blank" rel="noopener">' + esc(block.linkText || "Open") + "</a>"
          : "") +
      "</section>"
    );
  }

  function partyPanel(party) {
    if (!party) return "";
    return (
      '<section class="panel">' +
        '<h2 class="panel__title">' + esc(party.title) + "</h2>" +
        party.groups.map((g) =>
          '<div class="party__group"><h4>' + esc(g.name) + "</h4><ul>" +
          g.people.map((p) =>
            "<li><span>" + esc(p.name) + "</span><span>" + esc(p.role) + "</span></li>"
          ).join("") +
          "</ul></div>"
        ).join("") +
      "</section>"
    );
  }

  function faqPanel(faq) {
    if (!faq) return "";
    return (
      '<section class="panel" id="faq">' +
        '<h2 class="panel__title">' + esc(faq.title) + "</h2>" +
        '<div style="margin-top:.6rem">' +
        faq.items.map((it, i) =>
          '<div class="faq__item">' +
            '<button class="faq__q" type="button" data-faq="' + i + '" ' +
              'aria-expanded="false">' + esc(it.q) + "<span>+</span></button>" +
            '<div class="faq__a">' + esc(it.a) + "</div>" +
          "</div>"
        ).join("") +
        "</div>" +
      "</section>"
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (window.ComingSoon && ComingSoon.mount("details")) return;
    const d = W.details || {};
    $("#details").innerHTML =
      venuePanel() +
      coloursPanel(d.dressCode) +
      textPanel(d.transport) +
      textPanel(d.rsvp) +
      textPanel(d.registry) +
      partyPanel(d.party) +
      faqPanel(d.faq) +
      textPanel(d.contact);

    /* Accordion. */
    $("#details").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-faq]");
      if (!btn) return;
      const item = btn.closest(".faq__item");
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
})();
