# The entrance music

**In place:** `entrance.mp3` — Moses Bliss, "For Life".

Compressed from the 4.24 MB original (128 kb/s, with a 640x640 album-art JPEG
embedded) down to **2.7 MB** at 96 kb/s, artwork stripped, full 3:50 duration.
It is the heaviest file on the site, and guests load it on venue wifi, so the
compression is worth keeping.

## How it behaves

- Nothing plays until a guest taps the envelope. Browsers block autoplay with
  sound, so the tap *is* the permission — which is why the entrance is built
  around it rather than apologising for it.
- The track fades in over ~1.8 seconds rather than starting abruptly.
- It loops, and continues across pages, picking up roughly where it left off.
- The round control above the nav bar mutes and unmutes it at any time.
- If a guest unmutes a video in the gallery, the music steps aside and comes
  back when the video is muted again.

## Changing it

Everything is in the `music` block of `assets/js/data.js`:

```js
music: {
  file:   "assets/audio/entrance.mp3",
  title:  "For Life · Moses Bliss",
  volume: 0.45,     // 0 to 1
}
```

- **Too quiet?** Raise `volume` toward `0.6`. It plays under everything, so it
  is deliberately restrained.
- **Different track?** Replace the file, keep the name, update `title`. MP3 is
  the safest format — every phone plays it. Aim for under 3 MB:

  ```bash
  ffmpeg -i original.mp3 -vn -c:a libmp3lame -b:a 96k entrance.mp3
  ```

  (`-vn` is what strips embedded album art, which is often half the file size.)
- **No music at all?** Set `file: null`. The envelope still opens with the same
  animation; the music control simply never appears.

## A note on licensing

This is a commercial recording. Using it on a public website is a decision for
you to make — most couples won't run into trouble with a wedding page, but it
is worth being aware of rather than assuming.

If you ever want something clearable instead, **Musopen** has public-domain
classical recordings with no licence restrictions at all, and **Free Music
Archive** and **ccMixter** carry Creative Commons tracks (check whether the
licence requires crediting the artist).
