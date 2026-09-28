// ==========================================================================
// MODESTY BY SANAGKK - PRODUCT DATABASE & DATA STORE
// ==========================================================================

const SANAGKK_DATA = {
  brand: {
    name: "Modesty by SanaGKK",
    shortName: "SanaGKK",
    tagline: "Timeless Grace, Contemporary Modesty",
    founder: "Sana G. K. Khan",
    foundedYear: 2021,
    description: "An atelier dedicated to redefining contemporary modest fashion through exquisite Dubai Nida, fluid Medina silks, tailored co-ords, and artisanal embroidery in harmonious navy, beige, and slate palettes.",
    contactEmail: "atelier@modestybysanagkk.com",
    contactPhone: "+1 (800) 420-SANA",
    headquarters: "Dubai & London Design Studios",
    socials: {
      instagram: "@modestybysanagkk",
      tiktok: "@sanagkkofficial",
      pinterest: "modestybysanagkk"
    }
  },

  currencies: {
    USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
    AED: { symbol: "AED ", rate: 3.67, label: "AED (د.إ)" },
    GBP: { symbol: "£", rate: 0.78, label: "GBP (£)" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
    CAD: { symbol: "CA$", rate: 1.36, label: "CAD ($)" }
  },

  activeCurrency: "USD",

  categories: [
    { id: "all", name: "All Collections" },
    { id: "abayas", name: "Luxury Abayas" },
    { id: "hijabs", name: "Silks & Hijabs" },
    { id: "coords", name: "Modest Co-ords" },
    { id: "festive", name: "Festive & Kaftans" },
    { id: "essentials", name: "Innerwear & Slips" }
  ],

  products: [
    {
      id: "sg-01",
      title: "The Royal Navy Embroidered Silk Abaya",
      category: "abayas",
      price: 185,
      originalPrice: 220,
      badge: "Bestseller",
      rating: 4.9,
      reviewsCount: 142,
      fabric: "Pure Dubai Royal Nida & Silk Organza",
      colors: [
        { name: "Midnight Navy", hex: "#0B1B2B", bgClass: "bg-navy" },
        { name: "Desert Sand Beige", hex: "#E3D8C8", bgClass: "bg-beige" },
        { name: "Slate Mist", hex: "#5A6B7C", bgClass: "bg-slate" }
      ],
      sizes: ["52 (5'0\"-5'2\")", "54 (5'3\"-5'4\")", "56 (5'5\"-5'6\")", "58 (5'7\"-5'8\")", "60 (5'9\"-5'10\")"],
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
      ],
      description: "An iconic SanaGKK silhouette crafted from bespoke midnight navy Dubai Nida. Features delicate tonal hand-embroidery along the wide kimono sleeves, French seam finishing, and includes a matching premium chiffon sheila scarf.",
      details: [
        "Opacity: 100% Non-transparent",
        "Cut: Flowing A-line with relaxed draped silhouette",
        "Includes matching chiffon sheila & removable fabric belt",
        "Dry clean or delicate hand wash cold"
      ],
      featured: true,
      inStock: true
    },
    {
      id: "sg-02",
      title: "Sahara Sand Tailored Linen Co-ord Set",
      category: "coords",
      price: 145,
      originalPrice: 170,
      badge: "Trending",
      rating: 4.8,
      reviewsCount: 89,
      fabric: "100% Organic European Linen & Bamboo Viscose",
      colors: [
        { name: "Oatmeal Beige", hex: "#EFE8DE", bgClass: "bg-beige" },
        { name: "Deep Navy", hex: "#0B1B2B", bgClass: "bg-navy" },
        { name: "Muted Slate", hex: "#768798", bgClass: "bg-slate" }
      ],
      sizes: ["XS (US 2-4)", "S (US 6)", "M (US 8-10)", "L (US 12-14)", "XL (US 16)"],
      images: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
      ],
      description: "Effortless modesty engineered for modern living. A relaxed longline tunic blouse featuring hidden Mother-of-Pearl buttons, paired with wide-leg fluid trousers with an elasticated waistband and deep pockets.",
      details: [
        "High-neck mandarin collar with modest neckline coverage",
        "Breathable and temperature-regulating organic linen weave",
        "Discreet side slits for effortless movement",
        "Machine wash delicate in mesh bag"
      ],
      featured: true,
      inStock: true
    },
    {
      id: "sg-03",
      title: "Medina Silk Luxury Hijab Trio (Navy, Beige, Slate)",
      category: "hijabs",
      price: 68,
      originalPrice: 85,
      badge: "Bundle Deal",
      rating: 5.0,
      reviewsCount: 310,
      fabric: "Authentic French Medina Silk (Cruelty-Free)",
      colors: [
        { name: "Signature Trio Palette", hex: "#5A6B7C", bgClass: "bg-slate" }
      ],
      sizes: ["Standard Maxi (195cm x 75cm)"],
      images: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=map&fit=crop&w=900&q=80"
      ],
      description: "The crown jewel of your daily wardrobe. This curated trio pack features our three signature brand hues: Midnight Navy, Warm Sand Beige, and Feather Slate Gray. Offers a subtle satin sheen without slipping.",
      details: [
        "Dimensions: 195 cm x 75 cm for full drape & layering coverage",
        "Weightless, non-slip texture with buttery-soft handfeel",
        "Pin-snag resistant dense weave with baby-hemmed borders",
        "Includes luxury gold-embossed gift keepsake box"
      ],
      featured: true,
      inStock: true
    },
    {
      id: "sg-04",
      title: "Sultana Slate Gray Hand-Embroidered Kaftan",
      category: "festive",
      price: 240,
      originalPrice: 290,
      badge: "Limited Edition",
      rating: 4.9,
      reviewsCount: 64,
      fabric: "Heavyweight Crepe Satin & Antique Gold Zari",
      colors: [
        { name: "Slate Charcoal", hex: "#3B4A5A", bgClass: "bg-slate" },
        { name: "Regal Navy", hex: "#0B1B2B", bgClass: "bg-navy" },
        { name: "Champagne Beige", hex: "#E8DEC8", bgClass: "bg-beige" }
      ],
      sizes: ["54 (Regular)", "56 (Tall)", "58 (Extra Length)"],
      images: [
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80"
      ],
      description: "Created for festive galas, Eid celebrations, and luxury evenings. Intricate hand-stitched floral bullion embroidery runs along the modest plunge neckline and wrist cuffs, reflecting timeless regal heritage.",
      details: [
        "Fully lined in soft viscose for 100% opacity and skin comfort",
        "Internal adjustable waist cinch cord for tailored contouring",
        "Sweeping floor-length train with reinforced hemline",
        "Artisanal craftsmanship: 18 hours of hand-embroidery"
      ],
      featured: true,
      inStock: true
    },
    {
      id: "sg-05",
      title: "The Minimalist Slate Trench Abaya",
      category: "abayas",
      price: 195,
      originalPrice: 230,
      badge: "New Arrival",
      rating: 4.9,
      reviewsCount: 52,
      fabric: "Structured Korean Twill & Cotton Blend",
      colors: [
        { name: "Slate Gray", hex: "#5A6B7C", bgClass: "bg-slate" },
        { name: "Deep Navy Blue", hex: "#0B1B2B", bgClass: "bg-navy" },
        { name: "Trench Beige", hex: "#D4C3AC", bgClass: "bg-beige" }
      ],
      sizes: ["52", "54", "56", "58", "60"],
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80"
      ],
      description: "A masterclass in modern modest architecture. Blending the timeless silhouette of a double-breasted British trench coat with the graceful draping of a floor-length open abaya. Features horn-look buttons and storm flaps.",
      details: [
        "Detachable belt with luxury tortoiseshell buckle",
        "Deep welted functional pockets",
        "Wrinkle-resistant weather-ready Korean twill fabric",
        "Wear open over slip or buttoned as modest outerwear"
      ],
      featured: true,
      inStock: true
    },
    {
      id: "sg-06",
      title: "Vanilla Beige Ribbed Knit Modest Maxi Dress",
      category: "coords",
      price: 125,
      originalPrice: 150,
      badge: "Restocked",
      rating: 4.7,
      reviewsCount: 118,
      fabric: "Eco-Lenzing Viscose & Cashmere Touch Rib",
      colors: [
        { name: "Cream Beige", hex: "#F3ECE1", bgClass: "bg-beige" },
        { name: "Midnight Navy", hex: "#0B1B2B", bgClass: "bg-navy" },
        { name: "Dove Slate", hex: "#8E9DAE", bgClass: "bg-slate" }
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=900&q=80"
      ],
      description: "Non-clinging, thick gauge vertical rib knit cut into a modest column silhouette with an elegant mock-neck collar. Heavyweight drape ensures absolute coverage without silhouette clinging.",
      details: [
        "Zero transparency guarantee with double-knit weave",
        "Stretch recovery fiber retains shape throughout the day",
        "Modest high collar with back invisible zipper",
        "Ankle-grazing length"
      ],
      featured: false,
      inStock: true
    },
    {
      id: "sg-07",
      title: "Celestial Navy Pleated Open Abaya Set",
      category: "abayas",
      price: 175,
      originalPrice: 205,
      badge: "Exclusive",
      rating: 4.8,
      reviewsCount: 94,
      fabric: "Crushed Plisse Satin & Matte Georgette",
      colors: [
        { name: "Navy Blue", hex: "#0B1B2B", bgClass: "bg-navy" },
        { name: "Smoky Slate", hex: "#5A6B7C", bgClass: "bg-slate" },
        { name: "Champagne Beige", hex: "#EFE8DE", bgClass: "bg-beige" }
      ],
      sizes: ["52", "54", "56", "58", "60"],
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80"
      ],
      description: "Micro-accordion pleats cascade down the back and sleeves of this luxury open abaya. Moves like liquid silk with every step. Comes complete with a sleeveless matching under-dress slip and sheila.",
      details: [
        "Includes 3 pieces: Open Abaya, Inner Slip Dress, Matching Sheila",
        "Permanent thermo-set pleating holds shape through washes",
        "Discreet snap buttons along front closure for versatile styling",
        "Dry clean recommended"
      ],
      featured: true,
      inStock: true
    },
    {
      id: "sg-08",
      title: "Premium Crinkle Chiffon Hijabs (Collection)",
      category: "hijabs",
      price: 24,
      originalPrice: 30,
      badge: "Daily Essential",
      rating: 4.9,
      reviewsCount: 420,
      fabric: "Textured Breathable Matte Chiffon",
      colors: [
        { name: "Midnight Navy", hex: "#0B1B2B", bgClass: "bg-navy" },
        { name: "Warm Biscuit Beige", hex: "#D4C3AC", bgClass: "bg-beige" },
        { name: "Slate Shadow", hex: "#5A6B7C", bgClass: "bg-slate" },
        { name: "Alabaster Cream", hex: "#FAF7F2", bgClass: "bg-beige" }
      ],
      sizes: ["Maxi (185cm x 80cm)"],
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
      ],
      description: "Airy, effortlessly textured, and entirely pin-free friendly. The delicate crinkle weave gives volume, frame framing structure, and stays in place all day through work, travel, and events.",
      details: [
        "Non-slip micro-texture eliminates need for pins",
        "Machine washable on cold gentle cycle",
        "Generous maxi cut for multi-layer coverage",
        "Breathable all-season comfort"
      ],
      featured: false,
      inStock: true
    },
    {
      id: "sg-09",
      title: "The SanaGKK Foundation Modal Slip Dress",
      category: "essentials",
      price: 58,
      originalPrice: 70,
      badge: "Atelier Classic",
      rating: 4.9,
      reviewsCount: 205,
      fabric: "95% TENCEL Modal & 5% Elastane",
      colors: [
        { name: "Sand Beige (Sheer-Proof)", hex: "#E3D8C8", bgClass: "bg-beige" },
        { name: "Midnight Navy", hex: "#0B1B2B", bgClass: "bg-navy" },
        { name: "Slate Charcoal", hex: "#3B4A5A", bgClass: "bg-slate" }
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
      ],
      description: "The invisible foundation piece every modest closet requires. Engineered with maximum opacity and zero static cling, designed specifically to be worn underneath open abayas, kimonos, and kaftans.",
      details: [
        "Ankle-length with modest crew neckline",
        "Ultra-soft cooling TENCEL modal fiber",
        "Anti-static finish ensures outer garments glide smoothly",
        "Machine wash cold"
      ],
      featured: false,
      inStock: true
    },
    {
      id: "sg-10",
      title: "Noor Festive Gold-Laced Velvet Kaftan",
      category: "festive",
      price: 280,
      originalPrice: 340,
      badge: "Haute Couture",
      rating: 5.0,
      reviewsCount: 38,
      fabric: "Silk-Infused Micro-Velvet & Golden Threading",
      colors: [
        { name: "Royal Deep Navy", hex: "#0B1B2B", bgClass: "bg-navy" },
        { name: "Smoky Slate Gray", hex: "#4A5A6A", bgClass: "bg-slate" },
        { name: "Desert Beige", hex: "#DFD3C3", bgClass: "bg-beige" }
      ],
      sizes: ["54", "56", "58", "60"],
      images: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80"
      ],
      description: "A show-stopping heirloom piece from the SanaGKK private bridal and evening capsule. Featuring micro-velvet that absorbs light to create rich deep tones, bordered with hand-loomed gold brocade trims.",
      details: [
        "Weighty luxury drape that elongates the silhouette",
        "Concealed zipper at back with hook-and-eye closure",
        "Flattering bell sleeves with organza inner lining",
        "Dry clean only"
      ],
      featured: true,
      inStock: true
    },
    {
      id: "sg-11",
      title: "The Oasis Wide-Leg Satin Modest Co-ord",
      category: "coords",
      price: 160,
      originalPrice: 190,
      badge: "New Release",
      rating: 4.8,
      reviewsCount: 47,
      fabric: "Heavyweight Hammered Matte Satin",
      colors: [
        { name: "Warm Champagne Beige", hex: "#E8DEC8", bgClass: "bg-beige" },
        { name: "Slate Blue-Gray", hex: "#5A6B7C", bgClass: "bg-slate" },
        { name: "Midnight Navy", hex: "#0B1B2B", bgClass: "bg-navy" }
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80"
      ],
      description: "Lustrous hammered satin that drapes fluidly without accentuating curves. Features a relaxed kimono tunic with side slits and high-waisted palazzo pants tailored with deep practical pockets.",
      details: [
        "Subtle textured weave resists creasing",
        "High-rise elasticated back with clean front waistband",
        "Full arm and neck modesty coverage",
        "Hand wash cold"
      ],
      featured: false,
      inStock: true
    },
    {
      id: "sg-12",
      title: "Architectural Slate Kimono Overcoat",
      category: "abayas",
      price: 170,
      originalPrice: 200,
      badge: "Sana's Pick",
      rating: 4.9,
      reviewsCount: 76,
      fabric: "Bonded Ottoman Ribbed Crepe",
      colors: [
        { name: "Slate Charcoal", hex: "#5A6B7C", bgClass: "bg-slate" },
        { name: "Bespoke Navy", hex: "#0B1B2B", bgClass: "bg-navy" },
        { name: "Almond Beige", hex: "#DFD3C3", bgClass: "bg-beige" }
      ],
      sizes: ["52", "54", "56", "58", "60"],
      images: [
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80"
      ],
      description: "Sculptural minimalism defined. Designed with clean drop shoulders, folded lapels, and structured sleeve cuffs. The slate gray hue harmonizes effortlessly over both beige linen and navy silks.",
      details: [
        "Clean minimal silhouette without external hardware",
        "Heavyweight crepe provides tailored, wrinkle-free drape",
        "Pairs seamlessly with SanaGKK modal slip dresses",
        "Dry clean only"
      ],
      featured: false,
      inStock: true
    }
  ],

  lookbook: [
    {
      id: "look-1",
      title: "The Desert Monolith Ensemble",
      subtitle: "Sahara Sand Linen Co-ord paired with Slate Medina Silk",
      palette: ["#EFE8DE", "#5A6B7C", "#C4AC8F"],
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      description: "A breezy silhouette that commands attention through minimalist architectural draping. Perfect for daytime meetings, travel, and warm desert evenings.",
      products: ["sg-02", "sg-03"],
      bundleDiscount: "15% OFF when paired"
    },
    {
      id: "look-2",
      title: "The Midnight Royal Soirée",
      subtitle: "Royal Navy Embroidered Abaya with Silk Organza Accents",
      palette: ["#0B1B2B", "#C8A97E", "#5A6B7C"],
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      description: "The pinnacle of SanaGKK craftsmanship. Midnight navy Dubai Nida adorned with artisanal hand-embroidery that catches the ambient evening candlelight.",
      products: ["sg-01", "sg-09"],
      bundleDiscount: "15% OFF when paired"
    },
    {
      id: "look-3",
      title: "The Contemporary Slate Minimalist",
      subtitle: "Structured Slate Trench Abaya over Sand Foundation Slip",
      palette: ["#5A6B7C", "#DFD3C3", "#0B1B2B"],
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
      description: "An urban interpretation of modest dressing. Clean lapels, functional welt pockets, and a neutral palette designed for the sophisticated woman on the move.",
      products: ["sg-05", "sg-08"],
      bundleDiscount: "15% OFF when paired"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      name: "Amina Al-Mansoor",
      location: "Dubai, UAE",
      rating: 5,
      date: "September 14, 2026",
      verified: true,
      productTitle: "The Royal Navy Embroidered Silk Abaya",
      comment: "The drape of this Dubai Nida is unlike anything I've purchased in London or Dubai. The midnight navy has this mesmerizing richness, and the beige embroidery is subtle yet undeniably couture. SanaGKK has won a lifelong customer.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "rev-2",
      name: "Mariam Katherine D.",
      location: "Toronto, Canada",
      rating: 5,
      date: "September 20, 2026",
      verified: true,
      productTitle: "Sahara Sand Tailored Linen Co-ord Set",
      comment: "Finally, a modest co-ord that doesn't feel like a shapeless bag! The high neck and side slits give such an elevated editorial aesthetic. The fabric is heavy enough that it isn't see-through at all. Absolutely worth every penny.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "rev-3",
      name: "Dr. Fatima Zehra",
      location: "London, UK",
      rating: 5,
      date: "August 29, 2026",
      verified: true,
      productTitle: "Medina Silk Luxury Hijab Trio",
      comment: "The trio colors (Navy, Beige, Slate) match literally 90% of my wardrobe. The Medina silk stays in place without tearing your undercaps or requiring 10 pins. The magnetic box it arrived in was gorgeous as a gift.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "rev-4",
      name: "Noor Al-Hassan",
      location: "Dallas, Texas",
      rating: 5,
      date: "September 02, 2026",
      verified: true,
      productTitle: "The Minimalist Slate Trench Abaya",
      comment: "I wore this to an international medical conference and received so many compliments. It strikes the perfect balance between corporate professional and effortlessly modest. Length 56 was spot on for my 5'5\" height.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
    }
  ],

  sizeGuideData: [
    { height: "5'0\" - 5'2\" (152 - 157 cm)", recommendedAbaya: "52", bust: "36 - 38 in", sleeve: "27 in", hip: "44 in" },
    { height: "5'3\" - 5'4\" (160 - 163 cm)", recommendedAbaya: "54", bust: "38 - 40 in", sleeve: "28 in", hip: "46 in" },
    { height: "5'5\" - 5'6\" (165 - 168 cm)", recommendedAbaya: "56", bust: "40 - 42 in", sleeve: "29 in", hip: "48 in" },
    { height: "5'7\" - 5'8\" (170 - 173 cm)", recommendedAbaya: "58", bust: "42 - 44 in", sleeve: "30 in", hip: "50 in" },
    { height: "5'9\" - 6'0\" (175 - 183 cm)", recommendedAbaya: "60", bust: "44 - 46 in", sleeve: "31 in", hip: "52 in" }
  ],

  faqs: [
    {
      q: "How do I choose the correct abaya length for my height?",
      a: "Our abaya sizing is based directly on overall body height measured in inches from the top of your shoulder down to your ankle/floor. For example, if you are 5'4\" tall, size 54 will gracefully graze the top of your shoes. Check our interactive Size Guide calculator above to find your exact match."
    },
    {
      q: "Are the fabrics completely opaque (non-see-through)?",
      a: "Yes, 100%. Modesty by SanaGKK was created on the uncompromising principle of true modesty. Every fabric—from our Dubai Nida to our Sand Linen and Ribbed Knits—undergoes opacity and light-transmission testing to guarantee zero transparency."
    },
    {
      q: "What makes SanaGKK's Navy, Beige, and Slate palette special?",
      a: "Our founder Sana Khan developed this signature trifecta to allow seamless capsule wardrobe building. Midnight Navy provides royal gravitas, Warm Sand Beige brings desert warmth and serenity, and Slate Gray delivers architectural, contemporary neutrality."
    },
    {
      q: "What are your worldwide shipping and return policies?",
      a: "We provide tracked express worldwide delivery via DHL & FedEx. Orders over $150 qualify for complimentary shipping. We offer a 30-day hassle-free return and exchange policy on all unworn items with tags attached in their original SanaGKK dustbag."
    },
    {
      q: "Can I request custom length alterations?",
      a: "Yes! At Modesty by SanaGKK, we offer complimentary custom length adjustments on our Made-to-Order luxury abayas. Simply select 'Custom Length' during checkout or leave a note with your specific shoulder-to-hem measurement."
    }
  ],

  promoCodes: {
    "MODEST10": { discountPercent: 10, description: "10% Off Your Entire Order" },
    "WELCOME10": { discountPercent: 10, description: "10% Welcome Club Gift" },
    "SANAVIP": { discountPercent: 15, description: "15% Exclusive Atelier VIP Privilege" },
    "FREESHIP": { discountPercent: 0, freeShipping: true, description: "Free Express Shipping" }
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.SANAGKK_DATA = SANAGKK_DATA;
}
