export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServicePageData {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroHeading: string;
  heroSubheading: string;
  intro: string;
  processSteps: string[];
  models: string[];
  commonIssues: string[];
  warrantyNote: string;
  faqs: ServiceFAQ[];
}

export const servicePages: ServicePageData[] = [
  {
    title: "iPhone Screen Repair",
    slug: "iphone-screen-repair",
    metaTitle: "iPhone Screen Repair Heidelberg Melbourne | Same Day Service",
    metaDescription: "Expert iPhone screen replacement in Heidelberg. iPhone 11, 12, 13, 14, 15, 16, 17 screen repair from $XX. Same-day service, 6-month warranty. Warringal Shopping Centre.",
    keywords: ["iphone screen repair", "iphone screen replacement", "iphone screen repair heidelberg", "iphone 14 screen replacement", "iphone 15 screen replacement", "iphone 17 pro max screen repair cost", "cracked iphone screen repair melbourne", "iphone repair near me", "fix iphone screen", "screen repair iphone 14 pro", "15 pro max screen replacement", "16 pro screen replacement"],
    heroHeading: "iPhone Screen Repair & Replacement",
    heroSubheading: "Same-day screen repair for all iPhone models — done in 30-45 minutes",
    intro: "Cracked your iPhone screen? Mobile Armour at Warringal Shopping Centre, Heidelberg, offers fast, professional iPhone screen replacement for every model from iPhone 11 through to the latest iPhone 17 Pro Max. Our certified technicians use premium-grade LCD and OLED replacement screens that restore your display to perfect clarity. Every screen repair comes with our 6-month warranty, and most are completed in just 30-45 minutes while you wait.",
    processSteps: [
      "Free diagnostic assessment — we examine your iPhone and provide an upfront quote with no hidden fees",
      "Premium screen replacement — we use high-quality LCD/OLED screens matched to your specific iPhone model",
      "Full functionality testing — we test touch response, display colour accuracy, Face ID, and all sensors",
      "Quality assurance check — final inspection ensures everything meets our standards before handover"
    ],
    models: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17", "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 13", "iPhone 13 Mini", "iPhone 12", "iPhone 11"],
    commonIssues: ["Cracked or shattered glass", "Unresponsive touch screen", "Black screen with phone still running", "Lines or discolouration on display", "Ghost touch or phantom inputs", "Screen flickering or dimming"],
    warrantyNote: "All iPhone screen repairs come with a 6-month warranty covering defects in parts and workmanship. If your replacement screen develops any issues within the warranty period, we'll fix it at no extra charge.",
    faqs: [
      { question: "How much does iPhone screen repair cost?", answer: "iPhone screen repair pricing depends on the model. Newer models like iPhone 15 and 16 Pro Max cost more due to OLED technology, while older models like iPhone 11 and 12 are more affordable. Call 0405-326-205 for an instant quote for your specific model." },
      { question: "How long does iPhone screen replacement take?", answer: "Most iPhone screen replacements are completed in 30-45 minutes. You're welcome to wait at Warringal Shopping Centre or pop out for a quick errand — we'll text you when your phone is ready." },
      { question: "Will my iPhone be waterproof after screen repair?", answer: "We apply adhesive sealing during screen replacement, but no third-party repair can guarantee the same level of water resistance as the original factory seal. We recommend using a waterproof case after any screen repair." },
      { question: "Do you use genuine Apple screens?", answer: "We use premium-grade aftermarket screens that match Apple's quality standards for display clarity, colour accuracy, and touch sensitivity. These screens are thoroughly tested and come with our 6-month warranty." }
    ]
  },
  {
    title: "iPhone Battery Replacement",
    slug: "iphone-battery-replacement",
    metaTitle: "iPhone Battery Replacement Heidelberg Melbourne | All Models",
    metaDescription: "iPhone battery replacement in Heidelberg from competitive prices. All models iPhone 6 to iPhone 17. 20-30 min service, 6-month warranty. Warringal Shopping Centre.",
    keywords: ["iphone battery replacement", "iphone battery replacement cost", "iphone battery replacement cost australia", "iphone battery near me", "iphone battery repair", "iphone battery repair near me", "iphone battery replacement preston", "iphone 13 battery replacement", "iphone se battery replacement", "new battery for iphone", "replace iphone battery", "change an iphone battery", "new battery iphone 13 pro max", "new iphone battery", "iphone 11 battery replacement", "iphone 12 battery replacement", "iphone 15 pro battery replacement", "authorised iphone battery replacement", "battery replacement iphone"],
    heroHeading: "iPhone Battery Replacement",
    heroSubheading: "Restore your iPhone's battery life in just 20-30 minutes",
    intro: "Is your iPhone battery draining faster than it should? Mobile Armour offers professional iPhone battery replacement for all models from iPhone 6 through to iPhone 17. Our certified technicians use high-capacity replacement batteries that restore your phone's original battery performance. The entire process takes just 20-30 minutes, and every battery replacement comes with a 6-month warranty. Stop living tethered to a charger — get your iPhone battery replaced today.",
    processSteps: [
      "Battery health diagnostic — we check your current battery health percentage and confirm replacement is needed",
      "Safe battery removal — we carefully remove the old battery following proper procedures to protect your device",
      "Premium battery installation — we install a high-capacity replacement battery matched to your iPhone model",
      "Calibration and testing — we verify battery charging, percentage reporting, and overall device performance"
    ],
    models: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17", "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 13 Pro Max", "iPhone 13", "iPhone 12 Pro Max", "iPhone 12", "iPhone 11 Pro Max", "iPhone 11", "iPhone SE", "iPhone XR", "iPhone X", "iPhone 8", "iPhone 7", "iPhone 6S", "iPhone 6"],
    commonIssues: ["Battery drains quickly (less than a day)", "Phone shuts down at 20-30% battery", "Battery health below 80%", "Phone overheating during normal use", "Slow charging or not charging fully", "Battery swelling (urgent — come in immediately)"],
    warrantyNote: "All iPhone battery replacements include a 6-month warranty. If your new battery shows any defects in capacity or performance within the warranty period, we'll replace it free of charge.",
    faqs: [
      { question: "How much does iPhone battery replacement cost in Australia?", answer: "iPhone battery replacement costs vary by model. We offer competitive pricing that's typically less than Apple's official service. Call 0405-326-205 for pricing specific to your iPhone model." },
      { question: "How do I know if my iPhone needs a new battery?", answer: "Check Settings > Battery > Battery Health. If your maximum capacity is below 80%, or your phone shuts down unexpectedly, it's time for a replacement. We also offer free battery diagnostics in-store." },
      { question: "Will I lose my data during battery replacement?", answer: "No! Battery replacement does not affect your data. All your photos, apps, and settings remain exactly as they are. However, we always recommend backing up before any repair as a precaution." },
      { question: "How long does an iPhone battery last after replacement?", answer: "A new replacement battery should last 2-3 years of normal use, similar to when your iPhone was new. Battery lifespan depends on usage patterns, charging habits, and temperature exposure." }
    ]
  },
  {
    title: "iPad Screen Repair",
    slug: "ipad-screen-repair",
    metaTitle: "iPad Screen & Battery Repair Heidelberg | iPad Pro, Air, Mini",
    metaDescription: "Expert iPad screen replacement and battery repair in Heidelberg. iPad Pro, Air, Mini, standard iPad. Same-day service, 6-month warranty at Warringal Shopping Centre.",
    keywords: ["ipad screen replacement", "ipad repair near me", "ipad repairs", "ipad repairs near me", "ipad battery replacement near me", "ipad battery repair", "ipad pro battery replacement", "ipad pro screen fix", "ipad air screen repair melbourne", "ipad mini repair melbourne", "ipad repair preston", "replace ipad screen"],
    heroHeading: "iPad Screen & Battery Repair",
    heroSubheading: "Expert iPad repair for all models — screen, battery, and more",
    intro: "Cracked iPad screen or failing battery? Mobile Armour provides expert iPad repair for all models including iPad Pro, iPad Air, iPad Mini, and standard iPads. Our certified technicians carefully replace iPad screens and batteries using premium-grade components, preserving Apple Pencil support and touch responsiveness. iPad repairs are a specialty service that many repair shops avoid due to their complexity — but our technicians handle them daily with confidence.",
    processSteps: [
      "Comprehensive iPad diagnostic — we assess the screen damage and test all functions including touch, Apple Pencil, and Face ID",
      "Precision screen removal — iPads require careful heat-and-pry techniques to avoid damaging internal components",
      "Premium screen installation — we install a high-quality replacement screen matched to your iPad model",
      "Full function test — we verify touch accuracy, display quality, Apple Pencil compatibility, and all cameras"
    ],
    models: ["iPad Pro M4 13-inch", "iPad Pro M4 11-inch", "iPad Air M2 13-inch", "iPad Air M2 11-inch", "iPad 10th Gen", "iPad 9th Gen", "iPad Mini 6", "iPad Mini 5", "iPad Pro 12.9-inch (older)", "iPad Pro 11-inch (older)", "iPad Air 4th Gen"],
    commonIssues: ["Cracked or shattered screen glass", "Unresponsive touch or dead spots", "Battery draining rapidly", "iPad not charging", "Apple Pencil not working after drop", "Backlight bleeding or display issues"],
    warrantyNote: "All iPad screen and battery repairs come with a 6-month warranty. Our iPad repairs are performed by technicians experienced with the precision required for tablet devices.",
    faqs: [
      { question: "How much does iPad screen replacement cost?", answer: "iPad screen replacement varies significantly by model. iPad Mini and standard iPads are more affordable, while iPad Pro models cost more. Call 0405-326-205 for a quote for your specific iPad model." },
      { question: "How long does iPad screen repair take?", answer: "iPad screen repairs typically take 1-2 hours due to the precision required. Battery replacements are similar. We recommend dropping off your iPad and collecting it later — we'll contact you when it's ready." },
      { question: "Can you fix an iPad Pro with a cracked screen?", answer: "Yes! We repair all iPad Pro models including the latest M4 versions. iPad Pro screen replacement requires specialised tools and expertise — our technicians are experienced with all iPad Pro generations." },
      { question: "Is iPad battery replacement worth it?", answer: "If your iPad is less than 4-5 years old, battery replacement is very worthwhile. It costs a fraction of a new iPad and can extend your device's life by 2-3 years. We'll check your battery health and advise honestly." }
    ]
  },
  {
    title: "Samsung Phone Repair",
    slug: "samsung-repair",
    metaTitle: "Samsung Phone Repair Heidelberg Melbourne | Galaxy Screen & Battery",
    metaDescription: "Samsung Galaxy screen repair and battery replacement in Heidelberg. Galaxy S25, S24, Z Fold, Z Flip, A55. Same-day service, 6-month warranty.",
    keywords: ["samsung phone repair melbourne", "samsung screen repair heidelberg", "samsung repair near me", "samsung galaxy repair", "samsung battery replacement", "galaxy watch repair near me"],
    heroHeading: "Samsung Galaxy Phone Repair",
    heroSubheading: "Expert Samsung screen, battery, and component repairs for all Galaxy models",
    intro: "Samsung Galaxy phone broken? Mobile Armour offers professional Samsung repair services for the full Galaxy range — from the latest Galaxy S25 Ultra to the innovative Z Fold and Z Flip series, plus popular A-series phones. Our certified technicians understand Samsung's unique AMOLED displays and component architecture, ensuring precise repairs that maintain your device's performance and water resistance features.",
    processSteps: [
      "Samsung diagnostic — we identify the exact issue and check for any secondary damage",
      "AMOLED screen replacement — we use quality replacement screens that match Samsung's vibrant display standards",
      "Component repair — for battery, charging port, or other issues, we use Samsung-compatible premium parts",
      "Quality verification — we test the display, touch, S Pen (if applicable), fingerprint sensor, and all features"
    ],
    models: ["Samsung Galaxy S25 Ultra", "Samsung Galaxy S25+", "Samsung Galaxy S25", "Samsung Galaxy S24 Ultra", "Samsung Galaxy S24", "Samsung Galaxy S23", "Samsung Galaxy Z Fold7", "Samsung Galaxy Z Fold6", "Samsung Galaxy Z Flip7", "Samsung Galaxy Z Flip6", "Samsung Galaxy A55", "Samsung Galaxy A35", "Samsung Galaxy A15"],
    commonIssues: ["Cracked AMOLED screen", "Battery degradation", "Charging port not working", "Screen burn-in", "Water damage", "Back glass cracked", "Fingerprint sensor issues"],
    warrantyNote: "All Samsung repairs include a 6-month warranty covering parts and workmanship. Samsung AMOLED screens are premium components, and our warranty ensures you're protected.",
    faqs: [
      { question: "Can you repair Samsung Galaxy Z Fold screens?", answer: "Yes! We repair both the inner folding screen and outer cover screen on Samsung Galaxy Z Fold models. Foldable phone repair requires specialised expertise, and our technicians are trained for these advanced devices." },
      { question: "How much does Samsung screen repair cost?", answer: "Samsung screen repair costs vary widely by model. Galaxy A-series repairs are more affordable, while S-series and Z-series cost more due to AMOLED technology. Call 0405-326-205 for a quote." },
      { question: "Do you repair Samsung Galaxy Watch?", answer: "Yes! We offer Samsung Galaxy Watch screen repair and battery replacement. Smartwatch repair is a specialty service — bring your Galaxy Watch in and we'll assess it for you." },
      { question: "How long does Samsung screen replacement take?", answer: "Most Samsung screen replacements take 45-60 minutes. Galaxy Z Fold and Z Flip repairs may take slightly longer due to their complex construction. We'll give you an accurate time estimate at drop-off." }
    ]
  },
  {
    title: "Google Pixel Repair",
    slug: "google-pixel-repair",
    metaTitle: "Google Pixel Repair Heidelberg Melbourne | Screen & Battery",
    metaDescription: "Google Pixel screen replacement and repair in Heidelberg. Pixel 10, 9, 8, 7, 6 series. Authorised-quality service, 6-month warranty.",
    keywords: ["google pixel repair", "google pixel screen replacement", "google pixel authorized service center", "authorized google pixel repair near me", "pixel 6a screen replacement", "pixel 8 replacement screen", "pixel repair centre near me", "google pixel 7 pro screen replacement"],
    heroHeading: "Google Pixel Phone Repair",
    heroSubheading: "Authorised-quality Pixel repairs — screen, battery, and more",
    intro: "Google Pixel phone damaged? Mobile Armour offers expert Google Pixel repair services for the entire Pixel lineup. From the latest Pixel 10 Pro to the Pixel 6a, our technicians are experienced with Google's unique hardware design and software integration. Finding quality Pixel repair can be challenging — authorised Google repair centres are rare in Melbourne's north, making Mobile Armour the go-to choice for Pixel owners.",
    processSteps: [
      "Pixel diagnostic — we assess the damage and check all sensors, cameras, and software functionality",
      "Screen or component replacement — we use quality parts compatible with Google's hardware specifications",
      "Software verification — we ensure all Google-specific features (Now Playing, Call Screen, etc.) work correctly",
      "Final quality check — display calibration, fingerprint sensor, and camera testing"
    ],
    models: ["Google Pixel 10 Pro XL", "Google Pixel 10 Pro", "Google Pixel 10", "Google Pixel 9 Pro Fold", "Google Pixel 9 Pro", "Google Pixel 9", "Google Pixel 8 Pro", "Google Pixel 8", "Google Pixel 8a", "Google Pixel 7 Pro", "Google Pixel 7", "Google Pixel 7a", "Google Pixel 6 Pro", "Google Pixel 6a"],
    commonIssues: ["Cracked screen", "Battery degradation", "Charging port damage", "Camera lens cracked", "Fingerprint sensor not responding", "Screen flickering or green tint"],
    warrantyNote: "All Google Pixel repairs include our 6-month warranty. We use quality-tested components compatible with Google's hardware standards.",
    faqs: [
      { question: "Is Mobile Armour an authorised Google Pixel repair centre?", answer: "We are an independent repair centre offering authorised-quality Pixel repairs using premium components. We're one of the few shops in Melbourne's northern suburbs that regularly repairs Google Pixel devices, and our technicians have extensive Pixel experience." },
      { question: "Can you replace a Google Pixel screen?", answer: "Yes! We replace screens on all Google Pixel models from Pixel 6 through to Pixel 10. Pixel screens use OLED technology, and our replacements maintain the same vibrant display quality." },
      { question: "How much does Pixel screen replacement cost?", answer: "Google Pixel screen replacement prices vary by model. Call 0405-326-205 for a quote specific to your Pixel model. We offer competitive pricing compared to Google's official repair service." }
    ]
  },
  {
    title: "Apple Watch Repair",
    slug: "apple-watch-repair",
    metaTitle: "Apple Watch Repair Heidelberg Melbourne | Screen & Battery Replacement",
    metaDescription: "Apple Watch screen and battery repair in Heidelberg. All Apple Watch models. Specialist smartwatch repair, 6-month warranty at Warringal Shopping Centre.",
    keywords: ["apple watch repair", "apple watch screen repair heidelberg", "apple watch battery replacement heidelberg", "apple watch screen replacement melbourne", "apple watch battery replacement melbourne", "iwatch screen repair near me", "repair iwatch screen near me", "smart watch repair near me open now"],
    heroHeading: "Apple Watch Screen & Battery Repair",
    heroSubheading: "Specialist Apple Watch repair — screen replacement and battery service",
    intro: "Apple Watch screen cracked or battery failing? Mobile Armour offers specialist Apple Watch repair services at Warringal Shopping Centre, Heidelberg. Apple Watch repair requires micro-precision tools and techniques that most phone repair shops simply don't have. Our technicians are trained in smartwatch repair and handle Apple Watch screen replacements and battery swaps with the care these delicate devices demand.",
    processSteps: [
      "Micro-diagnostic — we examine the Apple Watch under magnification to assess screen and internal damage",
      "Precision disassembly — Apple Watches require specialised tools for safe opening without further damage",
      "Component replacement — we install premium replacement screens or batteries designed for your Apple Watch model",
      "Water resistance check — we reseal the device and test to maintain water resistance integrity"
    ],
    models: ["Apple Watch Ultra 2", "Apple Watch Series 9", "Apple Watch Series 8", "Apple Watch Series 7", "Apple Watch Series 6", "Apple Watch SE (2nd Gen)", "Apple Watch SE", "Apple Watch Series 5", "Apple Watch Series 4"],
    commonIssues: ["Cracked or shattered screen", "Battery not lasting a day", "Screen unresponsive to touch", "Apple Watch not charging", "Display discolouration", "Force Touch not working"],
    warrantyNote: "All Apple Watch repairs come with a 6-month warranty. Given the precision nature of smartwatch repair, we take extra care with every Apple Watch we work on.",
    faqs: [
      { question: "Can you really repair an Apple Watch screen?", answer: "Yes! While many repair shops won't touch Apple Watches, our technicians are trained in smartwatch micro-repair. We replace screens on all Apple Watch models from Series 4 onwards." },
      { question: "How long does Apple Watch repair take?", answer: "Apple Watch screen replacement typically takes 1-2 hours. Battery replacement is usually faster at 45-60 minutes. We recommend leaving your watch with us and collecting it later." },
      { question: "Is Apple Watch battery replacement worth it?", answer: "Absolutely. If your Apple Watch is less than 3-4 years old, a battery replacement is far more cost-effective than buying a new watch. A fresh battery restores full-day (or multi-day) battery life." },
      { question: "Will my Apple Watch still be water resistant after repair?", answer: "We reseal every Apple Watch after repair to maintain water resistance. However, like any third-party repair, we cannot guarantee the exact same water resistance rating as the factory original." }
    ]
  },
  {
    title: "MacBook & Laptop Repair",
    slug: "macbook-laptop-repair",
    metaTitle: "MacBook & Laptop Repair Heidelberg Melbourne | Screen & Battery",
    metaDescription: "MacBook and laptop repair in Heidelberg. Screen replacement, battery repair, diagnostics. MacBook Pro, Air, and all laptops. 6-month warranty.",
    keywords: ["macbook repair near me", "macbook repairs melbourne", "macbook battery replacement near me", "macbook pro screen fix", "laptop repair", "laptop repair near me", "laptop repairs near me", "laptop repairs doncaster", "mobile phone laptop repair"],
    heroHeading: "MacBook & Laptop Repair",
    heroSubheading: "Professional laptop repair — screen, battery, diagnostics, and more",
    intro: "MacBook or laptop not working properly? Mobile Armour offers comprehensive laptop repair services at Warringal Shopping Centre, Heidelberg. From MacBook Pro screen replacements to battery swaps and general laptop diagnostics, our technicians handle all major laptop brands. Whether you're a student at La Trobe or a professional working from home, we'll get your laptop back to full performance.",
    processSteps: [
      "Full diagnostic assessment — we identify hardware and software issues causing your laptop problems",
      "Transparent quote — we provide a detailed quote before starting any repair work",
      "Expert repair — our technicians perform the repair using quality replacement parts",
      "Performance testing — we verify all functions, run stress tests, and ensure your laptop is performing optimally"
    ],
    models: ["MacBook Pro 16-inch (M3/M4)", "MacBook Pro 14-inch (M3/M4)", "MacBook Air 15-inch (M3)", "MacBook Air 13-inch (M3)", "MacBook Pro (Intel)", "MacBook Air (Intel)", "Dell XPS", "HP Pavilion/Spectre", "Lenovo ThinkPad/IdeaPad", "ASUS ZenBook/ROG"],
    commonIssues: ["Cracked or damaged screen", "Battery not holding charge", "Keyboard not working", "Trackpad unresponsive", "Slow performance", "Won't turn on", "Overheating", "Charging port issues"],
    warrantyNote: "All laptop repairs come with a 6-month warranty on parts and labour. We work on MacBooks and all major laptop brands.",
    faqs: [
      { question: "How much does MacBook screen repair cost?", answer: "MacBook screen repair costs depend on the model and screen type (Retina, Liquid Retina XDR, etc.). Call 0405-326-205 for a quote for your specific MacBook model." },
      { question: "Can you replace a MacBook battery?", answer: "Yes! We replace batteries in all MacBook Pro and MacBook Air models. A new battery can restore your MacBook's portability and is far cheaper than buying a new laptop." },
      { question: "Do you repair Windows laptops too?", answer: "Yes! We repair all major laptop brands including Dell, HP, Lenovo, ASUS, and more. Our technicians are experienced with both macOS and Windows hardware." },
      { question: "How long does laptop repair take?", answer: "Simple repairs like battery replacement take 1-2 hours. Screen replacements may take 1-3 hours depending on the model. Complex diagnostics or part ordering may require 1-2 business days." }
    ]
  },
  {
    title: "Back Glass Replacement",
    slug: "back-glass-replacement",
    metaTitle: "iPhone Back Glass Replacement Heidelberg | All Models",
    metaDescription: "iPhone back glass replacement in Heidelberg. iPhone 11-17 rear glass repair. Specialist service, 6-month warranty. Warringal Shopping Centre.",
    keywords: ["iphone back glass repair", "back glass iphone 11 repair", "iphone 11 rear glass replacement", "iphone 12 pro max back glass replacement", "iphone 14 pro front and back glass replacement cost", "iphone 14 pro max front and back screen replacement", "iphone 15 back glass replacement", "iphone 15 back glass replacement cost", "repair iphone back glass near me"],
    heroHeading: "iPhone Back Glass Replacement",
    heroSubheading: "Specialist rear glass repair for all iPhone models",
    intro: "Cracked the back glass on your iPhone? This has become one of the most common iPhone repairs since Apple introduced glass backs for wireless charging. Mobile Armour offers specialist iPhone back glass replacement for all models from iPhone 11 onwards. Unlike screen replacement, back glass repair requires a different technique — our technicians use precision tools to remove and replace the rear glass without damaging the wireless charging coil or camera modules.",
    processSteps: [
      "Damage assessment — we examine the back glass crack pattern and check for camera or wireless charging damage",
      "Precision glass removal — we carefully remove the broken glass using controlled heat and specialised tools",
      "New glass installation — we install a premium replacement back panel matched to your iPhone colour",
      "Wireless charging test — we verify wireless charging works perfectly and the camera modules are properly aligned"
    ],
    models: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 13", "iPhone 12 Pro Max", "iPhone 12", "iPhone 11 Pro Max", "iPhone 11"],
    commonIssues: ["Shattered rear glass", "Cracked back panel from drops", "Back glass cracked around camera", "Wireless charging stopped working after drop", "Back glass scratched or chipped"],
    warrantyNote: "All back glass replacements include a 6-month warranty. We ensure wireless charging functionality is fully restored after every repair.",
    faqs: [
      { question: "How much does iPhone back glass replacement cost?", answer: "Back glass replacement pricing varies by model. Newer iPhone Pro models cost more due to the integrated camera housing. Call 0405-326-205 for a quote specific to your iPhone model." },
      { question: "How long does back glass replacement take?", answer: "iPhone back glass replacement typically takes 60-90 minutes. It requires careful heat application and precision work to avoid damaging internal components." },
      { question: "Will wireless charging work after back glass repair?", answer: "Yes! We take special care to protect the wireless charging coil during back glass replacement and test wireless charging before returning your device." },
      { question: "Is back glass replacement worth it?", answer: "Yes — a cracked back compromises your iPhone's water resistance and structural integrity. It can also cause injuries from glass shards. Repair is significantly cheaper than replacing the entire phone." }
    ]
  },
  {
    title: "Camera Lens Repair",
    slug: "camera-lens-repair",
    metaTitle: "Phone Camera Lens Repair Heidelberg | iPhone & Samsung",
    metaDescription: "Phone camera glass and lens repair in Heidelberg. iPhone and Samsung camera lens replacement. Same-day service, 6-month warranty.",
    keywords: ["camera glass replacement iphone", "camera lens iphone repair", "camera repair near me", "fix iphone camera", "fix iphone rear camera", "iphone camera glass replacement", "iphone camera screen repair", "iphone camera smashed", "phone camera lens repair"],
    heroHeading: "Phone Camera Lens Repair",
    heroSubheading: "Restore your phone's camera with precision lens replacement",
    intro: "Cracked camera lens ruining your photos? A damaged camera lens cover is more than a cosmetic issue — it lets dust and moisture into the camera module, which can permanently damage the sensor. Mobile Armour offers fast camera lens replacement for all iPhone and Samsung models. Our technicians carefully replace the protective glass cover over your camera, restoring photo clarity and protecting the expensive sensor underneath.",
    processSteps: [
      "Camera assessment — we check all camera lenses and test photo quality to identify the affected lens",
      "Precision lens removal — we carefully remove the damaged lens glass without disturbing the camera sensor",
      "New lens installation — we install a premium replacement lens cover matched to your phone model",
      "Camera quality test — we take test photos and videos to verify sharpness, focus, and colour accuracy"
    ],
    models: ["iPhone 17 Pro Max (triple lens)", "iPhone 16 Pro Max", "iPhone 15 Pro Max", "iPhone 14 Pro Max", "iPhone 13 Pro Max", "Samsung Galaxy S25 Ultra", "Samsung Galaxy S24 Ultra", "Samsung Galaxy Z Fold", "Google Pixel 10 Pro"],
    commonIssues: ["Cracked camera lens cover", "Blurry photos from damaged lens", "Camera fog from moisture ingress", "Scratched camera glass", "Camera not focusing properly"],
    warrantyNote: "All camera lens repairs come with a 6-month warranty. We test photo quality thoroughly after every lens replacement.",
    faqs: [
      { question: "Can a cracked camera lens be repaired?", answer: "Yes! The glass cover over your phone's camera can be replaced without replacing the entire camera module. This is a much more affordable repair that restores full photo quality." },
      { question: "How much does camera lens repair cost?", answer: "Camera lens replacement is typically one of our more affordable repairs. Pricing varies by phone model — call 0405-326-205 for a quote." },
      { question: "My photos are blurry — is it the camera lens?", answer: "Blurry photos are often caused by a cracked or scratched camera lens cover. Bring your phone in for a free diagnostic — we'll check if it's the lens, a focus issue, or something else entirely." }
    ]
  },
  {
    title: "Charging Port Repair",
    slug: "charging-port-repair",
    metaTitle: "Phone Charging Port Repair Heidelberg | iPhone, Samsung, iPad",
    metaDescription: "Phone charging port repair and replacement in Heidelberg. iPhone, Samsung, iPad charging fix. Same-day service, 6-month warranty.",
    keywords: ["charging port repair", "iphone 11 charging port replacement", "iphone 11 charging port replacement price", "phone charging port repair", "phone not charging repair", "charging port fix near me"],
    heroHeading: "Charging Port Repair & Replacement",
    heroSubheading: "Fix charging issues on any phone or tablet — fast same-day service",
    intro: "Phone not charging properly? Before you assume it's the battery, the problem is often a faulty or damaged charging port. Mobile Armour offers professional charging port repair and replacement for all iPhone, Samsung, iPad, and other devices. Whether your port has accumulated lint and debris or the connector is physically damaged, our technicians will diagnose the exact issue and get your device charging reliably again.",
    processSteps: [
      "Charging diagnostic — we test with multiple cables to determine if the issue is the port, cable, or battery",
      "Port cleaning or replacement — if it's debris, we clean the port; if it's damaged, we replace the connector",
      "Soldering and component work — charging port replacement involves precision micro-soldering on some models",
      "Charging verification — we test with multiple chargers and verify fast charging, data transfer, and audio output"
    ],
    models: ["All iPhone models (Lightning & USB-C)", "All Samsung Galaxy models", "All iPad models", "Google Pixel phones", "OnePlus phones", "Other Android devices"],
    commonIssues: ["Phone won't charge at all", "Loose charging connection", "Charges only at certain angles", "Slow charging", "Lint or debris in port", "Phone not recognised by computer", "Headphone jack issues (combined port)"],
    warrantyNote: "All charging port repairs come with a 6-month warranty. If the issue recurs within the warranty period, we'll fix it free of charge.",
    faqs: [
      { question: "How do I know if my charging port is broken?", answer: "Common signs include: phone only charges at certain angles, loose cable connection, very slow charging, phone not recognising when plugged in, or no charging at all. Bring it in for a free diagnostic — sometimes it's just lint buildup." },
      { question: "How long does charging port repair take?", answer: "Charging port repair typically takes 45-60 minutes. Some models require micro-soldering, which may take slightly longer. We'll give you an accurate estimate at drop-off." },
      { question: "Is charging port repair expensive?", answer: "Charging port repair is generally very affordable — much cheaper than phone replacement. Pricing varies by model. Call 0405-326-205 for a quote." }
    ]
  },
  {
    title: "Screen Protector Installation",
    slug: "screen-protector-installation",
    metaTitle: "Screen Protector Installation Heidelberg | Tempered Glass & Privacy",
    metaDescription: "Professional screen protector installation in Heidelberg. Tempered glass, privacy, anti-glare for iPhone, Samsung, iPad. Perfect bubble-free fit.",
    keywords: ["screen protector installation", "phone screen protector installation", "phone screen protector near me", "screen protectors near me", "screen protector replacement near me", "tempered glass screen protector"],
    heroHeading: "Screen Protector Installation",
    heroSubheading: "Professional bubble-free screen protector installation for all devices",
    intro: "Want to protect your phone or tablet screen with a perfect, bubble-free screen protector? Mobile Armour offers professional screen protector installation using premium tempered glass, privacy, and anti-glare protectors. Our dust-free application process ensures a flawless finish every time. Whether you've just had your screen repaired or want to protect a new device, our expert installation takes just 5-10 minutes.",
    processSteps: [
      "Screen cleaning — we thoroughly clean your screen in a dust-controlled environment",
      "Precise alignment — we use alignment guides specific to your device model for perfect placement",
      "Bubble-free application — our technique ensures zero bubbles and full edge-to-edge coverage",
      "Final inspection — we verify touch sensitivity, Face ID, and fingerprint sensor are unaffected"
    ],
    models: ["All iPhone models", "All Samsung Galaxy models", "All iPad models", "Google Pixel phones", "Other smartphones and tablets"],
    commonIssues: ["Previous protector cracked or peeling", "Bubbles under DIY installation", "Protector not fitting properly", "Reduced touch sensitivity from cheap protector", "Need privacy screen for commuting"],
    warrantyNote: "Screen protector installation includes a workmanship guarantee. If the protector lifts or bubbles appear within the first week, bring it back and we'll reapply free of charge.",
    faqs: [
      { question: "What types of screen protectors do you offer?", answer: "We offer three types: tempered glass (strongest protection), privacy (prevents others from seeing your screen at angles), and anti-glare (reduces reflections for outdoor use). All are compatible with Face ID and fingerprint sensors." },
      { question: "How much does screen protector installation cost?", answer: "Screen protector installation is one of our most affordable services. The price includes both the protector and professional installation. Contact us for pricing specific to your device." },
      { question: "Will a screen protector affect my phone's touch sensitivity?", answer: "Our premium screen protectors are ultra-thin and designed to maintain full touch sensitivity. They're also compatible with Face ID, in-display fingerprint sensors, and Apple Pencil." }
    ]
  },
  {
    title: "Water Damage Repair",
    slug: "water-damage-repair",
    metaTitle: "Water Damage Phone Repair Heidelberg | Emergency Recovery Service",
    metaDescription: "Emergency water damage phone repair in Heidelberg. iPhone, Samsung, iPad liquid damage recovery. Fast assessment, 6-month warranty on successful repairs.",
    keywords: ["water damage repair", "water damage phone repair", "phone water damage fix", "iphone water damage repair", "samsung water damage repair", "liquid damage recovery"],
    heroHeading: "Water Damage Repair & Recovery",
    heroSubheading: "Emergency liquid damage repair — the sooner you bring it in, the better",
    intro: "Phone taken an unexpected swim? Water damage is one of the most time-sensitive phone repairs — the sooner you bring your device to Mobile Armour, the better your chances of a successful recovery. Our technicians use ultrasonic cleaning equipment and specialised techniques to remove moisture, clean corrosion, and restore water-damaged iPhones, Samsung phones, iPads, and other devices. Don't put your phone in rice — bring it to us.",
    processSteps: [
      "Immediate assessment — we power down the device and assess the extent of water ingress",
      "Ultrasonic cleaning — we use ultrasonic bath technology to remove moisture and mineral deposits from all components",
      "Corrosion treatment — we treat any corroded connections and components to prevent further damage",
      "Component testing — we systematically test every component and replace any that are damaged beyond repair"
    ],
    models: ["All iPhone models", "All Samsung Galaxy models", "All iPad models", "Google Pixel phones", "MacBooks and laptops", "Apple Watch", "Other devices"],
    commonIssues: ["Phone dropped in water/pool/toilet", "Liquid spill on device", "Phone exposed to rain", "Condensation damage", "Phone won't turn on after water exposure", "Screen flickering after getting wet", "Speaker or microphone muffled"],
    warrantyNote: "Successful water damage repairs come with a 6-month warranty on replaced components. Note: water damage repair success depends on the extent of damage and how quickly the device is brought in.",
    faqs: [
      { question: "What should I do if my phone gets wet?", answer: "Turn it off immediately. Don't try to charge it or turn it on. Don't put it in rice (this is a myth and can push debris into the ports). Bring it to Mobile Armour as quickly as possible — time is critical for water damage recovery." },
      { question: "Can a water-damaged phone be fixed?", answer: "Many water-damaged phones can be successfully repaired, especially if brought in quickly. Success rates decrease the longer the device sits with moisture inside. We'll give you an honest assessment of your device's chances." },
      { question: "How much does water damage repair cost?", answer: "Water damage repair pricing depends on the extent of damage and which components need replacement. We provide a full assessment and quote before starting any chargeable work." },
      { question: "How long does water damage repair take?", answer: "Water damage repair typically requires 24-48 hours for the ultrasonic cleaning and drying process. We'll keep you updated on progress and let you know as soon as your device is ready." }
    ]
  }
];

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return servicePages.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicePages.map((s) => s.slug);
}
