export interface ModelRepairFAQ {
  question: string;
  answer: string;
}

export interface ModelRepairPage {
  model: string;
  slug: string;
  brand: "apple" | "samsung" | "google" | "ipad";
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroHeading: string;
  heroSubheading: string;
  intro: string;
  repairTypes: { name: string; time: string; priceRange: string }[];
  commonIssues: string[];
  specs: string; // brief device specs context
  warrantyNote: string;
  faqs: ModelRepairFAQ[];
}

export const modelRepairPages: ModelRepairPage[] = [
  // ─── iPhone Models ────────────────────────────────────────────────
  {
    model: "iPhone 16 Pro Max",
    slug: "iphone-16-pro-max-repair",
    brand: "apple",
    metaTitle: "iPhone 16 Pro Max Repair Heidelberg Melbourne | Screen & Battery",
    metaDescription:
      "iPhone 16 Pro Max screen repair & battery replacement in Heidelberg. Super Retina XDR OLED display repair, same-day service, 6-month warranty. Warringal Shopping Centre.",
    keywords: [
      "iphone 16 pro max screen repair",
      "iphone 16 pro max screen replacement",
      "iphone 16 pro max battery replacement",
      "iphone 16 pro max repair heidelberg",
      "iphone 16 pro max repair melbourne",
      "iphone 16 pro max screen repair cost",
      "fix iphone 16 pro max screen",
      "iphone 16 pro max cracked screen",
    ],
    heroHeading: "iPhone 16 Pro Max Repair",
    heroSubheading:
      "Expert repair for Apple's flagship — OLED display, battery, camera & more",
    intro:
      "The iPhone 16 Pro Max features a stunning 6.9-inch Super Retina XDR OLED display with ProMotion 120Hz technology and a titanium frame. When this premium device needs repair, you need technicians who understand its advanced technology. Mobile Armour at Warringal Shopping Centre, Heidelberg, specialises in iPhone 16 Pro Max repairs — from cracked OLED screen replacement to battery swaps and camera lens repair. We use high-quality replacement parts that match Apple's display standards for colour accuracy and touch responsiveness. Most repairs are completed same-day with our 6-month warranty.",
    repairTypes: [
      { name: "Screen Replacement (OLED)", time: "45-60 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "25-35 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "60-90 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "30-45 min", priceRange: "Call for quote" },
      { name: "Charging Port Repair", time: "30-45 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Cracked or shattered OLED display",
      "Battery draining faster than expected",
      "Back glass cracked from drop",
      "Camera lens scratched or broken",
      "Charging port not working or loose connection",
      "Face ID not functioning after drop",
    ],
    specs:
      "6.9-inch Super Retina XDR OLED, 2868x1320 resolution, ProMotion 120Hz, A18 Pro chip, titanium frame, 48MP camera system, USB-C",
    warrantyNote:
      "All iPhone 16 Pro Max repairs come with a 6-month warranty on parts and workmanship.",
    faqs: [
      {
        question: "How much does iPhone 16 Pro Max screen repair cost?",
        answer:
          "iPhone 16 Pro Max screen replacement pricing depends on the type of damage. The 6.9-inch OLED display requires precision repair by certified technicians. Call 0405-326-205 for an instant quote — we're typically more affordable than Apple's official pricing.",
      },
      {
        question: "Can you fix iPhone 16 Pro Max Face ID after screen repair?",
        answer:
          "Yes. Our technicians carefully transfer the Face ID components during screen replacement to maintain full Face ID functionality. We test Face ID before and after every repair to ensure it works perfectly.",
      },
      {
        question: "How long does iPhone 16 Pro Max screen replacement take?",
        answer:
          "Most iPhone 16 Pro Max screen replacements are completed in 45-60 minutes. You can wait at Warringal Shopping Centre while we work on your device.",
      },
    ],
  },
  {
    model: "iPhone 16",
    slug: "iphone-16-repair",
    brand: "apple",
    metaTitle: "iPhone 16 Repair Heidelberg Melbourne | Screen, Battery & More",
    metaDescription:
      "iPhone 16 screen repair & battery replacement in Heidelberg Melbourne. OLED display repair, same-day service, 6-month warranty at Warringal Shopping Centre.",
    keywords: [
      "iphone 16 screen repair",
      "iphone 16 screen replacement",
      "iphone 16 battery replacement",
      "iphone 16 repair heidelberg",
      "iphone 16 repair melbourne",
      "iphone 16 screen repair cost",
      "fix iphone 16 cracked screen",
      "iphone 16 camera repair",
    ],
    heroHeading: "iPhone 16 Repair",
    heroSubheading:
      "Fast, affordable repairs for the iPhone 16 — screen, battery, camera & charging port",
    intro:
      "The iPhone 16 brings the Dynamic Island, 48MP camera system, and a vibrant 6.1-inch Super Retina XDR OLED display to Apple's standard lineup. If your iPhone 16 has a cracked screen, dying battery, or damaged camera, Mobile Armour in Heidelberg has you covered. Our technicians are experienced with the iPhone 16's internal architecture, including the new battery removal design that makes replacements quicker and cleaner. We use premium-quality OLED replacement screens tested for colour accuracy, brightness, and touch response. Walk in to Warringal Shopping Centre or call ahead — most iPhone 16 repairs are same-day.",
    repairTypes: [
      { name: "Screen Replacement (OLED)", time: "40-55 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "20-30 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "60-90 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "30-40 min", priceRange: "Call for quote" },
      { name: "Charging Port (USB-C)", time: "30-40 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Cracked OLED screen from drops",
      "Battery health below 80%",
      "Back glass shattered",
      "Camera producing blurry photos",
      "USB-C port not charging or loose",
      "Speaker or microphone issues",
    ],
    specs:
      "6.1-inch Super Retina XDR OLED, 2556x1179, A18 chip, 48MP dual camera, Dynamic Island, USB-C, Ceramic Shield front",
    warrantyNote:
      "All iPhone 16 repairs include our 6-month parts and workmanship warranty.",
    faqs: [
      {
        question: "How much does iPhone 16 screen repair cost in Melbourne?",
        answer:
          "iPhone 16 screen replacement is priced competitively — typically less than Apple's official service. The OLED display requires precise calibration after replacement. Call 0405-326-205 for your exact quote.",
      },
      {
        question: "Does iPhone 16 battery replacement affect my data?",
        answer:
          "Not at all. Battery replacement doesn't touch your storage — all photos, apps, messages, and settings remain exactly as they are. We always recommend a backup as a precaution.",
      },
      {
        question: "Is the iPhone 16 still waterproof after screen repair?",
        answer:
          "We apply professional-grade adhesive sealing during screen replacement. While we restore the seal as close to factory as possible, no third-party repair can guarantee IP68 certification. A waterproof case is recommended.",
      },
    ],
  },
  {
    model: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max-repair",
    brand: "apple",
    metaTitle: "iPhone 15 Pro Max Repair Heidelberg | Screen & Battery Service",
    metaDescription:
      "iPhone 15 Pro Max screen repair and battery replacement in Heidelberg Melbourne. Titanium frame, OLED display repair. Same-day, 6-month warranty.",
    keywords: [
      "iphone 15 pro max screen repair",
      "iphone 15 pro max screen replacement",
      "iphone 15 pro max battery replacement",
      "iphone 15 pro max repair heidelberg",
      "iphone 15 pro max repair melbourne",
      "iphone 15 pro max repair cost",
      "fix iphone 15 pro max screen",
    ],
    heroHeading: "iPhone 15 Pro Max Repair",
    heroSubheading:
      "Titanium-frame flagship repair — screen, battery, camera & more",
    intro:
      "Apple's iPhone 15 Pro Max was the first iPhone to feature a titanium frame and the A17 Pro chip, with a massive 6.7-inch Super Retina XDR display and a 5x optical zoom periscope camera. When your premium device needs expert attention, Mobile Armour delivers precision repairs at our Warringal Shopping Centre location in Heidelberg. Whether it's a cracked OLED screen, degraded battery, or damaged camera lens, our certified technicians handle every repair with care. We understand the titanium frame's construction and use compatible parts to maintain the device's integrity. Walk-in service available — most repairs completed same-day.",
    repairTypes: [
      { name: "Screen Replacement (OLED)", time: "45-60 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "25-35 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "60-90 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "30-45 min", priceRange: "Call for quote" },
      { name: "Charging Port (USB-C)", time: "30-45 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "OLED screen cracked or display lines",
      "Battery health dropping below 80%",
      "Back glass cracked despite titanium frame",
      "Periscope camera lens damaged",
      "USB-C port connection issues",
      "Face ID malfunction after impact",
    ],
    specs:
      "6.7-inch OLED, 2796x1290, ProMotion 120Hz, A17 Pro chip, titanium frame, 48MP triple camera with 5x zoom, USB-C",
    warrantyNote:
      "Every iPhone 15 Pro Max repair is backed by our 6-month parts and labour warranty.",
    faqs: [
      {
        question: "Can you repair iPhone 15 Pro Max with titanium frame?",
        answer:
          "Absolutely. Our technicians are experienced with the iPhone 15 Pro Max's titanium design. The repair process accounts for the unique frame construction to ensure everything fits perfectly after repair.",
      },
      {
        question: "How long does iPhone 15 Pro Max screen repair take?",
        answer:
          "Screen replacement typically takes 45-60 minutes. The OLED panel requires careful calibration for touch and display accuracy. You're welcome to wait in Warringal Shopping Centre.",
      },
      {
        question: "Do you repair iPhone 15 Pro Max camera issues?",
        answer:
          "Yes — we repair camera lens damage, blurry camera syndrome, and camera module failures for the iPhone 15 Pro Max's triple camera system, including the periscope telephoto lens.",
      },
    ],
  },
  {
    model: "iPhone 15",
    slug: "iphone-15-repair",
    brand: "apple",
    metaTitle: "iPhone 15 Repair Heidelberg Melbourne | Fast Same-Day Service",
    metaDescription:
      "iPhone 15 screen repair & battery replacement Heidelberg. Dynamic Island display repair, USB-C port fix. 30-45 min service, 6-month warranty.",
    keywords: [
      "iphone 15 screen repair",
      "iphone 15 screen replacement",
      "iphone 15 battery replacement",
      "iphone 15 repair near me",
      "iphone 15 repair heidelberg",
      "iphone 15 repair melbourne",
      "fix iphone 15 screen",
      "iphone 15 screen repair cost melbourne",
    ],
    heroHeading: "iPhone 15 Repair",
    heroSubheading: "Screen, battery & more — repaired in 30-45 minutes",
    intro:
      "The iPhone 15 introduced USB-C to the standard iPhone lineup, along with the Dynamic Island and a 48MP main camera. It's a popular device — and when it needs repair, you want technicians who know the internals. Mobile Armour at Warringal Shopping Centre, Heidelberg, provides fast, professional iPhone 15 repairs including screen replacement, battery swaps, camera fixes, and charging port repair. Our premium replacement screens are tested for colour accuracy and touch sensitivity to match the original display quality. Most repairs are completed in 30-45 minutes while you wait.",
    repairTypes: [
      { name: "Screen Replacement (OLED)", time: "35-50 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "20-30 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "50-70 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "25-35 min", priceRange: "Call for quote" },
      { name: "Charging Port (USB-C)", time: "25-35 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Cracked or shattered screen",
      "Battery not lasting a full day",
      "Back glass damage from drops",
      "Camera lens crack or blur",
      "USB-C charging issues",
      "Speaker distortion or low volume",
    ],
    specs:
      "6.1-inch OLED, 2556x1179, A16 Bionic chip, 48MP dual camera, Dynamic Island, USB-C, Ceramic Shield",
    warrantyNote:
      "All iPhone 15 repairs come with our standard 6-month warranty.",
    faqs: [
      {
        question: "How much does iPhone 15 screen repair cost?",
        answer:
          "iPhone 15 screen replacement is competitively priced and typically cheaper than Apple's official service. Call 0405-326-205 for an instant quote specific to your damage type.",
      },
      {
        question: "Can you fix iPhone 15 USB-C charging port?",
        answer:
          "Yes. If your iPhone 15 isn't charging or has a loose USB-C connection, we can diagnose whether it's a port issue or cable issue and replace the charging port if needed. Takes about 25-35 minutes.",
      },
      {
        question: "Is same-day iPhone 15 repair available?",
        answer:
          "Yes — most iPhone 15 repairs are completed same-day, often within 30-45 minutes. Walk in to our Warringal Shopping Centre location or call ahead.",
      },
    ],
  },
  {
    model: "iPhone 14",
    slug: "iphone-14-repair",
    brand: "apple",
    metaTitle: "iPhone 14 Repair Heidelberg Melbourne | Screen & Battery Fix",
    metaDescription:
      "iPhone 14 screen repair and battery replacement in Heidelberg. All iPhone 14 models including Pro & Pro Max. Same-day service, 6-month warranty.",
    keywords: [
      "iphone 14 screen repair",
      "iphone 14 screen replacement",
      "iphone 14 battery replacement",
      "iphone 14 pro screen repair",
      "iphone 14 pro max screen repair",
      "iphone 14 repair heidelberg",
      "iphone 14 repair melbourne",
      "fix iphone 14 screen cost",
    ],
    heroHeading: "iPhone 14 Series Repair",
    heroSubheading:
      "iPhone 14, 14 Plus, 14 Pro & 14 Pro Max — all models repaired",
    intro:
      "The iPhone 14 series includes the iPhone 14, 14 Plus, 14 Pro, and 14 Pro Max. Whether you have the standard model with its improved camera or the Pro version with the Dynamic Island, Mobile Armour in Heidelberg repairs them all. Our technicians are experienced with the iPhone 14's updated internal design, which Apple engineered for easier repairability. We handle screen replacements, battery swaps, camera repairs, and more. Located at Warringal Shopping Centre, we provide same-day repair with a 6-month warranty on every job.",
    repairTypes: [
      { name: "Screen Replacement", time: "30-50 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "20-30 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "50-70 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "25-35 min", priceRange: "Call for quote" },
      { name: "Charging Port Repair", time: "25-35 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Cracked screen (OLED on Pro, LCD on standard)",
      "Battery health degraded below 80%",
      "Rear glass panel cracked",
      "Camera lens scratches or cracks",
      "Lightning port not charging",
      "Face ID issues after drop damage",
    ],
    specs:
      "6.1-inch/6.7-inch display, A15/A16 chip, 12MP/48MP camera, Lightning connector, Ceramic Shield, Crash Detection",
    warrantyNote:
      "All iPhone 14 series repairs include our 6-month warranty on parts and workmanship.",
    faqs: [
      {
        question: "Do you repair all iPhone 14 models?",
        answer:
          "Yes — we repair iPhone 14, iPhone 14 Plus, iPhone 14 Pro, and iPhone 14 Pro Max. Each model has different screen technology (OLED vs standard), and we stock parts for all variants.",
      },
      {
        question: "How much does iPhone 14 Pro Max screen repair cost?",
        answer:
          "The Pro Max OLED screen costs more than the standard iPhone 14 display. Call 0405-326-205 for pricing specific to your model and damage type. We offer competitive rates below Apple's official pricing.",
      },
      {
        question: "Is iPhone 14 easier to repair than older models?",
        answer:
          "Yes — Apple redesigned the iPhone 14's internals for improved repairability, with both the front and back glass being independently replaceable. This can result in faster repair times and lower costs.",
      },
    ],
  },
  {
    model: "iPhone 13",
    slug: "iphone-13-repair",
    brand: "apple",
    metaTitle: "iPhone 13 Repair Heidelberg Melbourne | Affordable Same-Day Fix",
    metaDescription:
      "iPhone 13 screen repair & battery replacement Heidelberg. iPhone 13, Mini, Pro & Pro Max. Fast 30-min service, 6-month warranty. Warringal Shopping Centre.",
    keywords: [
      "iphone 13 screen repair",
      "iphone 13 screen replacement",
      "iphone 13 battery replacement",
      "iphone 13 pro screen repair",
      "iphone 13 mini screen repair",
      "iphone 13 repair near me",
      "iphone 13 repair heidelberg",
      "iphone 13 screen repair cost melbourne",
    ],
    heroHeading: "iPhone 13 Series Repair",
    heroSubheading:
      "iPhone 13, Mini, Pro & Pro Max — affordable repair for all variants",
    intro:
      "The iPhone 13 series remains one of the most popular iPhones in Australia, and we see plenty of them at our Warringal Shopping Centre repair counter. Whether your iPhone 13 Mini's screen has cracked, your iPhone 13 Pro's battery is degraded, or your iPhone 13 Pro Max's camera needs attention, Mobile Armour delivers fast, affordable repairs. We stock quality replacement parts for every iPhone 13 variant and can complete most repairs in just 30 minutes. Every repair comes backed by our 6-month warranty.",
    repairTypes: [
      { name: "Screen Replacement (OLED)", time: "30-45 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "20-25 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "50-70 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "25-30 min", priceRange: "Call for quote" },
      { name: "Charging Port Repair", time: "25-30 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Cracked or unresponsive OLED screen",
      "Battery draining quickly or swelling",
      "Back glass shattered",
      "Camera lens crack causing blurry photos",
      "Lightning port not charging",
      "Ear speaker quiet or muffled",
    ],
    specs:
      "6.1-inch/5.4-inch/6.7-inch OLED, A15 Bionic, 12MP dual/triple camera, Lightning, Ceramic Shield",
    warrantyNote:
      "All iPhone 13 series repairs are covered by our 6-month warranty.",
    faqs: [
      {
        question: "Is iPhone 13 screen repair affordable?",
        answer:
          "iPhone 13 screen repair is one of our most popular services and is very competitively priced. Parts for the iPhone 13 series are well-established, keeping costs reasonable. Call 0405-326-205 for your exact quote.",
      },
      {
        question: "How long does iPhone 13 battery replacement take?",
        answer:
          "iPhone 13 battery replacement is one of the quickest repairs we do — typically 20-25 minutes. Your new battery restores the original battery life performance.",
      },
      {
        question: "Do you repair iPhone 13 Mini?",
        answer:
          "Yes! We repair all iPhone 13 variants: iPhone 13, 13 Mini, 13 Pro, and 13 Pro Max. Each model uses similar internal components, so we can service them all efficiently.",
      },
    ],
  },
  // ─── Samsung Models ───────────────────────────────────────────────
  {
    model: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra-repair",
    brand: "samsung",
    metaTitle: "Samsung Galaxy S24 Ultra Repair Heidelberg | Screen & Battery",
    metaDescription:
      "Samsung Galaxy S24 Ultra screen repair & battery replacement Heidelberg Melbourne. Dynamic AMOLED 2X display, S Pen support. Same-day service, 6-month warranty.",
    keywords: [
      "samsung s24 ultra screen repair",
      "samsung galaxy s24 ultra screen replacement",
      "samsung s24 ultra battery replacement",
      "samsung s24 ultra repair heidelberg",
      "samsung s24 ultra repair melbourne",
      "samsung s24 ultra screen repair cost",
      "fix samsung s24 ultra screen",
      "galaxy s24 ultra cracked screen",
    ],
    heroHeading: "Samsung Galaxy S24 Ultra Repair",
    heroSubheading:
      "Premium Samsung flagship repair — AI-powered device deserves expert care",
    intro:
      "The Samsung Galaxy S24 Ultra is Samsung's most advanced smartphone, featuring a stunning 6.8-inch Dynamic AMOLED 2X display, titanium frame, integrated S Pen, and Galaxy AI capabilities. When your S24 Ultra needs repair, you want technicians who understand its premium construction. Mobile Armour at Warringal Shopping Centre, Heidelberg, provides expert Samsung Galaxy S24 Ultra repairs including screen replacement, battery swaps, and camera fixes. We use high-quality AMOLED replacement screens and test every repair for display quality, S Pen digitiser response, and overall functionality before returning your device.",
    repairTypes: [
      { name: "Screen Replacement (AMOLED)", time: "50-70 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "30-40 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "60-80 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "30-45 min", priceRange: "Call for quote" },
      { name: "Charging Port (USB-C)", time: "30-40 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Cracked AMOLED display or green lines",
      "Battery degradation or overheating",
      "Back glass cracked",
      "Camera module or lens damage",
      "S Pen not responding on display",
      "USB-C port charging issues",
    ],
    specs:
      "6.8-inch Dynamic AMOLED 2X, 3120x1440, 120Hz, Snapdragon 8 Gen 3, titanium frame, 200MP camera, S Pen, 5000mAh battery",
    warrantyNote:
      "All Samsung S24 Ultra repairs include our 6-month parts and workmanship warranty.",
    faqs: [
      {
        question: "How much does Samsung S24 Ultra screen repair cost?",
        answer:
          "The S24 Ultra's 6.8-inch Dynamic AMOLED 2X display is a premium component. Our pricing is competitive with Samsung's official service and typically faster. Call 0405-326-205 for an instant quote.",
      },
      {
        question: "Will the S Pen work after screen replacement?",
        answer:
          "Yes. We ensure the S Pen digitiser layer is properly connected and calibrated during screen replacement. We test S Pen functionality across the entire display before returning your device.",
      },
      {
        question: "Do you use genuine Samsung screens?",
        answer:
          "We use high-quality AMOLED replacement screens that match Samsung's display specifications for brightness, colour accuracy, and touch sensitivity. All screens are tested and backed by our warranty.",
      },
    ],
  },
  {
    model: "Samsung Galaxy S24",
    slug: "samsung-s24-repair",
    brand: "samsung",
    metaTitle: "Samsung Galaxy S24 Repair Heidelberg Melbourne | Same-Day Fix",
    metaDescription:
      "Samsung Galaxy S24 screen repair & battery replacement in Heidelberg. AMOLED display, fast same-day service, 6-month warranty at Warringal Shopping Centre.",
    keywords: [
      "samsung s24 screen repair",
      "samsung galaxy s24 screen replacement",
      "samsung s24 battery replacement",
      "samsung s24 repair heidelberg",
      "samsung s24 repair melbourne",
      "samsung s24 screen repair cost",
      "fix samsung galaxy s24",
    ],
    heroHeading: "Samsung Galaxy S24 Repair",
    heroSubheading: "Galaxy AI phone repair — screen, battery, camera & port",
    intro:
      "The Samsung Galaxy S24 brought Galaxy AI to millions of users, with its compact 6.2-inch FHD+ Dynamic AMOLED 2X display and Exynos 2400 processor. If your Galaxy S24 has suffered screen damage, battery degradation, or any other issue, Mobile Armour in Heidelberg provides fast, reliable repairs. We handle screen replacements using quality AMOLED panels, battery swaps, USB-C port fixes, and camera repairs. Our technicians understand Samsung's design and ensure every repair restores your device to peak performance. Most repairs same-day at Warringal Shopping Centre.",
    repairTypes: [
      { name: "Screen Replacement (AMOLED)", time: "40-55 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "25-35 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "50-70 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "25-35 min", priceRange: "Call for quote" },
      { name: "Charging Port (USB-C)", time: "25-35 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "AMOLED screen cracked or lines on display",
      "Battery health decreasing",
      "Rear panel cracked",
      "Camera producing blurry photos",
      "USB-C port not charging reliably",
      "Fingerprint sensor issues",
    ],
    specs:
      "6.2-inch Dynamic AMOLED 2X, 2340x1080, 120Hz, Exynos 2400/Snapdragon 8 Gen 3, 50MP triple camera, 4000mAh, USB-C",
    warrantyNote:
      "All Samsung S24 repairs backed by our 6-month warranty.",
    faqs: [
      {
        question: "How long does Samsung S24 screen replacement take?",
        answer:
          "Most Samsung Galaxy S24 screen replacements are completed in 40-55 minutes. Walk in to our Warringal Shopping Centre location or call 0405-326-205 to schedule.",
      },
      {
        question: "Is Samsung S24 battery replacement worth it?",
        answer:
          "If your S24's battery drains quickly or health has dropped below 85%, a new battery restores the original day-long battery life for a fraction of the cost of a new phone. It's almost always worth it.",
      },
      {
        question: "Can you fix Samsung S24 fingerprint sensor?",
        answer:
          "The S24's fingerprint sensor is built into the display. In many cases, a screen replacement resolves fingerprint issues. We diagnose the root cause before recommending a repair.",
      },
    ],
  },
  {
    model: "Samsung Galaxy S23",
    slug: "samsung-s23-repair",
    brand: "samsung",
    metaTitle: "Samsung Galaxy S23 Repair Heidelberg | Affordable Screen Fix",
    metaDescription:
      "Samsung Galaxy S23 screen repair & battery replacement Heidelberg Melbourne. All S23 models (S23, S23+, S23 Ultra). Same-day service, 6-month warranty.",
    keywords: [
      "samsung s23 screen repair",
      "samsung galaxy s23 screen replacement",
      "samsung s23 ultra screen repair",
      "samsung s23 battery replacement",
      "samsung s23 repair heidelberg",
      "samsung s23 repair melbourne",
      "samsung s23 ultra repair cost",
      "fix samsung s23 cracked screen",
    ],
    heroHeading: "Samsung Galaxy S23 Series Repair",
    heroSubheading: "S23, S23+, and S23 Ultra — all models serviced",
    intro:
      "The Samsung Galaxy S23 series remains hugely popular in Australia. Whether you own the compact S23, the S23+, or the S23 Ultra with its built-in S Pen, Mobile Armour at Warringal Shopping Centre repairs them all. Our technicians handle AMOLED screen replacements, battery swaps, camera repairs, and charging port fixes for every Galaxy S23 variant. Parts for the S23 series are now well-stocked, meaning competitive pricing and fast turnaround times. Walk in or call ahead for same-day repair backed by our 6-month warranty.",
    repairTypes: [
      { name: "Screen Replacement (AMOLED)", time: "40-60 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "25-35 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "50-70 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "25-40 min", priceRange: "Call for quote" },
      { name: "Charging Port (USB-C)", time: "25-35 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Screen cracked or green line on AMOLED",
      "Battery not lasting a full day",
      "Back glass cracked from drop",
      "Camera focusing issues or cracked lens",
      "USB-C port loose or not charging",
      "S Pen issues (S23 Ultra)",
    ],
    specs:
      "6.1/6.6/6.8-inch Dynamic AMOLED 2X, 120Hz, Snapdragon 8 Gen 2, 50/200MP camera, USB-C",
    warrantyNote:
      "All Samsung S23 series repairs are covered by our 6-month warranty on parts and labour.",
    faqs: [
      {
        question: "Do you repair all Samsung S23 models?",
        answer:
          "Yes — we service the Galaxy S23, S23+, and S23 Ultra. Each model has different screen sizes and configurations, and we stock quality parts for all three variants.",
      },
      {
        question: "How much does Samsung S23 Ultra screen repair cost?",
        answer:
          "S23 Ultra screen replacement costs more than the standard S23 due to its larger 6.8-inch AMOLED panel and S Pen digitiser. Call 0405-326-205 for exact pricing for your specific model.",
      },
      {
        question: "Can you fix the green line issue on Samsung S23?",
        answer:
          "Yes. The green line issue is a common AMOLED display fault. Screen replacement resolves this completely. We see this fairly often and can fix it same-day.",
      },
    ],
  },
  {
    model: "Samsung Galaxy A54",
    slug: "samsung-a54-repair",
    brand: "samsung",
    metaTitle: "Samsung Galaxy A54 Repair Heidelberg | Budget-Friendly Fix",
    metaDescription:
      "Samsung Galaxy A54 screen repair & battery replacement Heidelberg Melbourne. Affordable repair for Samsung's popular mid-range phone. Same-day, 6-month warranty.",
    keywords: [
      "samsung a54 screen repair",
      "samsung galaxy a54 screen replacement",
      "samsung a54 battery replacement",
      "samsung a54 repair near me",
      "samsung a54 repair heidelberg",
      "samsung a54 repair melbourne",
      "samsung a54 screen repair cost",
      "fix samsung a54 cracked screen",
    ],
    heroHeading: "Samsung Galaxy A54 Repair",
    heroSubheading:
      "Affordable repair for Australia's best-selling mid-range Samsung",
    intro:
      "The Samsung Galaxy A54 5G is one of the most popular mid-range phones in Australia, loved for its water resistance, Super AMOLED display, and triple camera system. If your Galaxy A54 has a cracked screen, worn-out battery, or charging problems, Mobile Armour offers affordable, fast repairs at our Heidelberg location. The A54's mid-range pricing means repair costs are very reasonable — often far cheaper than flagship repairs. We use quality AMOLED replacement screens and tested batteries to get your A54 back to perfect condition. Most repairs completed same-day.",
    repairTypes: [
      { name: "Screen Replacement (AMOLED)", time: "35-50 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "25-30 min", priceRange: "Call for quote" },
      { name: "Back Cover Replacement", time: "30-45 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "20-30 min", priceRange: "Call for quote" },
      { name: "Charging Port (USB-C)", time: "20-30 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Screen cracked or touch not responding",
      "Battery draining fast after 1-2 years",
      "Back cover scratched or cracked",
      "Camera module or lens damage",
      "USB-C port not charging",
      "Speaker distortion or low volume",
    ],
    specs:
      "6.4-inch Super AMOLED, 2340x1080, 120Hz, Exynos 1380, 50MP triple camera, 5000mAh, USB-C, IP67",
    warrantyNote:
      "All Samsung A54 repairs include our 6-month warranty — great value for a mid-range device.",
    faqs: [
      {
        question: "How much does Samsung A54 screen repair cost?",
        answer:
          "Samsung A54 screen replacement is very affordable compared to flagship models. The mid-range AMOLED screen is competitively priced. Call 0405-326-205 for your exact quote.",
      },
      {
        question: "Is it worth repairing a Samsung A54?",
        answer:
          "Absolutely. The Galaxy A54 is a capable device, and repair costs are a fraction of buying a new phone. Screen and battery replacements give your A54 another 2-3 years of solid use.",
      },
      {
        question: "How long does Samsung A54 battery replacement take?",
        answer:
          "Samsung A54 battery replacement takes about 25-30 minutes. With a fresh 5000mAh battery, you'll be back to all-day battery life.",
      },
    ],
  },
  // ─── Google Pixel Models ──────────────────────────────────────────
  {
    model: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro-repair",
    brand: "google",
    metaTitle: "Google Pixel 8 Pro Repair Heidelberg Melbourne | Screen Fix",
    metaDescription:
      "Google Pixel 8 Pro screen repair & battery replacement Heidelberg. LTPO OLED display, Tensor G3 chip device. Same-day service, 6-month warranty.",
    keywords: [
      "google pixel 8 pro screen repair",
      "pixel 8 pro screen replacement",
      "google pixel 8 pro battery replacement",
      "pixel 8 pro repair heidelberg",
      "pixel 8 pro repair melbourne",
      "google pixel 8 pro repair cost",
      "fix pixel 8 pro screen",
    ],
    heroHeading: "Google Pixel 8 Pro Repair",
    heroSubheading: "Expert repair for Google's AI-powered flagship phone",
    intro:
      "The Google Pixel 8 Pro combines Google's best AI features with a beautiful 6.7-inch LTPO OLED display, Tensor G3 chip, and a pro-level 50MP camera system. If your Pixel 8 Pro needs repair, Mobile Armour in Heidelberg has the expertise. We repair cracked OLED screens, replace worn batteries, fix camera issues, and handle USB-C port problems. Pixel devices require specific knowledge for safe disassembly, and our technicians have the experience to handle the Pixel 8 Pro's curved-edge design and sensitive display connectors. Most repairs completed same-day.",
    repairTypes: [
      { name: "Screen Replacement (OLED)", time: "45-60 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "30-40 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "60-80 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "30-40 min", priceRange: "Call for quote" },
      { name: "Charging Port (USB-C)", time: "30-40 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Cracked LTPO OLED display",
      "Battery degradation or overheating",
      "Back glass panel cracked",
      "Camera bar lens scratched or cracked",
      "USB-C port charging issues",
      "Fingerprint sensor not responding",
    ],
    specs:
      "6.7-inch LTPO OLED, 2992x1344, 120Hz, Tensor G3, 50MP triple camera, 5050mAh, USB-C, IP68",
    warrantyNote:
      "All Google Pixel 8 Pro repairs are backed by our 6-month warranty on parts and workmanship.",
    faqs: [
      {
        question: "Can you repair Google Pixel 8 Pro in Heidelberg?",
        answer:
          "Yes! Mobile Armour at Warringal Shopping Centre, Heidelberg, services Google Pixel devices including the Pixel 8 Pro. We stock quality replacement parts and can complete most repairs same-day.",
      },
      {
        question: "How much does Pixel 8 Pro screen repair cost?",
        answer:
          "Pixel 8 Pro screen replacement pricing varies based on damage. The LTPO OLED panel requires precise handling. Call 0405-326-205 for an instant, no-obligation quote.",
      },
      {
        question: "Will my Pixel 8 Pro camera work after screen repair?",
        answer:
          "Yes — our technicians ensure all camera functions, fingerprint sensor, and sensors are fully operational after any repair. We run comprehensive tests before returning your device.",
      },
    ],
  },
  {
    model: "Google Pixel 8",
    slug: "google-pixel-8-repair",
    brand: "google",
    metaTitle: "Google Pixel 8 Repair Heidelberg Melbourne | Fast Service",
    metaDescription:
      "Google Pixel 8 screen repair & battery replacement Heidelberg. OLED display fix, camera repair. Same-day service, 6-month warranty at Warringal Shopping Centre.",
    keywords: [
      "google pixel 8 screen repair",
      "pixel 8 screen replacement",
      "google pixel 8 battery replacement",
      "pixel 8 repair near me",
      "pixel 8 repair heidelberg",
      "pixel 8 repair melbourne",
      "google pixel repair melbourne",
    ],
    heroHeading: "Google Pixel 8 Repair",
    heroSubheading: "Screen, battery & camera repair for the Pixel 8",
    intro:
      "The Google Pixel 8 features a compact 6.2-inch OLED display, Google's Tensor G3 chip, and the incredible computational photography that Pixels are known for. If your Pixel 8 screen is cracked, battery is degraded, or camera needs attention, Mobile Armour at Warringal Shopping Centre provides fast, expert repairs. Google Pixels have a dedicated following in Melbourne, and we've built up the expertise and parts inventory to service them efficiently. Most Pixel 8 repairs are completed same-day with our standard 6-month warranty.",
    repairTypes: [
      { name: "Screen Replacement (OLED)", time: "40-55 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "25-35 min", priceRange: "Call for quote" },
      { name: "Back Glass Replacement", time: "50-70 min", priceRange: "Call for quote" },
      { name: "Camera Lens Repair", time: "25-35 min", priceRange: "Call for quote" },
      { name: "Charging Port (USB-C)", time: "25-35 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Cracked or unresponsive OLED screen",
      "Battery not lasting a full day",
      "Back glass cracked from drops",
      "Camera lens scratched or cracked",
      "USB-C charging port issues",
      "Power button or volume button stuck",
    ],
    specs:
      "6.2-inch OLED, 2400x1080, 120Hz, Tensor G3, 50MP dual camera, 4575mAh, USB-C, IP68",
    warrantyNote:
      "All Google Pixel 8 repairs come with our 6-month warranty.",
    faqs: [
      {
        question: "Do you repair Google Pixel phones in Heidelberg?",
        answer:
          "Yes — Mobile Armour repairs Google Pixel devices including Pixel 8, 8 Pro, 7, 7 Pro, and older models. We're located at Warringal Shopping Centre, Heidelberg.",
      },
      {
        question: "How long does Pixel 8 screen repair take?",
        answer:
          "Most Google Pixel 8 screen replacements are completed in 40-55 minutes. Walk in or call 0405-326-205 ahead of your visit.",
      },
      {
        question: "Can you fix Pixel 8 back glass?",
        answer:
          "Yes. The Pixel 8's glass back panel can be replaced if cracked. This repair takes approximately 50-70 minutes and comes with our 6-month warranty.",
      },
    ],
  },
  // ─── iPad Models ──────────────────────────────────────────────────
  {
    model: "iPad Pro",
    slug: "ipad-pro-repair",
    brand: "ipad",
    metaTitle: "iPad Pro Repair Heidelberg Melbourne | Screen & Battery Fix",
    metaDescription:
      "iPad Pro screen repair & battery replacement Heidelberg. M1/M2/M4 chip iPad Pro, Liquid Retina XDR display. Same-day service, 6-month warranty.",
    keywords: [
      "ipad pro screen repair",
      "ipad pro screen replacement",
      "ipad pro battery replacement",
      "ipad pro repair heidelberg",
      "ipad pro repair melbourne",
      "ipad pro screen repair cost",
      "fix ipad pro screen",
      "ipad pro cracked screen",
    ],
    heroHeading: "iPad Pro Repair",
    heroSubheading:
      "Expert repair for all iPad Pro models — M1, M2 & M4 chip devices",
    intro:
      "The iPad Pro is Apple's most powerful tablet, available in 11-inch and 13-inch models with M-series chips and stunning Liquid Retina XDR displays. When your iPad Pro's screen cracks or battery degrades, you need technicians who understand these premium devices. Mobile Armour at Warringal Shopping Centre, Heidelberg, provides expert iPad Pro repairs including screen replacement, battery swaps, and charging port fixes. iPad Pro screens are larger and more complex than iPhone screens, but our experienced technicians handle them regularly. Same-day service available for most repairs.",
    repairTypes: [
      { name: "Screen Replacement", time: "60-90 min", priceRange: "Call for quote" },
      { name: "Battery Replacement", time: "45-60 min", priceRange: "Call for quote" },
      { name: "Charging Port (USB-C)", time: "40-55 min", priceRange: "Call for quote" },
      { name: "Camera Repair", time: "35-50 min", priceRange: "Call for quote" },
      { name: "Home Button / Face ID", time: "40-55 min", priceRange: "Call for quote" },
    ],
    commonIssues: [
      "Cracked screen or shattered glass",
      "Battery not holding charge",
      "USB-C port not charging or connecting",
      "Camera blurry or not focusing",
      "Apple Pencil not responding on display",
      "Touch screen dead zones or ghost touch",
    ],
    specs:
      "11/13-inch Liquid Retina XDR, M1/M2/M4 chip, ProMotion 120Hz, USB-C/Thunderbolt, Face ID",
    warrantyNote:
      "All iPad Pro repairs come with our 6-month warranty on parts and workmanship.",
    faqs: [
      {
        question: "How much does iPad Pro screen repair cost?",
        answer:
          "iPad Pro screen replacement costs vary by model size (11-inch vs 13-inch) and generation. The Liquid Retina XDR displays are premium components. Call 0405-326-205 for pricing specific to your iPad Pro.",
      },
      {
        question: "Can you repair iPad Pro with M4 chip?",
        answer:
          "Yes — we service all iPad Pro generations, including the latest M4 models. Our technicians stay current with Apple's newest devices and repair procedures.",
      },
      {
        question: "Will Apple Pencil work after iPad Pro screen repair?",
        answer:
          "Yes. We ensure the display's digitiser layer is properly connected for full Apple Pencil functionality. We test Pencil response across the entire screen before returning your device.",
      },
    ],
  },
];

export function getModelBySlug(slug: string): ModelRepairPage | undefined {
  return modelRepairPages.find((page) => page.slug === slug);
}

export function getAllModelSlugs(): string[] {
  return modelRepairPages.map((page) => page.slug);
}

export function getModelsByBrand(brand: ModelRepairPage["brand"]): ModelRepairPage[] {
  return modelRepairPages.filter((page) => page.brand === brand);
}
