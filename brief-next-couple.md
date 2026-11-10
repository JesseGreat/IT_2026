# Brief: wedding site for the next couple

Paste everything below the line into Claude Code, from the `IT_2026` folder, and attach the invitation (IV) image(s) in the same message. Fill in the five short answers at the bottom first.

---

Build a wedding website for a new couple. Base it on the site that already exists in `wedding/` in this repo. That site is finished, works well and is already deployed. **Reuse its engine.** Don't rebuild from scratch. Copy it into a new folder, `wedding-<couple-short-name>/`, and adapt the copy. Leave `wedding/` untouched.

Read `wedding/README.md` and `wedding/assets/js/data.js` first so you know how it fits together. All content lives in `data.js`, the three programmes render as page-flip booklets, there is an envelope entrance that starts the music, a bottom nav, an offline service worker, a QR tool at `qr.html`, and a "Coming Soon" flag for each page.

## 1. The invitation (IV) is the source of truth

I've attached the couple's IV. Take every fact from it:

- names, and how they are styled; monogram or initials
- date, day, year and city
- venue name and address, and each event's start time
- parents / families, if named
- colours of the day
- hashtag, RSVP contacts, dress code, gift or registry notes, and anything else printed on it

**Don't invent anything.** If the IV doesn't say it, set that field to `null` so the section disappears, or mark it `← CHECK`. When you're done, give me a short list of what was missing or unclear. Spell Yoruba and other names exactly as the IV does, tone marks included.

## 2. What's different from the first site

**No church programme.** This couple isn't having a church service on this site. Delete `church.html` and every reference to it: the nav, `schedule`, `comingSoon`, the details page, the `sw.js` cache list, `qr.html` and the README. Afterwards, grep for `church` to confirm nothing still points at it. The site then has the invitation, the Traditional programme, the Reception programme and Details.

**Programmes list the order of events only.** I'll give you each programme as a plain itemised list. Each booklet item is just a `title`, plus a `time` if I give one. Don't add `by`, `note` or `prose` text, and don't write descriptions for what happens during each item. Group the items into booklet pages of 3–5 items each, with a short heading for each page. Keep the page-flip, the page dots and the "happening now" marker exactly as they are.

**A new palette, taken from their colours.** Build a new set of colour tokens in `style.css` from the IV's colours of the day. Use a dark ground colour, a paper colour for the booklet pages, an accent for rules and highlights, and ink colours. Rename the tokens away from `--em-*`, `--gold-*` and `--olive-*` to names that fit the new colours. Check that text is easy to read on every surface: body text must reach at least 4.5:1 contrast, and the bottom nav and the "happening now" marker must stay clearly visible. Show the IV's colours as swatches on the details page.

**Its own look.** It should feel like a sibling of the first site, not a copy:

- Choose a different display typeface and UI typeface pairing that suits the IV's lettering.
- Replace the laurel, the wax-seal monogram and the booklet border ornament with a motif taken from the IV (its florals, frame, crest or pattern). Draw it as inline SVG.
- Change the entrance a little. Keep the "tap to open" moment, because it is what lets the music start, but vary the reveal: for example, the card slides out of a different envelope, or the seal or ribbon is different. Keep it to a single elegant reveal.
- Update the "Coming Soon" holding design to use the new initials and motif.

## 3. Housekeeping so the two sites never collide

- Change the page titles, meta descriptions, `manifest.webmanifest` (name, colours), the favicon and the `sw.js` cache name.
- Change the QR table card so it shows the new names and date.
- When you're finished, grep the new folder for anything left over from the first couple. It must find nothing: `Oluwabukola`, `Oluwatobiloba`, `Okunogbe`, `Adebisi`, `Halatria`, `Osogbo`, `BukolaMeetsTobiloba`, `O&O`, `Moses Bliss`.
- Remove the old couple's photos and audio from the copy. Don't carry their files across.
- Rewrite the README for this couple, keeping the same sections: preview, coming soon, editing, photos, music, deploy, QR, on the day.

## 4. Photos and music

- Photos: put the ones I give you in `assets/img/` and compress them the same way as before (1800 px on the long edge, under 300 KB each). Keep the originals out of git. If I give you none, use the crest placeholder with the new motif.
- Music: use the track I give you, re-encoded to about 96 kb/s with the artwork stripped. If I give you none, set `music.file: null` and tell me.

## 5. Finish

Run it locally with `python3 -m http.server`, then check the following at phone width: the envelope opens, the music starts, both booklets flip, the nav works, the details page shows the right swatches, and the console shows no errors. Then tell me how to deploy it as a **new, separate** Vercel project (not the first couple's) and how to make its QR code.

## My answers (fill in before sending)

- **Traditional programme, in order:**
  [PASTE THE ITEMISED LIST, with times if you have them]
- **Reception programme, in order:**
  [PASTE THE ITEMISED LIST, with times if you have them]
- **Pages live straight away, or held behind Coming Soon?** [e.g. invitation live, everything else Coming Soon]
- **Photos / video:** [path to the folder, or "none yet"]
- **Music:** [path to the MP3, or "none"]
