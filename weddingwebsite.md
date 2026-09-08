# Prompt for Claude Code

Copy everything below into Claude Code, filling in the bracketed placeholders first.

---

Build me a multi-page wedding website as a static site (plain HTML/CSS/JS, no framework needed unless you think it's warranted). It replaces printed invitations and printed programs — guests will scan a QR code and land on this site during the wedding, so it needs to work great on a phone, one-handed, in venue wifi/lighting conditions.

## Site structure
This is NOT a single scrolling page. It's a small multi-page site with a persistent nav bar (or a menu that's easy to reach on mobile — could be a simple top bar or a slide-out menu, your call), with these pages:

1. **Home / Invitation** — designed like a formal invitation card, not a typical hero banner. This is the first impression: names, date, a short line inviting the guest, maybe a monogram or motif. Should feel like opening an actual wedding invitation, not a SaaS landing page.
   - **Entrance moment + music**: browsers block autoplay audio with sound until the visitor interacts with the page, so design an intentional "open the invitation" moment — e.g. a closed envelope/card the guest taps to open, or a soft "Enter" button — that on tap triggers both a gentle reveal animation (the invitation opening, text fading/sliding in elegantly) AND starts a romantic instrumental track playing softly in the background. This makes the audio permission requirement feel like part of the experience instead of a technical hiccup.
   - Include a small, unobtrusive mute/pause control once music is playing (bottom corner, always reachable) so guests can turn it off without leaving the page.
   - Use a royalty-free/licensed instrumental track (no lyrics competing with the content) — flag clearly in your reply that I'll need to supply or license the actual audio file, since you can't source copyrighted music for me.
   - Keep the animation tasteful and single-moment — one elegant reveal on entrance, not continuous motion or animation on every element.
   - **Photo/video gallery**: include a section on this page (below the entrance moment) for our own photos and videos — a slow, romantic sliding carousel/slideshow rather than a static grid. Auto-advance gently (generous dwell time per image, smooth crossfade or slide transition, nothing jarring), but let guests swipe/tap arrows to move through it manually too. If a video is included, it should be muted by default (so it doesn't fight with the background music) with a tap-to-unmute option, and shouldn't autoplay with sound. Keep file sizes reasonable so it still loads well on venue wifi — compress/optimize images rather than using them full-resolution.
2. **Church / Ceremony Program** — the order of service for the ceremony, presented as a page-flip booklet (see "Booklet / page-flip experience" below).
3. **Traditional Program** — the order of events for the traditional/cultural ceremony, same page-flip booklet treatment.
4. **Reception Program** — the order of events for the reception, same page-flip booklet treatment.
5. Any other pages needed for the optional sections below (could be their own page or folded into one of the above — use your judgment).

## Booklet / page-flip experience
For the three program pages, design it to feel like flipping through a physical printed program:
- Each "page" of the booklet shows one section of content (e.g. one page per few items of the order of service, or one page per phase of the event) — not one giant scrolling list.
- A visible arrow/tap zone advances to the next page with an actual page-turn animation (a flip/curl transition, not just a fade or slide) — like turning a paper page. A back arrow goes to the previous page.
- Include a page indicator (e.g. dots or "page 2 of 5") so guests know where they are in the booklet.
- Keep this smooth and lightweight on mobile — it should feel tactile, not laggy. A CSS 3D transform (perspective + rotateY) is a reasonable way to fake a page flip without a heavy library; use a small JS flip-book library only if it's genuinely more reliable than hand-rolling it.
- Each booklet page should look designed, like a printed program page (proper margins, a consistent motif/border treatment, readable typography) — not a plain content dump.

## Couple & event details
- Names: [FULL NAMES / HOW YOU WANT THEM STYLED]
- Date: [DATE]
- City: [CITY]
- Ceremony (church) venue: [VENUE NAME, ADDRESS, START TIME]
- Reception venue: [VENUE NAME, ADDRESS, START TIME]
- Church order of service:
  [PASTE THE FULL CHURCH PROGRAM, item by item — e.g.
  Processional
  Opening prayer
  Exchange of vows
  Exchange of rings
  Nuptial blessing
  Signing of the register
  Recessional]
- Traditional program:
  [PASTE THE FULL TRADITIONAL/CULTURAL CEREMONY PROGRAM, item by item]
- Reception program:
  [PASTE THE FULL RECEPTION TIMELINE, item by item — e.g.
  5:30 — Cocktail hour
  6:30 — Grand entrance
  7:00 — First dance
  7:30 — Dinner
  8:15 — Speeches/toasts
  9:00 — Cake cutting
  9:30 — Dancing
  11:00 — Send-off]
- Wedding party / people to thank: [NAMES + ROLES, optional]
- Dress code: [OPTIONAL]
- Parking / rideshare / transportation notes: [OPTIONAL]
- RSVP link or contact: [OPTIONAL]
- Registry link: [OPTIONAL]
- Hashtag: [OPTIONAL]
- Any other sections you want (our story, FAQ, gallery, accommodations, etc.): [LIST]

## Design direction
- Style/vibe: [e.g. romantic garden, minimalist black-tie, warm autumn, coastal — or say "surprise me based on the above"]
- Colors: [OPTIONAL — leave blank to let Claude choose something distinctive rather than a generic template palette]
- Fonts: [OPTIONAL]

## Requirements
1. Mobile-first (most guests will view this on a phone during the event), also looks good on desktop. Nav should be reachable with one thumb.
2. The invitation home page and each program's booklet should be immediately scannable — a guest should be able to glance at their phone mid-event, find the right program page, and flip to what's happening now.
3. Keep navigation between the four main pages obvious and fast — guests will be jumping back and forth (e.g. checking reception program during cocktail hour).
4. Distinctive, intentional visual design — not a generic AI-templated look (avoid: cream background + terracotta accent, all-caps eyebrow labels, identical rounded cards with soft shadows, tracked-out labels with em dashes). Pick a palette and typography that actually fits the couple's style and the venue.
5. Fast-loading, no heavy dependencies, works offline-ish (guests may have spotty signal).
6. Generate a QR code that links to the deployed page, and include instructions for how to regenerate it once I have the final hosted URL (I'll be hosting this on [Netlify / GitHub Pages / my own domain / not sure yet]).
7. Give me simple deploy instructions for [Netlify / GitHub Pages / Vercel / whatever you'd recommend for a one-page static site].
8. Keep all content editable in one obvious place (e.g. a config/data section at the top of the file) so I can tweak wording later without digging through markup.

Build it, then show me how to preview it locally before I deploy.