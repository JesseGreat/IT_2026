/* ============================================================================
   WEDDING SITE — ALL CONTENT LIVES HERE
   ----------------------------------------------------------------------------
   This is the ONLY file you need to edit to change wording, names, times,
   programmes, photos and links. Nothing here is markup — just text in quotes.

   Rules of thumb:
     • Edit the text between the "quotes". Keep the quotes and the commas.
     • To remove an optional block, set it to null   (e.g.  registry: null)
     • To add a line to a list, copy the line above it and change the text.
     • Anything marked  ← CHECK  is something I inferred — please confirm it.
   ========================================================================== */

const WEDDING = {

  /* ── 1. THE COUPLE ──────────────────────────────────────────────────── */
  couple: {
    partnerA:   "Oluwabukola",                    // the bride, shown large
    partnerB:   "Oluwatobiloba",                  // the groom
    fullA:      "Oluwabukola Adebisi",            // ← CHECK  surname taken from her parents
    fullB:      "Oluwatobiloba Okunogbe",         // ← CHECK  surname taken from his parents
    monogram:   "O&O",                            // on the wax seal — "B&T" also works
    hashtag:    "#BukolaMeetsTobiloba",           // ← CHECK  or set to null to hide

    /* Named on the invitation itself, as is customary. */
    parents: [
      { side: "Parents of the Bride", names: "Late Mr. & Mrs. Adebisi" },
      { side: "Parents of the Groom", names: "Pastor & Deaconess Okunogbe" },
    ],
  },

  /* ── 2. THE DAY ─────────────────────────────────────────────────────── */
  event: {
    dateLong:   "Saturday, the Twenty-Eighth of November",
    year:       "Two Thousand and Twenty-Six",
    dateShort:  "28 · 11 · 2026",
    dateISO:    "2026-11-28",                     // yyyy-mm-dd — drives the countdown
    city:       "Osogbo, Osun State",
    invitationLine: "Together with their families,\nrequest the honour of your presence\nat the celebration of their marriage",
    footerLine: "Feasting, music and dancing to follow",
  },

  /* ── 3. THE VENUE ───────────────────────────────────────────────────────
     All three ceremonies happen at this one address.
     ───────────────────────────────────────────────────────────────────── */
  venue: {
    name:    "Halatria Hotel and Towers",
    address: "KM2, adjacent Osogbo City Stadium, beside NYSC Secretariat,\nNew Ikirun Road, Osogbo, Osun State",
    note:    "All three ceremonies take place here — there is no travelling between venues.",

    /* What the map searches for. Leave as is and it looks up the name and
       address above. */
    mapQuery: "Halatria Hotel and Towers, New Ikirun Road, Osogbo, Osun State",

    /* If the pin lands in the wrong place, open Google Maps, find the exact
       spot, choose Share → Embed a map, and paste the src="..." URL here.
       That overrides the search above. */
    mapEmbed: null,
  },

  /* ── 4. THE ORDER OF THE DAY ────────────────────────────────────────────
     Use 24-hour "HH:MM". Shown on the invitation and on the details page.
     ───────────────────────────────────────────────────────────────────── */
  schedule: [
    { label: "Church Service",         time: "08:00", href: "church.html" },
    { label: "Traditional Engagement", time: "11:00", href: "traditional.html" },
    { label: "Reception",              time: "14:00", href: "reception.html" },
  ],

  /* ── 5. COLOURS OF THE DAY ──────────────────────────────────────────────
     Shown as swatches on the details page so guests can match their aṣọ-ẹbí.
     ───────────────────────────────────────────────────────────────────── */
  colours: [
    { name: "Beige",       hex: "#E8DBBD" },
    { name: "Green",       hex: "#12362B" },
    { name: "Olive Green", hex: "#6F7742" },
  ],

  /* ── 5b. COMING SOON ────────────────────────────────────────────────────
     While a flag below is true, that page shows the holding design instead
     of its programme. The real content stays exactly where it is — flip a
     flag to false and that page goes live immediately.

         church: false,      ← do this when the order of service is ready
     ───────────────────────────────────────────────────────────────────── */
  comingSoon: {
    church:      true,
    traditional: true,
    reception:   true,
    details:     true,

    initials: ["O", "O"],          // shown as  O │ O
    year:     "2026",
    headline: "Coming Soon",
    note:     "Our full programme will appear here",   // set to null to hide
  },

  /* ── 6. THE THREE BOOKLETS ──────────────────────────────────────────────
     Each booklet is a list of PAGES. Each page has a heading, an optional
     subtitle, and a list of ITEMS.

     An item can be written two ways:
        { title: "Processional" }
        { title: "Processional", by: "The Chancel Choir", note: "Please stand" }
     Add a time to any item and the site will highlight whatever is happening
     now, on the day itself:
        { time: "14:30", title: "Grand entrance" }
     ───────────────────────────────────────────────────────────────────── */

  church: {
    title:    "Order of Service",
    subtitle: "Holy Matrimony · 8:00 in the morning",
    pages: [
      {
        heading: "The Gathering",
        items: [
          { title: "Processional", note: "The congregation stands" },
          { title: "Entrance of the Bride" },
          { title: "Opening Hymn" },
          { title: "Opening Prayer" },
        ],
      },
      {
        heading: "The Word",
        items: [
          { title: "First Reading" },
          { title: "Hymn" },
          { title: "Second Reading" },
          { title: "The Sermon" },
        ],
      },
      {
        heading: "The Marriage",
        items: [
          { title: "The Declaration of Consent" },
          { title: "The Exchange of Vows" },
          { title: "The Blessing & Exchange of Rings" },
          { title: "The Proclamation", note: "Those whom God hath joined together, let no one put asunder" },
        ],
      },
      {
        heading: "The Blessing",
        items: [
          { title: "Blessing of the Marriage" },
          { title: "Anthem", by: "The Choir" },
          { title: "Signing of the Marriage Register" },
          { title: "Prayers for the Couple" },
        ],
      },
      {
        heading: "The Sending",
        items: [
          { title: "Presentation of the Couple", note: "Mr. & Mrs. Okunogbe" },
          { title: "Closing Hymn" },
          { title: "The Benediction" },
          { title: "Recessional" },
        ],
      },
      {
        heading: "Thanking God",
        subtitle: "A word from the couple",
        prose: "God has granted us the privilege of meeting and loving each other, and today, with His blessing and that of our parents, we wish to unite our lives forever.",
        items: [],
      },
    ],
  },

  traditional: {
    title:    "Ìgbéyàwó Ìbílẹ̀",
    subtitle: "The Traditional Engagement · 11:00 in the morning",
    pages: [
      {
        heading: "Ìkíni",
        subtitle: "The Greeting",
        items: [
          { title: "Arrival & Seating of Guests" },
          { title: "Opening Prayer", by: "The family elder" },
          { title: "Introduction of the Alága", by: "Alága Ìjókòó for the bride · Alága Ìdúró for the groom" },
        ],
      },
      {
        heading: "Ìdòbálẹ̀",
        subtitle: "The Arrival of the Groom's Family",
        items: [
          { title: "The Groom's Family Seeks Permission to Enter" },
          { title: "Ìdòbálẹ̀ — The Prostration", note: "The groom and his friends prostrate before the bride's family" },
          { title: "Reception of the Groom's Family" },
        ],
      },
      {
        heading: "Ìwé Ìtọrọ",
        subtitle: "The Letters",
        items: [
          { title: "Reading of the Proposal Letter", by: "Read by the groom's family" },
          { title: "Reading of the Acceptance Letter", by: "Read by the bride's family" },
          { title: "Breaking of the Kola Nut", note: "Obì àti orógbó — for long life and blessing" },
        ],
      },
      {
        heading: "Ẹrù Ìyàwó",
        subtitle: "The Presentation of Gifts",
        items: [
          { title: "Presentation of the Dowry & Gifts" },
          { title: "Inspection & Acceptance by the Bride's Family" },
          { title: "Prayers Over the Items", note: "Honey, salt, sugar, bitter kola, alligator pepper and yam" },
        ],
      },
      {
        heading: "Ìjádé Ìyàwó",
        subtitle: "The Bride Comes Forth",
        items: [
          { title: "Dance of the Bride & Her Friends" },
          { title: "The Bride Kneels for Her Family's Blessing" },
          { title: "The Bride Identifies Her Husband" },
          { title: "Placing of the Fìlà", note: "The bride crowns the groom with his cap" },
        ],
      },
      {
        heading: "Ìbùkún",
        subtitle: "The Blessing",
        items: [
          { title: "Exchange of Rings" },
          { title: "Presentation of the Holy Bible" },
          { title: "Blessing of the Couple by Both Families" },
          { title: "Closing Prayer" },
        ],
      },
    ],
  },

  reception: {
    title:    "The Reception",
    subtitle: "An Afternoon of Feasting & Dancing · 2:00",
    pages: [
      {
        heading: "Arrival",
        items: [
          { time: "14:00", title: "Guests Are Welcomed & Seated" },
          { time: "14:20", title: "Small Chops & Refreshments" },
          { time: "14:40", title: "Grand Entrance of the Couple" },
        ],
      },
      {
        heading: "The Welcome",
        items: [
          { time: "14:50", title: "Opening Prayer & Welcome", by: "The Master of Ceremonies" },
          { time: "15:05", title: "The First Dance" },
          { time: "15:20", title: "Dinner Is Served" },
        ],
      },
      {
        heading: "Words & Toasts",
        items: [
          { time: "16:00", title: "Toast to the Couple", by: "Damilare, the Best Man" },
          { time: "16:10", title: "A Word from the Best Lady", by: "Stephanie" },
          { time: "16:20", title: "Parents' Blessing" },
        ],
      },
      {
        heading: "Sweet & Celebration",
        items: [
          { time: "16:45", title: "Cutting of the Cake" },
          { time: "16:55", title: "Champagne Toast" },
          { time: "17:10", title: "Family Dance" },
        ],
      },
      {
        heading: "The Floor Is Open",
        items: [
          { time: "17:30", title: "Dancing & Spraying" },
          { time: "18:30", title: "Owambe Set", by: "The DJ" },
          { time: "19:30", title: "The Send-Off" },
        ],
      },
    ],
  },

  /* ── 7. GALLERY ─────────────────────────────────────────────────────────
     Drop your files in  assets/img/  and list them here, in order.
     Photo:  { type: "photo", src: "assets/img/us-01.jpg", caption: "..." }
     Video:  { type: "video", src: "assets/video/clip.mp4", poster: "assets/video/clip.jpg", caption: "..." }
             add  sound: false  to keep a clip silent (hides its "Tap for sound" button)
     Compress photos to ~1600px wide / under 300 KB each — see README.
     ───────────────────────────────────────────────────────────────────── */
  gallery: {
    heading:  "Our Story, So Far",
    dwellMs:  7000,   // how long each slide holds, in milliseconds

    /* No photographs yet — leave this empty and the crest below is shown
       instead. Add your first photo here and the slideshow takes over
       automatically; nothing else needs changing.

         { type: "photo", src: "assets/img/us-01.jpg", caption: "Yábà, 2019" },
         { type: "video", src: "assets/img/clip.mp4", poster: "assets/img/clip.jpg" },
    */
    slides: [
      { type: "photo", src: "assets/img/photo-01.jpg" },
      { type: "photo", src: "assets/img/photo-02.jpg" },
      { type: "photo", src: "assets/img/photo-03.jpg" },
      { type: "photo", src: "assets/img/photo-04.jpg" },
      { type: "photo", src: "assets/img/photo-05.jpg" },
      { type: "photo", src: "assets/img/photo-06.jpg" },
    ],

    /* Shown while `slides` is empty. */
    placeholder: {
      note:      "Photographs to follow",   // set to null to say nothing
      verse:     null,                      // e.g. "Two are better than one…"
      reference: null,                      // e.g. "Ecclesiastes 4 : 9"
    },
  },

  /* ── 8. THANKING GOD ────────────────────────────────────────────────────
     Sits directly beneath the gallery on the invitation page.
     Set to null to remove it.
     ───────────────────────────────────────────────────────────────────── */
  thanksgiving: {
    title: "Thanking God",
    body:  "God has granted us the privilege of meeting and loving each other, and today, with His blessing and that of our parents, we wish to unite our lives forever.",
  },

  /* ── 9. MUSIC ───────────────────────────────────────────────────────────
     Put your licensed instrumental at the path below. See
     assets/audio/README.md — you must supply this file yourself.
     Set  file: null  to disable music entirely.
     ───────────────────────────────────────────────────────────────────── */
  music: {
    file:   "assets/audio/entrance.mp3",     // Moses Bliss — "For Life"
    title:  "For Life · Moses Bliss",
    volume: 0.45,      // 0 to 1. Raise toward 0.6 if guests say it is too quiet.
  },

  /* ── 10. DETAILS PAGE ───────────────────────────────────────────────────
     Every block below is optional. Set it to null to drop it from the page.
     ───────────────────────────────────────────────────────────────────── */
  details: {
    dressCode: {
      title: "Colours of the Day",
      body:  "Beige, green and olive green. Aṣọ-ẹbí in these colours for the traditional engagement; formal wear for the church service and the reception.",
    },

    transport: {
      title: "Getting There & Parking",
      body:  "The venue is on New Ikirun Road, beside the NYSC Secretariat and adjacent to the Osogbo City Stadium. Parking is available on site. As the church service begins at 8:00 in the morning, please plan to arrive by 7:30.",
    },

    rsvp: null,          // ← add { title, body, linkText, linkHref } when you have one

    registry: null,      // ← add { title, body, linkText, linkHref } when you have one

    contact: {
      title: "Questions on the Day",
      body:  "Damilare (Best Man)\nStephanie (Best Lady)",   // ← add phone numbers when ready
    },

    /* The wedding party. More names to follow. */
    party: {
      title: "The Wedding Party",
      groups: [
        {
          name: "For the Bride",
          people: [
            { name: "Stephanie", role: "Best Lady" },
            { name: "Nafisat",   role: "Bridesmaid" },
            { name: "Wisdom",    role: "Bridesmaid" },
          ],
        },
        {
          name: "For the Groom",
          people: [
            { name: "Damilare",      role: "Best Man" },
            { name: "Dami Williams", role: "Groomsman" },
            { name: "Joshua",        role: "Groomsman" },
            { name: "Robor",         role: "Groomsman" },
          ],
        },
        {
          name: "With Gratitude",
          people: [
            { name: "Late Mr. & Mrs. Adebisi",       role: "Parents of the Bride" },
            { name: "Pastor & Deaconess Okunogbe",   role: "Parents of the Groom" },
          ],
        },
      ],
    },

    faq: {
      title: "Good to Know",
      items: [
        { q: "What time should I arrive?",
          a: "Half an hour before whichever ceremony you are coming for. The church service begins at 8:00 in the morning and will start on time." },
        { q: "Is everything at the same place?",
          a: "Yes. The church service, the traditional engagement and the reception all take place at Halatria Hotel and Towers. There is no travelling in between." },
        { q: "What are the colours of the day?",
          a: "Beige, green and olive green. The swatches above show the exact shades." },
        { q: "May I take photographs?",
          a: "Please keep phones down during the church service — we have a photographer and would love to see your faces. Everywhere else, photograph away." },
      ],
    },
  },

  /* ── 11. NAVIGATION LABELS ──────────────────────────────────────────── */
  nav: [
    { href: "index.html",       label: "Invitation",   short: "Invite" },
    { href: "church.html",      label: "Church",       short: "Church" },
    { href: "traditional.html", label: "Traditional",  short: "Ìbílẹ̀"  },
    { href: "reception.html",   label: "Reception",    short: "Reception" },
    { href: "details.html",     label: "Details",      short: "Details" },
  ],
};

/* Make it reachable from every page's scripts. */
window.WEDDING = WEDDING;
