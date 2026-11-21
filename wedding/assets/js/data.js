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
    { label: "Traditional Engagement", time: "10:00", href: "traditional.html" },
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
    church:      false,   // live — but behind the passcode below
    traditional: true,
    reception:   false,
    details:     false,

    initials: ["O", "O"],          // shown as  O │ O
    year:     "2026",
    headline: "Coming Soon",
    note:     "Our full programme will appear here",   // set to null to hide

    /* A page listed here is live, but only for someone with the passcode,
       until the morning of  openOn  — then it opens for every guest by
       itself. Everyone else sees the Coming Soon design, with a small
       "Minister's access" box beneath it. Once a phone has unlocked the
       page it stays unlocked. Change the passcode and every phone is
       locked out again. Delete a line to open that page to everyone now.

       This keeps the page from casual eyes; it is not real security. The
       words themselves sit in this file, which anyone who knows how can
       read. Fine for an order of service, not for anything secret. */
    locked: {
      church: { passcode: "HOLY2811", openOn: "2026-11-28" },
    },
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
    subtitle: "Solemnization of Holy Matrimony · 8:00 in the morning",
    pages: [
      {
        heading: "The Gathering",
        items: [
          { title: "Play Song" },
          { title: "Prayers" },
          { title: "Processional Hymn", by: "Ọkàn Mi Yọ̀ Nínú Olúwa · My Soul Is Happy in Jesus",
            words: "okanMiYo" },
          { title: "The Exhortation" },
        ],
      },
      {
        heading: "The Marriage",
        items: [
          { title: "Charge and Declaration" },
          { title: "Hymn", by: "Ire T'a Sú Ní Édẹ́nì · The Voice That Breathed o'er Eden",
            note: "I.O.M. 503 · Hymn 522", words: "ireTasu" },
          { title: "Solemnization of the Marriage", note: "Vows and the giving of rings" },
          { title: "The Acclamation", note: "The mother of the groom welcomes the bride" },
        ],
      },
      {
        heading: "The Ministry of the Word",
        items: [
          { title: "Old Testament Reading", by: "Genesis 2:18–24", note: "Read by the groom" },
          { title: "Psalm 128", words: "psalm128" },
          { title: "New Testament Reading", by: "Ephesians 5:22–33", note: "Read by the bride" },
          { title: "Hymn", by: "Ògo Ni F'Olúwa · To God Be the Glory", words: "ogoNiFoluwa" },
          { title: "Message" },
        ],
      },
      {
        heading: "Prayer & Blessing",
        items: [
          { title: "Hymn" },                       // ← CHECK  this hymn isn't named in the booklet
          { title: "Prayer and Benediction" },
          { title: "Signing of the Marriage Register", note: "Choir special choruses" },
          { title: "Presentation of the Couple", note: "Mr. & Mrs. Okunogbe" },
        ],
      },
      {
        heading: "The Sending",
        items: [
          { title: "Thanksgiving" },
          { title: "Announcements" },
          { title: "Withdrawal Hymn", by: "Mo Ntẹ̀síwájú · I'm Pressing On", words: "pressingOn" },
        ],
      },
      {
        heading: "Thanking God",
        subtitle: "A word from the couple",
        prose: "God has granted us the privilege of meeting and loving each other, and today, with His blessing and that of our parents, we wish to unite our lives forever.",
        items: [],
      },
    ],

    /* The words behind each "Sing along" button above. An item points here
       with  words: "name".  Each hymn is printed in Yoruba, then English.
       A verse is one string; \n starts a new line. */
    words: {

      okanMiYo: {
        label: "Sing along",
        parts: [
          { lang: "Yorùbá", title: "Ọkàn Mi Yọ̀ Nínú Olúwa",
            chorus: "Emi nyọ̀ ninu Rẹ (Oluwa)\nEmi nyọ̀ ninu Rẹ\n'Gba gbogbo l'o nfayọ̀ kun ọkan mi\n'Tori emi nyọ̀ ninu Rẹ",
            verses: [
              "Ọkan mi yọ̀ ninu Oluwa\n'Tori O jẹ iye fun mi\nOhun Rẹ dun pupọ lati gbọ\nAdun ni lati r'oju Rẹ",
              "O ti nwa mi pẹ ki nto mọ O\n'Gba ti mo rin jina s'agbo\nO gbe mi wa sile l'apa Rẹ\nNibi ti papa tutu wa",
              "Ire at'anu Rẹ yi mi ka\nOr'ọfẹ Rẹ nsan bi odo\nẸmi Rẹ nto, o si nsọ 'tunu\nO mba mi lọ si'bikibi",
              "Emi y'o dabi Rẹ nijọ kan\nNgo sẹ'ru wiwo mi kalẹ\nTiti d'igbana ngo sọ'otọ\nNi ṣiṣe ọṣọ f'ade Rẹ",
            ] },
          { lang: "English", title: "My Soul Is Happy in Jesus",
            chorus: "I am happy in Him,\nI am happy in Him;\nMy soul with delight\nHe fills day and night,\nFor I am happy in Him.",
            verses: [
              "My soul is so happy in Jesus,\nFor He is so precious to me;\nHis voice it is music to hear it,\nHis face it is heaven to see.",
              "He sought me so long ere I knew Him,\nWhen wandering afar from the fold;\nSafe home in His arms He hath brought me,\nTo where there are pleasures untold.",
              "His love and His mercy surround me,\nHis grace like a river doth flow;\nHis Spirit, to guide and to comfort,\nIs with me wherever I go.",
              "They say I shall someday be like Him,\nMy cross and my burden lay down;\nTill then I will ever be faithful,\nIn gathering gems for His crown.",
            ] },
        ],
      },

      ireTasu: {
        label: "Sing along",
        parts: [
          { lang: "Yorùbá", title: "Ire T'a Sú Ní Édẹ́nì", note: "I.O.M. 503",
            verses: [
              "Ire t'a su ni Edẹni\nN'igbeyawo kini\nIbukun t'a bukun wọn\nO wa sibẹ sibẹ",
              "Sibẹ titi di oni\nN'igbeyawo Kristian\nỌlọrun wa laarin wa\nLati sure fun wa",
              "Ire ki wọn le maa bi\nKi wọn k'o si maa rẹ\nKi wọn ni'dapọ mimọ\nT'ẹnikan k'yo le tu",
              "Ba ni pe Baba, si fa\nObinrin yi f'ọkọ\nBi O ti fi Efa fun\nAdamu l'ọjọ kini",
              "Ba wa pe Imanuẹli\nSiso ọwọ wọn pọ\nB'ẹda meji ti dapọ\nNi ara ijinlẹ Rẹ",
              "Ba wa pe, Ẹmi Mimọ\nF'ibukun Rẹ fun wọn\nSise wọn ni aṣẹ pe\nGẹgẹ b'O ti maa nṣe",
              "Fi wọn s'abẹ abo Rẹ\nK'ibi kan ma ba wọn\nGba wọn npa ra ile Rẹ\nMa toju ọkan wọn",
              "Pẹlu wọn l'ọj'aye wọn\nAt'ọkọ at'aya\nTiti nwọn o de ọdọ Rẹ",
            ] },
          { lang: "English", title: "The Voice That Breathed o'er Eden", note: "Hymn 522",
            verses: [
              "The voice that breathed o'er Eden,\nThat earliest wedding day,\nThe primal marriage blessing,\nIt hath not passed away.",
              "Still in the pure espousal\nOf Christian man and maid\nThe Holy Three are with us,\nThe threefold grace is said.",
              "For dower of blessed children,\nFor love and faith's sweet sake,\nFor high mysterious union\nWhich nought on earth may break.",
              "Be present, heavenly Father,\nTo give away this bride,\nAs Eve Thou gav'st to Adam\nOut of his own pierced side.",
              "Be present, gracious Saviour,\nTo join their loving hands,\nAs Thou didst bind two natures\nIn Thine eternal bands.",
              "Be present, Holy Spirit,\nTo bless them as they kneel,\nAs Thou for Christ the Bridegroom\nThe heavenly spouse dost seal.",
              "O spread Thy pure wings o'er them!\nLet no ill power find place,\nWhen onward through life's journey\nThe hallowed path they trace,",
              "Till to the home of gladness\nWith Christ's own Bride they rise,\nTo cast their crowns before Thee\nIn perfect sacrifice. Amen.",
            ] },
        ],
      },

      psalm128: {
        label: "Read along",
        parts: [
          { lang: "Psalm", title: "Psalm 128",
            numbered: true,
            verses: [
              "Blessed is everyone who fears the Lord, who walks in His ways!",
              "You shall eat the fruit of the labour of your hands; you shall be blessed, and it shall be well with you.",
              "Your wife will be like a fruitful vine within your house; your children will be like olive shoots around your table.",
              "Behold, thus shall the man be blessed who fears the Lord.",
              "The Lord bless you from Zion! May you see the prosperity of Jerusalem all the days of your life!",
              "May you see your children's children! Peace be upon Israel!",
            ] },
        ],
      },

      ogoNiFoluwa: {
        label: "Sing along",
        parts: [
          { lang: "Yorùbá", title: "Ògo Ni F'Olúwa",
            chorus: "Yin Oluwa, yin Oluwa\nFiyin fun Oluwa\nYin Oluwa, yin Oluwa\nẸ yọ niwaju Rẹ\nK'a to Baba wa lọ\nL'orukọ Jesu\nJẹ k'a jọ fogo fun, Oniṣẹ-iyanu",
            verses: [
              "Ogo ni f'Oluwa to ṣe ohun nla\nIfẹ lo mu ko fun wa ni Ọmọ Rẹ\nẸni t'O fẹmi Rẹ lelẹ f'ẹṣẹ wa\nTo si ṣilẹkun iye silẹ fun wa",
              "Irapada kikun ti Ẹjẹ Rẹ ra\nF'ẹnikẹni t'o gba ileri Rẹ gbọ\nẸni t'o buru ju b'o ba le gbagbọ\nLojukanna yio ri idariji gba",
              "O ṣ'ohun nla fun wa, O da wa lare\nAyọ wa di kikun ninu Ọmọ Rẹ\nOgo ati ẹwa irapada yi\nYo ya wa lẹnu 'gba t'a ba ri Jesu",
            ] },
          { lang: "English", title: "To God Be the Glory",
            chorus: "Praise the Lord, praise the Lord,\nLet the earth hear His voice!\nPraise the Lord, praise the Lord,\nLet the people rejoice!\nO come to the Father through Jesus the Son,\nAnd give Him the glory, great things He hath done!",
            verses: [
              "To God be the glory, great things He hath done!\nSo loved He the world that He gave us His Son,\nWho yielded His life an atonement for sin,\nAnd opened the life gate that all may go in.",
              "O perfect redemption, the purchase of blood,\nTo every believer the promise of God;\nThe vilest offender who truly believes,\nThat moment from Jesus a pardon receives.",
              "Great things He hath taught us, great things He hath done,\nAnd great our rejoicing through Jesus the Son;\nBut purer, and higher, and greater will be\nOur wonder, our transport, when Jesus we see.",
            ] },
        ],
      },

      pressingOn: {
        label: "Sing along",
        parts: [
          { lang: "Yorùbá", title: "Mo Ntẹ̀síwájú",
            chorus: "Oluwa jọ, gbe mi soke\nFa mi lọ si ibi giga\nApata t'o ga ju mi lọ\nOluwa jọ, gbe mi soke",
            verses: [
              "Mo ntẹsiwaju lọna na\nMo ngoke si lojojumọ\nMo ngbadura bi mo ti nlọ\nOluwa jọ, gbe mi soke",
              "Ifẹ ọkan mi ko duro\nLarin 'yemeji at'ẹru\nAwọn miran le maa gbe 'bẹ\nIbi giga l'ọkan mi fẹ",
              "Mo fẹ ki n ga ju aiye lọ\nB'eṣu tilẹ ngbogun ti mi\nMo nfi igbagbọ gbọ orin na\nTi awọn mimọ nkọ loke",
              "Mo fẹ de ibi giga julọ\nNinu ogo didan julọ\nMo ngbadura ki nle de'bẹ\nOluwa mu mi de'bẹ na",
              "Fa mi lọ si ibi giga\nLaisi Rẹ nko le de'bẹ\nFa mi titi d'oke ọrun\nKi nkọrin lat'ibi giga. Amin",
            ] },
          { lang: "English", title: "I'm Pressing On",
            chorus: "Lord, lift me up and let me stand,\nBy faith, on heaven's tableland,\nA higher plane than I have found;\nLord, plant my feet on higher ground.",
            verses: [
              "I'm pressing on the upward way,\nNew heights I'm gaining every day;\nStill praying as I onward bound,\n\"Lord, plant my feet on higher ground.\"",
              "My heart has no desire to stay\nWhere doubts arise and fears dismay;\nThough some may dwell where these abound,\nMy constant aim is higher ground.",
              "Beyond the mist I fain would rise,\nTo rest beneath unclouded skies,\nAbove earth's turmoil, peace is found\nBy those who dwell on higher ground.",
              "I long to scale the utmost height,\nThough rough the way, and hard the fight,\nMy song, while climbing, shall resound,\n\"Lord, lead me on to higher ground.\"",
              "Lord, lead me up the mountain side,\nI dare not climb without my Guide;\nAnd, heaven gained, I'll gaze around\nWith grateful heart from higher ground. Amen.",
            ] },
        ],
      },
    },
  },

  traditional: {
    title:    "Ìgbéyàwó Ìbílẹ̀",
    subtitle: "The Traditional Engagement · 10:00 in the morning",
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
    /* The times are a guide for the "happening now" marker — ← CHECK them
       against the MC's running order. */
    pages: [
      {
        heading: "The Welcome",
        items: [
          { time: "14:00", title: "Music" },
          { time: "14:15", title: "Arrival of Guests" },
          { time: "14:35", title: "Invitation of the High Table", by: "The Chairman · the Groom's Parents · the Bride's Family" },
          { time: "14:50", title: "Arrival of the Couple" },
        ],
      },
      {
        heading: "The Opening",
        items: [
          { time: "15:05", title: "Opening Prayer" },
          { time: "15:15", title: "Chairman's Opening Remarks" },
          { time: "15:35", title: "Cutting of the Wedding Cake" },
          { time: "15:50", title: "Dance by the Couple" },
        ],
      },
      {
        heading: "Toasts & Games",
        items: [
          { time: "16:05", title: "Toast to the Couple", by: "Damilare, the Best Man" },
          { time: "16:20", title: "Games & Fun", note: "Led by the MC — be ready to join in" },
          { time: "17:00", title: "Presentation of Gifts" },
        ],
      },
      {
        heading: "The Floor Is Open",
        items: [
          { time: "17:30", title: "Vote of Thanks" },
          { time: "17:40", title: "Closing Prayer & Benediction" },
          { time: "17:50", title: "Dance! Dance!! Dance!!!" },
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

  /* ── 8b. GIFTS ──────────────────────────────────────────────────────────
     A small note beneath "Thanking God" on the invitation page.
     Set to null to remove it.
     ───────────────────────────────────────────────────────────────────── */
  gifts: {
    note:    "With love, we kindly request that\nall gifts be monetary.",
    name:    "Adebisi Bukola Ifedolapo",
    account: "0130059467",
    bank:    "GTBank",
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
      body:  "Damilare (Best Man)\nNafisat (Best Lady)",   // ← add phone numbers when ready
    },

    /* The wedding party. More names to follow. */
    party: {
      title: "The Wedding Party",
      groups: [
        /* A group with a `lead` shows that person on their own line, then
           `names` flowing together beneath the `crew` label. */
        {
          name:  "For the Bride",
          lead:  { name: "Nafisat", role: "Best Lady" },
          crew:  "Bridesmaids",
          names: ["Stephanie", "Meenah", "Deenak", "Taiwo", "Uswat", "Hikmat", "Hipsy", "Kattyhub"],
        },
        {
          name:  "For the Groom",
          lead:  { name: "Damilare", role: "Best Man" },
          crew:  "Groomsmen",
          names: ["Leke", "Seun", "Joshua", "Michael", "Mayowa", "Samson", "Square", "Robor", "IG"],
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
