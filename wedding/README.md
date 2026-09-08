# The Wedding Site

A five-page static site that replaces printed invitations and printed programmes.
Guests scan a QR code, tap open an envelope, and carry the whole order of service
in their pocket for the day.

No framework, no build step, no dependencies. Seven small files of JavaScript,
one stylesheet. It opens by double-clicking a file, and it works on venue wifi
that barely works.

---

## What's in it

| Page | What it does |
|---|---|
| `index.html` | The invitation. A sealed envelope you tap to open — that tap starts the music and triggers the reveal. Then the venue with a live map, both families, a ticking countdown, the month with the day ringed and an *add to my calendar* button, the slideshow, and the note of thanks. |
| `church.html` | The order of service, as a booklet you turn page by page. |
| `traditional.html` | The Yoruba engagement programme, same booklet treatment. |
| `reception.html` | The reception timeline. On the day itself it opens straight to whatever is happening now. |
| `details.html` | The venue with a map link, the order of the day, colours of the day as swatches, travel, the wedding party, FAQ. |
| `qr.html` | A private tool for you: type your live URL, get a QR code and a printable A6 table card. Not linked from the guest navigation. |

---

## Preview it locally

You need a local web server — opening `index.html` straight from the file system
works for most of the site, but the offline caching won't switch on.

From inside this folder:

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

Any of these work equally well if you'd rather:

```bash
npx serve .          # Node
php -S localhost:8000
```

To see the whole thing on your actual phone — which is how every guest will see
it — find your computer's local IP (`hostname -I` on Linux, `ipconfig getifaddr en0`
on a Mac) and visit `http://THAT-IP:8000` from a phone on the same wifi.

### Useful previewing tricks

- **Replay the envelope.** Once you've opened it, the site remembers for the rest
  of the browser session. Open a private window, or run `sessionStorage.clear()`
  in the browser console, to see the entrance again.
- **See the "happening now" marker.** It only lights up on the wedding date
  itself. To preview it, add a time to the URL:
  `http://localhost:8000/reception.html?now=16:05` — the booklet will open to
  that moment and mark it.

---

## Change the wording

**Everything lives in one file: `assets/js/data.js`.** Names, dates, venues, all
three programmes, the gallery, the FAQ, the wedding party. It's plain text in
quotes with comments explaining each block. Anything marked `← CHECK` is
something I inferred rather than something you told me — please confirm it.

Nothing else needs touching. You do not have to open the HTML.

A few things worth knowing:

- **Booklet pages.** Each programme is a list of `pages`, and each page is a list
  of `items`. Aim for **three to five items per page** — that's what fits a phone
  screen without scrolling, which is the whole point of the booklet.
- **Times.** Write them as `"16:05"` (24-hour). They display as `4:05 pm`, and
  they're what drives the "happening now" marker on the day.
- **Optional sections.** Set any block in `details` to `null` to remove it —
  `registry: null` and the registry panel disappears.
- **The map.** The venue section embeds a live Google map that searches for
  `venue.mapQuery`. **Check the pin is actually on the hotel.** If it isn't,
  open Google Maps, find the exact spot, choose *Share → Embed a map*, and paste
  the `src="..."` URL into `venue.mapEmbed` — that overrides the search. The map
  needs the network, so it is left out entirely when a guest is offline; the
  address and both buttons still work.
- **After editing**, bump `CACHE` in `sw.js` (`wedding-v4` → `wedding-v5`) so
  guests who already visited get the new version instead of the cached old one.

---

## The photographs

There are none yet, and the site does not pretend otherwise. While
`gallery.slides` is empty it shows a **crest** instead — an olive laurel drawn
around your monogram, with *"Photographs to follow"* beneath it. It is a
designed panel, not a placeholder box, so the site looks finished today.

**The moment you add a photo, the slideshow takes that section back over.**
Nothing else needs changing:

```js
gallery: {
  slides: [
    { type: "photo", src: "assets/img/us-01.jpg", caption: "Yábà, 2019" },
    { type: "photo", src: "assets/img/us-02.jpg", caption: "" },
  ],
}
```

Put the files in `assets/img/` and **compress them first** — guests load these
on venue wifi, often on one bar of signal. Full-resolution camera files simply
will not appear.

- Target **1600 px on the long edge**, **under 300 KB** each.
- Six to ten photos is plenty. A slideshow nobody reaches the end of is wasted.

```bash
# one file
ffmpeg -i big.jpg -vf "scale=1600:-1" -q:v 4 assets/img/us-01.jpg

# or the whole folder, with ImageMagick
mogrify -path assets/img -resize 1600x1600\> -quality 82 *.jpg
```

For a video: keep it **under 20 seconds and under 5 MB**, add a `poster` image so
something shows before it loads, and remember it plays **muted** by default —
there's a tap-to-unmute button, and unmuting it pauses the background music.

```bash
ffmpeg -i clip.mov -vf "scale=1280:-2" -c:v libx264 -crf 28 -an assets/img/clip.mp4
```

You can also put a verse in the crest while you wait — set `verse` and
`reference` in `gallery.placeholder`.

---

## The music

**Moses Bliss — "For Life"** is wired in and plays automatically the moment a
guest taps the envelope.

That tap matters: every browser blocks sound until the visitor interacts with
the page, so there is no way to have audio start on a cold page load. The
envelope is that interaction — which is why the entrance is built around it
rather than apologising for it. From there the track carries across pages,
loops, and can be silenced with the round control above the nav bar.

I compressed your file for venue wifi: the original was 4.24 MB at 128 kb/s
with a 640x640 album-art JPEG embedded in it. Stripping the artwork and
re-encoding to 96 kb/s gives **2.7 MB**, with all 3:50 intact. That is the
single heaviest thing on the site, so it was worth doing.

- **Volume** is `music.volume` in `data.js`, currently `0.45`. It plays under
  everything, so raise it toward `0.6` if guests say it's too quiet.
- **To swap the track**, drop a new MP3 at `assets/audio/entrance.mp3` and
  update `music.title`. Keep it under 3 MB.
- **To turn music off entirely**, set `music.file: null`.

One thing to settle yourself: this is a commercial recording, so make sure
you're comfortable with using it on a public page. Nobody is likely to mind a
wedding site, but it is your call to make rather than mine.

---

## Deploy to Vercel

The site is already configured (`vercel.json` sets sensible caching). Pick either
route.

### The quick way — drag and drop

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in.
2. Drag this whole folder onto the page.
3. Vercel gives you a URL like `https://your-project.vercel.app`. Done.

### The proper way — Git, so you can fix a typo at 11 pm

```bash
cd wedding
git init && git add -A && git commit -m "Wedding site"
# create an empty repo on GitHub, then:
git remote add origin git@github.com:you/wedding.git
git push -u origin main
```

Then import the repo at [vercel.com/new](https://vercel.com/new). Framework
preset: **Other**. No build command, no output directory — it's static.

Every `git push` redeploys in about fifteen seconds. This matters more than you
think: someone's name will be spelled wrong, and you'll want to fix it the night
before.

### The CLI way

```bash
npm i -g vercel
cd wedding
vercel --prod
```

### A custom domain

In the Vercel dashboard: **Settings → Domains → Add**. Point your registrar's
nameservers or add the CNAME record Vercel shows you. HTTPS is automatic.

A short domain is worth it here — it goes under the QR code on every table card,
and it's what people type when the code won't scan.

---

## The QR code

**Deploy first, then make the code** — a QR code is just an encoded URL, so it
can't be made before the URL exists.

1. Open **`/qr.html`** on your deployed site (or locally).
2. Paste your live address. The code regenerates as you type.
3. Download what you need:
   - **SVG** for anything printed — vector, sharp at any size.
   - **PNG** for WhatsApp, Instagram, email.
   - **Table card** — a finished A6 card (105 × 148 mm) with your names, the
     date, the code and the URL. Send it straight to a printer.

To regenerate after changing the URL, just type the new one. There's nothing to
reinstall — the encoder is built into the page and runs entirely in your browser,
so it works with no internet connection.

### Printing it so it actually scans

- **3 cm minimum**, 4–5 cm on a table card. Bigger on a welcome board.
- **Keep the pale border.** That quiet zone is part of the code; cropping to the
  edge of the black squares breaks it.
- **Dark on light.** Don't invert it, don't put it on a photograph, don't tint
  the squares gold. Reception lighting is dim and phone cameras need contrast.
- **Test with two or three different phones** — an old Android included — before
  you print a hundred of them.
- Print the URL underneath as well. Someone's camera will refuse to cooperate.

The code uses error-correction level M, which still reads with about 15% of it
damaged — enough to survive a creased or slightly stained card.

---

## Working offline

A service worker caches every page, the stylesheet and the scripts on a guest's
first visit, so the programmes still open when the signal drops mid-reception.
Pages load from the cache instantly and refresh in the background.

Two caveats worth knowing:

- **It needs one good load.** A guest who scans the code for the first time in a
  basement with no signal gets nothing. If the venue wifi is genuinely bad, put
  the QR code on the invitation as well so people load it at home first.
- **Fonts come from Google Fonts**, so the first load needs internet. The site
  falls back to Georgia and looks perfectly respectable without them. To remove
  the dependency entirely, download the two font families, drop the `.woff2`
  files in `assets/`, replace the `<link>` in each HTML file with an `@font-face`
  block, and add the files to the `SHELL` list in `sw.js`.

---

## On the day

- The nav bar sits at the bottom of the screen, reachable one-handed while
  holding a drink. All five pages are one tap apart.
- The reception page opens to whatever is happening now, with a gold marker
  against the current item. It updates itself every minute.
- Guests can swipe the booklet pages, tap the outer third of the paper, use the
  arrows, or jump straight to a page with the dots.
- `Ctrl/Cmd + P` on a programme page prints the booklet as a clean paper
  programme, one page per sheet — useful for a few printed copies for elderly
  guests or the officiant.

---

## If something goes wrong

**The music won't start.** Browsers block sound until someone interacts with the
page — that's why the envelope tap exists. If it still doesn't play, check the
file is really at `assets/audio/entrance.mp3` and is an MP3.

**Changes don't show up.** The service worker is serving the cached version. Bump
`CACHE` in `sw.js`, or hard-reload (`Ctrl/Cmd + Shift + R`).

**A page is blank.** Open the browser console. It's almost always a typo in
`data.js` — a missing comma or an unclosed quote. The file is plain JavaScript, so
one stray character stops the whole thing.

**The QR won't scan.** Print it bigger, keep the light border, and make sure it's
dark on light.
