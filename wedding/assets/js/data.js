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
    traditional: false,   // live — but behind the passcode below
    reception:   false,
    details:     false,

    initials: ["O", "O"],          // shown as  O │ O
    year:     "2026",
    headline: "Coming Soon",
    note:     "Our full programme will appear here",   // set to null to hide

    /* A page listed here is live, but only for someone with the passcode,
       until  openOn  — then it opens for every guest by itself, even on a
       phone that already has the page open. Write it as
       "2026-11-28T07:00+01:00"  (7:00 am Nigerian time); a date alone,
       "2026-11-28", means midnight on the guest's phone. Everyone else sees the Coming Soon design, with a small
       "Minister's access" box beneath it. Once a phone has unlocked the
       page it stays unlocked. Change the passcode and every phone is
       locked out again. Delete a line to open that page to everyone now.

       This keeps the page from casual eyes; it is not real security. The
       words themselves sit in this file, which anyone who knows how can
       read. Fine for an order of service, not for anything secret. */
    locked: {
      church:      { passcode: "HOLY2811", openOn: "2026-11-28T07:00+01:00" },
      traditional: { passcode: "HOLY2811", openOn: "2026-11-28T07:00+01:00" },
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
        heading: "Our Wedding Programme",
        subtitle: "Solemnization of Holy Matrimony between",
        lead:  "Oluwabukola Adebisi\n&\nOluwatobiloba Okunogbe",   // ← CHECK  surnames, as in section 1
        items: [
          { title: "Saturday, 28th November 2026" },
          { title: "8:00 in the morning" },
          { title: "Halatria Hotel and Towers", note: "KM2, adjacent Osogbo City Stadium, New Ikirun Road, Osogbo, Osun State" },
        ],
      },
      {
        heading: "Officiating Ministers",
        subtitle: "Vineyard Full Gospel Mission (Inc.)",
        items: [
          { title: "Prophet Adigun Oyegbemi Stephen" },
          { title: "Pastor (Dr.) Fakayode Sunday" },
          { title: "Pastor Oladosu Taiwo" },
          { title: "Pastor Mrs. Adigun Julianah" },
          { title: "Pastor Vincent Godwin" },
          { title: "Pastor Nicholas Ogunlade", note: "Ekiti" },
          { title: "Pastor Tolutope Dada", note: "Abuja" },
        ],
      },
      {
        heading: "The Gathering",
        items: [
          { title: "Play Song" },
          { title: "Prayers" },
          { title: "Processional Hymn", by: "Ọkàn Mi Yọ̀ Nínú Olúwa · My Soul Is Happy in Jesus",
            words: "okanMiYo" },
          { title: "The Exhortation", words: "exhortation" },
        ],
      },
      {
        heading: "The Marriage",
        items: [
          { title: "Charge and Declaration", words: "charge" },
          { title: "Hymn", by: "Ire T'a Sú Ní Édẹ́nì · The Voice That Breathed o'er Eden",
            note: "I.O.M. 503 · Hymn 522", words: "ireTasu" },
          { title: "Solemnization of the Marriage", note: "Vows and the giving of rings", words: "solemnization" },
          { title: "The Acclamation", note: "The mother of the groom welcomes the bride", words: "acclamation" },
        ],
      },
      {
        heading: "The Ministry of the Word",
        items: [
          { title: "Old Testament Reading", by: "Genesis 2:18–24", note: "Read by the groom" },
          { title: "Psalm 128", words: "psalm128" },
          { title: "New Testament Reading", by: "Ephesians 5:22–33", note: "Read by the bride" },
          { title: "Hymn", by: "Ògo Ni F'Olúwa · To God Be the Glory", words: "ogoNiFoluwa" },
          { title: "Message", note: "Opens with a prayer for the couple", words: "collect" },
        ],
      },
      {
        heading: "Prayer & Blessing",
        items: [
          { title: "Hymn" },                       // ← CHECK  this hymn isn't named in the booklet
          { title: "Prayer and Benediction", words: "benediction" },
          { title: "Signing of the Marriage Register", note: "Choir special choruses" },
          { title: "Introduction of the Couple", note: "Mr. & Mrs. Okunogbe", words: "introduction" },
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
              "Ba wa pe Imanuẹli\nSiso ọwọ wọn pọ\nB'ẹda meji ti dapọ\nN'ara ijinlẹ Rẹ",
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

      /* ── The spoken parts of the service ─────────────────────────────────
         Each line is one of:
           "Plain text"                       — spoken by the minister
           { r: "..." }                       — a direction, printed in italics
           { who: "The Groom", say: "..." }   — a named speaker
         ─────────────────────────────────────────────────────────────── */

      exhortation: {
        label: "Read along",
        parts: [
          { lang: "The Exhortation", title: "Dearly Beloved",
            liturgy: [
              "Dearly beloved, we are gathered here in the presence of God and before this congregation to join Oluwabukola and Oluwatobiloba in Holy Matrimony. Marriage is a holy estate, instituted by God and commended in the Scriptures, confirmed by Christ's solemn words and hallowed by His gracious presence at the marriage feast in Cana. It is declared by the great Apostle Paul to signify the mystical union that is between Christ and His Church. Therefore it ought not to be entered into lightly, but thoughtfully, reverently, discreetly, soberly and in the fear of God, duly considering the causes for which it was ordained.",
              "Firstly, marriage was ordained for companionship, mutual society, help and comfort, which husband and wife ought to have from each other, in all circumstances.",
              "Secondly, marriage was ordained for the procreation of children, to be brought up in the fear and nurture of the Lord, to the praise of His holy name.",
              "Thirdly, marriage was ordained as a protection against sin and for the avoidance of all sexual immorality, that those who have not the rare gift of celibacy might marry and keep themselves undefiled members of Christ's body.",
              "Into this holy estate of marriage Oluwabukola and Oluwatobiloba come now to be joined. Therefore, if any man can show any just cause why they may not lawfully be joined together, let him now declare it, or else hereafter hold his peace.",
            ] },
        ],
      },

      charge: {
        label: "Read along",
        parts: [
          { lang: "Charge and Declaration", title: "The Charge",
            liturgy: [
              { r: "The minister says:" },
              "I require and charge you both, as you shall answer on the dreadful day of judgement, when the secrets of all hearts shall be disclosed, that if either of you know of any impediment why you may not lawfully be joined together in Holy Matrimony, you do now confess it. Be well assured that if any persons are joined together otherwise than God's Word allows, they are not united by God.",
              { who: "The Groom", say: "I do truthfully declare that I do not know of any lawful reason why I, Oluwatobiloba, may not be joined together in matrimony to Oluwabukola." },
              { who: "The Bride", say: "I do truthfully declare that I do not know of any lawful reason why I, Oluwabukola, may not be joined together in matrimony to Oluwatobiloba." },
              { r: "If no impediment is alleged, the minister says to the groom:" },
              "Oluwatobiloba, will you have Oluwabukola to be your wedded wife, to live together according to God's ordinance in the holy estate of marriage? Will you love her, comfort her, honour her, keep her in sickness and in health, and, forsaking all others, cleave to her as long as you both shall live?",
              { who: "The Groom", say: "I will, the Lord being my help." },
              { r: "Then the minister asks the bride:" },
              "Oluwabukola, will you have Oluwatobiloba to be your wedded husband, to live together according to God's ordinance in the holy estate of marriage? Will you love him, comfort him, honour him and keep him in sickness and in health, and, forsaking all others, cleave only to him as long as you both shall live?",
              { who: "The Bride", say: "I will, the Lord being my help." },
            ] },
        ],
      },

      solemnization: {
        label: "Read along",
        parts: [
          { lang: "Solemnization", title: "The Marriage",
            liturgy: [
              { r: "The minister asks:" },
              "Who gives this woman to be married to this man?",
              { r: "The father of the bride, or a representative of the family, comes forward, hands the bride to the minister and says:" },
              { who: "The Family", say: "I do." },

              { r: "The minister, receiving the bride's hand, causes the man to take the woman by the right hand. Facing each other, the groom says:" },
              { who: "The Groom", say: "I, Oluwatobiloba, take you, Oluwabukola, to be my wife, to have and to hold from this day forward, for better, for worse, for richer, for poorer, in sickness and in health, to love and to cherish, until we are parted by death, according to God's holy law. This is my solemn vow." },
              { r: "They loose hands. The bride takes the groom by the right hand and says:" },
              { who: "The Bride", say: "I, Oluwabukola, take you, Oluwatobiloba, to be my husband, to have and to hold from this day forward, for better, for worse, for richer, for poorer, in sickness and in health, to love and to cherish, until we are parted by death, according to God's holy law. This is my solemn vow." },

              { r: "The minister asks:" },
              "And what token do you share to represent your love and commitment to each other?",
              { r: "The minister receives the rings and, holding them up, says:" },
              "The ring is the symbol of wholeness and perfection. It is made of gold, which is a precious and durable metal. What better representation of your feelings for each other?",
              { r: "Then he prays:" },
              "Heavenly Father, by Your blessing, let these rings be to Oluwatobiloba and Oluwabukola a symbol of unending love and faithfulness, to remind them of the vow and covenant which they have made this day; through Jesus Christ our Lord. Amen.",

              { r: "The groom places the ring on the fourth finger of the bride's left hand and, holding it there, says:" },
              { who: "The Groom", say: "I give you this ring as a sign of our marriage. With my body I honour you; all that I am I give to you, within the love of God the Father, the Son and the Holy Spirit. Amen." },
              { r: "They loose hands. The bride places a ring on the groom's fourth finger and, holding it there, says:" },
              { who: "The Bride", say: "I give you this ring as a sign of our marriage. With my body I honour you; all that I am I give to you, within the love of the Father, the Son and the Holy Spirit. Amen." },

              { r: "The bride and groom kneel, while the congregation rises. The minister says:" },
              "Eternal God, Creator and Preserver of all, Giver of all spiritual grace and the Author of everlasting life, send Your blessing upon Oluwatobiloba and Oluwabukola, whom we bless in Your name; that, living faithfully together, they may fulfil the vow and covenant they have made, of which these rings given and received are a token and pledge. May they ever remain in perfect love and peace together, and live according to Your laws, through Jesus Christ our Lord. Amen.",
              "Now that Oluwatobiloba and Oluwabukola have given their consent and made their vows to each other before God and this congregation, with the joining of hands and the giving of rings, I declare that they are husband and wife, in the name of God the Father, God the Son and God the Holy Spirit. Amen.",
              { r: "The minister joins their right hands together and says:" },
              "Those whom God has joined together, let no man put asunder. Amen.",

              { r: "The congregation remains standing; the couple kneel, and the minister blesses them:" },
              "God the Father, God the Son and God the Holy Spirit bless, preserve and keep you. May the Lord pour upon you the riches of His grace, that you may faithfully live together and receive the blessing of eternal life. Amen.",
              { r: "The minister says to the parents:" },
              "As Oluwatobiloba and Oluwabukola enter a new life together, will you, their parents, give them your blessing in the presence of this congregation?",
              { who: "The Parents", say: "May God bless you both, in Jesus' name." },
              { r: "The minister may ask the congregation:" },
              "You, as friends and families, have come to witness this exchange of vows. Will you do all in your power to support this marriage, now and in the years ahead?",
              { who: "All", say: "We will, in Jesus' name." },
              { r: "The congregation remains standing while the couple kneel, and the minister blesses them:" },
              "May God the Father, God the Son and God the Holy Spirit bless, preserve and keep you, both in body and soul. May the Lord mercifully grant you the riches of His grace, that you may please Him both in body and soul, and, living together in faith and love, may you receive the blessing of eternal life. Amen.",
            ] },
        ],
      },

      acclamation: {
        label: "Read along",
        parts: [
          { lang: "The Acclamation", title: "Welcome to the Family",
            liturgy: [
              { r: "The mother of the groom comes forward. The minister says:" },
              "In the name of God and in the presence of this congregation, we hand Oluwabukola, now Mrs. Okunogbe, to you as a full member of your family. Will you promise, on behalf of your family, to continue to uphold them in your prayers and give them your moral support?",
              { who: "The Mother", say: "I promise, in the name of God." },
              { r: "The minister prays for the family:" },
              "Eternal God, Creator and Sustainer of us all, give Your grace to the Okunogbe family. Grant that in the years ahead they may be united in Your love, and in the strength of the Holy Spirit may live together in the love, joy and peace of our Saviour Jesus Christ. Amen.",
            ] },
        ],
      },

      collect: {
        label: "Read along",
        parts: [
          { lang: "Before the Readings", title: "Let Us Pray",
            liturgy: [
              { who: "Minister", say: "The Lord be with you." },
              { who: "All", say: "And also with you." },
              { who: "Minister", say: "Let us pray." },
              "O gracious and everlasting God, You have created us male and female in Your image. Look mercifully upon this man and this woman who have come to You seeking Your blessing, and assist them with Your grace, that through fidelity and steadfast love they may honour and keep the promises and vows they have made; through Jesus Christ our Lord, who lives and reigns with You in the unity of the Holy Spirit, one God, for ever and ever. Amen.",
            ] },
        ],
      },

      benediction: {
        label: "Read along",
        parts: [
          { lang: "Prayer and Benediction", title: "The Prayers",
            liturgy: [
              "Almighty God, the most merciful Father, the strengthener of all who put their trust in You: we pray that as You have brought Oluwabukola and Oluwatobiloba together by Your providence, so You will enrich them by Your grace, that those vows which they have made to one another in Your sight they may truly and faithfully perform; through Jesus Christ our Lord. Amen.",
              "Almighty Father, You have created all mankind to glorify You in body and in spirit. Give these children of Yours joy in one another, as living temples of the Holy Spirit, and bring them by this joy to know and share in Your creative and redeeming love; through Jesus Christ our Lord. Amen.",
              "Eternal God, true and loving Father, in holy marriage You make Your servants one. May their life together witness to Your love in this troubled world. May unity overcome division, forgiveness heal injury, and joy triumph over sorrow; through Jesus Christ our Lord. Amen.",
              "We praise You, Father, that You have made all things and hold all things in being. In the beginning You created the universe and made mankind in Your own likeness; because it was not good for man to be alone, You created them male and female, and in marriage You join man and woman in one flesh, teaching us that what You have united may never be divided. We praise You that You have made this holy mystery a symbol of the marriage of Christ with His Church, and an image of Your eternal covenant with Your people. And we pray for Your blessing on this man and woman, who come before You as partners and heirs together of Your promises. Grant that this man may love his wife as Christ loves His bride, the Church, giving Himself for it and cherishing it as His own flesh; and grant that this woman may love her husband and follow the example of those holy women whose praises are sung in the Scriptures; and as witnesses of Christ to one another, let them live to see their children's children, and bring them at the last to the fullness of life with the saints in the kingdom of heaven; through Jesus Christ our Lord. Amen.",
              "Heavenly Father, we thank You that in our earthly lives You speak of Your life. We pray that through their marriage Oluwatobiloba and Oluwabukola may know You more clearly, love You more dearly and follow You more nearly, day by day; through Jesus Christ our Lord. Amen.",
              "Almighty God, our heavenly Father, who gave marriage to be a source of blessing to mankind, we thank You for the joys of family life. May we know Your presence and peace in our homes; fill us with Your love, and use us for Your glory; through Jesus Christ our Lord.",
              { r: "The benediction:" },
              "And the blessing of God the Father, God the Son and God the Holy Spirit be upon you, now and for evermore. Amen.",
            ] },
        ],
      },

      introduction: {
        label: "Read along",
        parts: [
          { lang: "Introduction of the Couple", title: "Mr. & Mrs. Okunogbe",
            liturgy: [
              { r: "With the couple facing the congregation, the minister says:" },
              "Brothers and sisters, I am happy to present to you: Mr. & Mrs. Oluwatobiloba Okunogbe!",
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
              "Mo fẹ de ibi giga julọ\nNinu ogo didan julọ\nMo ngbadura ki nle de'bẹ\nOluwa mu mi de'le na",
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
        subtitle: "The Welcome",
        items: [
          { title: "Welcoming the Bride's Family" },
          { title: "Arrival of the Groom's Family" },
          { title: "Praise and Worship" },
          { title: "Opening Prayer" },
        ],
      },
      {
        heading: "Ìdí Àpéjọ",
        subtitle: "Why We Are Gathered",
        items: [
          { title: "Purpose of Gathering" },
          { title: "Arrival of the Groom" },
          { title: "Arrival of the Bride" },
        ],
      },
      {
        heading: "Ìwé Ìtọrọ",
        subtitle: "The Letters & the Engagement",
        items: [
          { title: "Presentation of Letters", note: "Proposal & Acceptance" },
          { title: "Engagement", note: "Presentation & sanctification of the bride's items" },
          { title: "Pronouncement" },
        ],
      },
      {
        heading: "Ayẹyẹ",
        subtitle: "The Celebration",
        items: [
          { title: "Cutting of Cake" },
          { title: "Toast of the Couple" },
          { title: "Guest Entertainment" },
          { title: "Dance! Dance!! Dance!!!" },
        ],
      },
      {
        heading: "Ìdágbére",
        subtitle: "The Farewell",
        items: [
          { title: "Presentation of Gifts" },
          { title: "Closing Prayer & Benediction" },
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
