export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface SuburbData {
  name: string;
  slug: string;
  postcode: string;
  lat: number;
  lng: number;
  distance: string;
  driveTime: string;
  nearbySuburbs: string[];
  landmarks: string[];
  faqs: LocationFAQ[];
  intro: string;
  serviceHighlights: string;
  whyChooseUs: string;
}

export const locationPages: SuburbData[] = [
  {
    name: "Greensborough",
    slug: "greensborough",
    postcode: "3088",
    lat: -37.7040,
    lng: 145.1010,
    distance: "6 km",
    driveTime: "10-15 minutes",
    nearbySuburbs: ["Watsonia", "Briar Hill", "St Helena", "Montmorency", "Eltham"],
    landmarks: ["Greensborough Plaza", "Greensborough RSL", "Were Street shops"],
    faqs: [
      {
        question: "Where can I get my phone repaired near Greensborough?",
        answer: "Mobile Armour is located at Warringal Shopping Centre in Heidelberg, just a 10-15 minute drive from Greensborough. We offer same-day repairs for iPhone, Samsung, iPad, and Apple Watch devices. Many Greensborough residents choose us for our certified technicians and 6-month warranty on all repairs."
      },
      {
        question: "How much does an iPhone screen repair cost near Greensborough?",
        answer: "iPhone screen repair prices at Mobile Armour start from competitive rates depending on the model. We serve Greensborough and surrounding suburbs like Watsonia, Briar Hill, and St Helena. Call us on 0405-326-205 for an instant quote — most repairs are completed in 30-60 minutes."
      },
      {
        question: "Do you offer phone repair pickup from Greensborough?",
        answer: "While we don't currently offer pickup services, our Heidelberg store is an easy 10-minute drive from Greensborough via Greensborough Highway. We offer free parking at Warringal Shopping Centre, and most repairs are done while you wait."
      }
    ],
    intro: "Looking for reliable phone repair near Greensborough? Mobile Armour at Warringal Shopping Centre, Heidelberg, is the top-rated mobile repair destination for Greensborough residents. Located just 6 km south along Greensborough Highway, our store is easily accessible from Greensborough Plaza and surrounding streets. Whether you've cracked your iPhone screen at Greensborough Park or your Samsung battery is dying during the commute, our certified technicians provide fast, affordable repairs with a 6-month warranty.",
    serviceHighlights: "Greensborough residents regularly visit us for iPhone screen replacements, Samsung Galaxy repairs, iPad screen fixes, and Apple Watch battery replacements. We're a trusted alternative to the big-chain phone shops at Greensborough Plaza, offering more personalised service, faster turnaround, and better pricing. Our technicians handle everything from water damage recovery to charging port repairs, using only premium-grade replacement parts.",
    whyChooseUs: "Many Greensborough locals have switched to Mobile Armour after experiencing longer wait times and higher prices at other repair shops. We pride ourselves on transparent pricing with no hidden fees, same-day service for most repairs, and a full 6-month warranty. Our location at Warringal Shopping Centre means you can grab a coffee or do some shopping while your device is being repaired — most jobs take just 30-60 minutes."
  },
  {
    name: "Preston",
    slug: "preston",
    postcode: "3072",
    lat: -37.7500,
    lng: 145.0133,
    distance: "5 km",
    driveTime: "10-12 minutes",
    nearbySuburbs: ["Thornbury", "Reservoir", "Northcote", "Coburg", "Fairfield"],
    landmarks: ["Preston Market", "Northland Shopping Centre", "High Street shops"],
    faqs: [
      {
        question: "Where is the nearest phone repair shop to Preston?",
        answer: "Mobile Armour is located at Warringal Shopping Centre in Heidelberg, approximately 10-12 minutes from Preston. We're a popular choice for Preston residents who want fast, reliable phone repairs with a 6-month warranty — without the crowds and queues at Northland."
      },
      {
        question: "Can I get my iPhone battery replaced near Preston?",
        answer: "Yes! Mobile Armour offers iPhone battery replacement for all models from iPhone 6 through to iPhone 17. We serve Preston and surrounding areas including Thornbury, Reservoir, and Northcote. Battery replacements typically take 20-30 minutes and come with a 6-month warranty."
      },
      {
        question: "How do I get to Mobile Armour from Preston?",
        answer: "From Preston, take Plenty Road or St Georges Road towards Heidelberg. Our store at Warringal Shopping Centre is on Burgundy Street, Heidelberg — about a 10-minute drive. Free parking is available at the shopping centre. You can also catch the 903 bus from Preston to Heidelberg."
      }
    ],
    intro: "Need phone repair in Preston or nearby Thornbury and Reservoir? Mobile Armour at Warringal Shopping Centre, Heidelberg, is your local expert for all mobile device repairs. Just a quick 10-minute drive from Preston Market or Northland Shopping Centre, we offer same-day iPhone, Samsung, iPad, and Apple Watch repairs at competitive prices. Preston locals trust us because we combine fast turnaround with certified expertise and a solid 6-month warranty.",
    serviceHighlights: "Preston and inner-north residents rely on Mobile Armour for a wide range of repairs. Our most popular services for the Preston area include iPhone screen replacements (all models from iPhone 11 to iPhone 17), Samsung Galaxy screen and battery repairs, iPad screen replacements, and Apple Watch servicing. We also handle MacBook repairs, charging port fixes, water damage recovery, and back glass replacements — services that many Preston shops simply don't offer.",
    whyChooseUs: "While Northland Shopping Centre has several phone repair options, Preston residents keep coming back to Mobile Armour because of our transparent pricing, genuine parts, and personal service. Unlike chain stores, you'll speak directly to the technician working on your device. We offer a 6-month warranty on all repairs — one of the longest in Melbourne's northern suburbs. With free parking at Warringal Shopping Centre and most repairs completed in under an hour, it's worth the short drive from Preston."
  },
  {
    name: "Doncaster",
    slug: "doncaster",
    postcode: "3108",
    lat: -37.7847,
    lng: 145.1265,
    distance: "8 km",
    driveTime: "15-20 minutes",
    nearbySuburbs: ["Doncaster East", "Templestowe", "Bulleen", "Box Hill", "Manningham"],
    landmarks: ["Westfield Doncaster", "Ruffey Lake Park", "Doncaster Road shops"],
    faqs: [
      {
        question: "Is there a good phone repair shop near Doncaster?",
        answer: "Mobile Armour at Warringal Shopping Centre, Heidelberg, is a popular choice for Doncaster residents. We're about 15-20 minutes away via Manningham Road and offer certified phone repairs with a 6-month warranty. Many Doncaster locals prefer us for our competitive pricing and personalised service."
      },
      {
        question: "How much does Samsung screen repair cost near Doncaster?",
        answer: "Samsung screen repair prices vary by model. At Mobile Armour, we repair all Samsung Galaxy S, A, and Z series phones at competitive prices. Contact us on 0405-326-205 for an instant quote. We serve Doncaster, Templestowe, and the wider Manningham area."
      },
      {
        question: "Do you repair iPads near Doncaster?",
        answer: "Yes! We offer iPad screen replacement and battery repair for all iPad models including iPad Pro, Air, Mini, and standard iPads. Our Heidelberg store is easily accessible from Doncaster — just 15 minutes via Manningham Road. Most iPad repairs are completed within 1-2 hours."
      }
    ],
    intro: "Searching for phone repair near Doncaster? Mobile Armour in Heidelberg serves the entire Manningham area with expert mobile device repairs. Located just 15 minutes from Westfield Doncaster via Manningham Road, we're a trusted alternative for Doncaster residents who want quality repairs at fair prices. From cracked iPhone screens to Samsung battery replacements, our certified technicians handle all major brands with a 6-month warranty on every repair.",
    serviceHighlights: "Doncaster and Manningham residents visit Mobile Armour for comprehensive repair services including iPhone screen and battery replacements across all models, Samsung Galaxy S25 and Z Fold/Flip repairs, iPad screen and battery servicing, Google Pixel screen replacements, and Apple Watch repairs. We also specialise in laptop and MacBook repairs — a service rarely found at shopping centre kiosks. Our use of premium-grade components ensures your device performs like new after repair.",
    whyChooseUs: "While Westfield Doncaster has phone repair options, Mobile Armour offers a different experience. We provide one-on-one service with certified technicians who explain exactly what's wrong with your device before starting any work. Our transparent pricing means no surprise fees, and our 6-month warranty is one of the most generous in Melbourne's eastern suburbs. The short drive from Doncaster to Warringal Shopping Centre is worth it for the quality and care you'll receive."
  },
  {
    name: "Eltham",
    slug: "eltham",
    postcode: "3095",
    lat: -37.7139,
    lng: 145.1477,
    distance: "10 km",
    driveTime: "15-18 minutes",
    nearbySuburbs: ["Research", "Lower Plenty", "Montmorency", "Diamond Creek", "Briar Hill"],
    landmarks: ["Eltham Town Centre", "Eltham Library", "Main Road shops", "Alistair Knox Park"],
    faqs: [
      {
        question: "Where can I get my phone fixed near Eltham?",
        answer: "Mobile Armour at Warringal Shopping Centre, Heidelberg, is about 15 minutes from Eltham via Main Road and Rosanna Road. We offer same-day repairs for all major phone brands, with most repairs completed in 30-60 minutes. Eltham residents appreciate our certified service and 6-month warranty."
      },
      {
        question: "Do you repair Google Pixel phones near Eltham?",
        answer: "Yes! Mobile Armour repairs all Google Pixel models including Pixel 10, 9, 8, and earlier models. We handle screen replacements, battery swaps, and charging port repairs. Our Heidelberg location conveniently serves Eltham, Research, and the Diamond Creek area."
      },
      {
        question: "What's the fastest way to get to Mobile Armour from Eltham?",
        answer: "The quickest route from Eltham is via Main Road heading south to Rosanna Road, then onto Burgundy Street in Heidelberg. It takes about 15 minutes by car. Warringal Shopping Centre has free parking, and our store is at Kiosk 4 on the ground level."
      }
    ],
    intro: "Need mobile phone repair near Eltham? Mobile Armour at Warringal Shopping Centre, Heidelberg, provides expert device repairs for the Eltham, Research, and Nillumbik communities. Located approximately 15 minutes south via Main Road, we offer fast same-day repairs for iPhones, Samsung devices, iPads, Google Pixels, and Apple Watches. Eltham's active lifestyle means phones take a beating — whether it's a cracked screen from the park or water damage from the Diamond Creek trail, we've got you covered.",
    serviceHighlights: "Eltham and Nillumbik residents regularly bring their devices to Mobile Armour for screen repairs (iPhone and Samsung), battery replacements, iPad servicing, Google Pixel repairs, and Apple Watch screen and battery replacement. We're one of the few repair centres in Melbourne's north-east that also handles MacBook and laptop repairs. Our technicians use premium components and provide detailed diagnostics so you know exactly what your device needs.",
    whyChooseUs: "Eltham locals trust Mobile Armour because we offer the complete package: certified technicians, transparent pricing, premium parts, and a 6-month warranty. While there are limited phone repair options in the Eltham area, our Heidelberg location is just a short drive away and provides a far wider range of services. We treat every device with care, and our fast turnaround means you won't be without your phone for long."
  },
  {
    name: "Epping",
    slug: "epping",
    postcode: "3076",
    lat: -37.6524,
    lng: 145.0287,
    distance: "12 km",
    driveTime: "18-22 minutes",
    nearbySuburbs: ["South Morang", "Mill Park", "Lalor", "Thomastown", "Wollert"],
    landmarks: ["Pacific Epping", "Epping Plaza", "Northern Hospital"],
    faqs: [
      {
        question: "Is there a reliable phone repair shop near Epping?",
        answer: "Mobile Armour at Warringal Shopping Centre, Heidelberg, is about 18-22 minutes from Epping and is one of the highest-rated mobile repair shops in Melbourne's north. We offer certified same-day repairs for iPhone, Samsung, iPad, and more with a 6-month warranty."
      },
      {
        question: "How much does a phone screen replacement cost near Epping?",
        answer: "Screen replacement costs vary by device model. At Mobile Armour, we offer competitive pricing on all screen repairs from iPhone 11 through to iPhone 17, Samsung Galaxy series, and iPads. Call 0405-326-205 for an instant quote — we serve Epping, South Morang, Mill Park, and Lalor."
      },
      {
        question: "Can I get my Apple Watch repaired near Epping?",
        answer: "Yes! Mobile Armour specialises in Apple Watch screen and battery replacement for all models. While Apple Watch repair is hard to find in the Epping area, our Heidelberg store is just a 20-minute drive and our technicians are experienced with all Apple Watch generations."
      }
    ],
    intro: "Looking for quality phone repair near Epping? Mobile Armour at Warringal Shopping Centre, Heidelberg, is the go-to repair destination for Epping, South Morang, and Mill Park residents. While Epping Plaza has some repair options, many locals make the 20-minute drive to Mobile Armour for our certified technicians, premium replacement parts, and industry-leading 6-month warranty. Whether your iPhone screen is cracked or your Samsung won't charge, we'll have it fixed fast.",
    serviceHighlights: "We serve the Epping, South Morang, Mill Park, and Lalor areas with comprehensive mobile repair services. Popular repairs for Epping residents include iPhone and Samsung screen replacements, battery replacements for all phone models, iPad screen and battery repair, Apple Watch servicing, charging port repairs, and water damage recovery. We also offer MacBook and laptop repair — a service that's particularly popular with students and professionals in the Northern Hospital precinct.",
    whyChooseUs: "Epping residents consistently choose Mobile Armour because we offer something the Epping Plaza repair shops often can't: transparent pricing, genuine-quality parts, and a proper 6-month warranty. Our certified technicians take the time to diagnose your device properly before recommending any repair, so you only pay for what you need. The drive from Epping to Heidelberg is straightforward via Plenty Road, and free parking at Warringal Shopping Centre makes the visit hassle-free."
  },
  {
    name: "Bundoora",
    slug: "bundoora",
    postcode: "3083",
    lat: -37.6989,
    lng: 145.0597,
    distance: "5 km",
    driveTime: "8-12 minutes",
    nearbySuburbs: ["Watsonia", "Macleod", "Kingsbury", "Greensborough", "Mill Park"],
    landmarks: ["La Trobe University", "RMIT Bundoora", "Uni Hill Town Centre", "Bundoora Park"],
    faqs: [
      {
        question: "Where is the closest phone repair to Bundoora?",
        answer: "Mobile Armour at Warringal Shopping Centre in Heidelberg is just 8-12 minutes from Bundoora. We're the closest certified phone repair shop to La Trobe University and RMIT Bundoora, offering student-friendly pricing and fast same-day repairs."
      },
      {
        question: "Do you offer student discounts for phone repair near Bundoora?",
        answer: "We offer competitive pricing that Bundoora students love. With La Trobe University and RMIT just minutes away, we regularly serve students needing quick, affordable phone repairs. Call 0405-326-205 for a quote — many of our repairs are among the most affordable in Melbourne's north."
      },
      {
        question: "Can I get my laptop repaired near Bundoora?",
        answer: "Yes! Mobile Armour repairs MacBooks and laptops — perfect for Bundoora's student population. We handle screen replacements, battery swaps, and general repairs. Our Heidelberg store is just a short drive from both La Trobe and RMIT Bundoora campuses."
      }
    ],
    intro: "Need phone repair near Bundoora? Mobile Armour at Warringal Shopping Centre, Heidelberg, is just 8-12 minutes from Bundoora and serves the entire university precinct. As the nearest certified repair shop to La Trobe University and RMIT Bundoora, we understand the student community's need for fast, affordable repairs. Whether you've dropped your iPhone between lectures or your Samsung battery won't last the day, our technicians will have it fixed in 30-60 minutes.",
    serviceHighlights: "Bundoora residents and university students visit Mobile Armour for iPhone screen and battery replacements, Samsung repairs, iPad servicing, MacBook and laptop repairs (popular with students), charging port fixes, and Apple Watch screen replacements. We're particularly popular with the La Trobe and RMIT community because we offer quick turnaround times that fit between classes and competitive pricing that suits a student budget.",
    whyChooseUs: "Bundoora students and residents love Mobile Armour because we're fast, affordable, and just minutes away. Unlike mail-in repair services that leave you without a phone for days, we complete most repairs in under an hour. Our 6-month warranty gives you peace of mind, and our transparent pricing means no surprise costs. We're easily reached from Bundoora via Plenty Road — just head south towards Heidelberg and you'll find us at Warringal Shopping Centre."
  },
  {
    name: "Reservoir",
    slug: "reservoir",
    postcode: "3073",
    lat: -37.7167,
    lng: 145.0167,
    distance: "6 km",
    driveTime: "10-15 minutes",
    nearbySuburbs: ["Preston", "Thornbury", "Kingsbury", "Bundoora", "Keon Park"],
    landmarks: ["Summerhill Shopping Centre", "Edwardes Lake Park", "Broadway shops"],
    faqs: [
      {
        question: "Where can I get my phone repaired near Reservoir?",
        answer: "Mobile Armour at Warringal Shopping Centre in Heidelberg is about 10-15 minutes from Reservoir. We offer same-day repairs for iPhone, Samsung, iPad, and more. Many Reservoir residents prefer us over the Summerhill Shopping Centre options for our expertise and 6-month warranty."
      },
      {
        question: "Do you repair Samsung phones near Reservoir?",
        answer: "Absolutely! We repair all Samsung Galaxy models including S25, S24, A55, Z Fold, and Z Flip series. Screen replacements, battery swaps, charging port repairs — we handle it all. Serving Reservoir, Preston, and Thornbury from our Heidelberg location."
      },
      {
        question: "How long does a phone repair take at Mobile Armour?",
        answer: "Most phone repairs take 30-60 minutes. Screen replacements are typically done in 45 minutes, battery replacements in 20-30 minutes. You can wait at Warringal Shopping Centre or pop out for a quick errand — we'll text you when your device is ready."
      }
    ],
    intro: "Searching for phone repair near Reservoir? Mobile Armour at Warringal Shopping Centre, Heidelberg, is just a 10-15 minute drive from Reservoir and offers the most comprehensive mobile repair services in Melbourne's north. Whether you're near Summerhill Shopping Centre or the Broadway shops, our certified technicians provide fast same-day repairs for all major phone brands at competitive prices.",
    serviceHighlights: "Reservoir residents trust Mobile Armour for iPhone screen repairs across all models, Samsung Galaxy screen and battery replacements, iPad screen and battery servicing, Apple Watch repairs, charging port and water damage repairs, and back glass replacement for newer iPhones. We use premium-grade parts on every repair and provide a full diagnostic before starting any work.",
    whyChooseUs: "Reservoir locals appreciate Mobile Armour's combination of quality and value. Our 6-month warranty is one of the longest you'll find in Melbourne's north, and our certified technicians take pride in every repair. We're a short drive from Reservoir via Plenty Road, with free parking at Warringal Shopping Centre. No appointment needed — just drop in and we'll take care of your device."
  },
  {
    name: "Northcote",
    slug: "northcote",
    postcode: "3070",
    lat: -37.7697,
    lng: 145.0017,
    distance: "6 km",
    driveTime: "12-15 minutes",
    nearbySuburbs: ["Thornbury", "Fairfield", "Clifton Hill", "Fitzroy North", "Preston"],
    landmarks: ["Northcote Plaza", "High Street shops", "All Nations Park"],
    faqs: [
      {
        question: "Is there a phone repair shop near Northcote?",
        answer: "Mobile Armour at Warringal Shopping Centre, Heidelberg, is about 12-15 minutes from Northcote. We're a popular choice for Northcote and Thornbury residents who want certified phone repairs with premium parts and a 6-month warranty."
      },
      {
        question: "Can I get my MacBook repaired near Northcote?",
        answer: "Yes! Mobile Armour offers MacBook screen replacement, battery repair, and general diagnostics. We serve Northcote, Thornbury, and the inner north. Our Heidelberg store is easily accessible via Heidelberg Road — about 12 minutes from Northcote Plaza."
      },
      {
        question: "What devices do you repair at Mobile Armour?",
        answer: "We repair iPhones (all models), Samsung Galaxy phones, iPads, Google Pixel phones, Apple Watches, MacBooks, and laptops. We also handle specialised repairs like charging port fixes, water damage recovery, camera lens replacement, and back glass repair."
      }
    ],
    intro: "Need phone repair near Northcote? Mobile Armour at Warringal Shopping Centre, Heidelberg, serves the inner-north community with expert mobile device repairs. Just a quick 12-minute drive from Northcote Plaza via Heidelberg Road, we offer same-day repairs for iPhones, Samsung phones, iPads, and more. Northcote's vibrant community relies on their devices for work and play — we make sure you're never without yours for long.",
    serviceHighlights: "Northcote and inner-north residents visit us for the full range of mobile repairs: iPhone and Samsung screen replacements, battery replacements for all models, iPad repairs, MacBook servicing (popular with Northcote's creative and freelance community), Apple Watch repairs, and specialised services like water damage recovery and camera lens replacement.",
    whyChooseUs: "Northcote locals love Mobile Armour for our personalised approach. Unlike the chain repair shops, we take the time to explain what's wrong with your device and give you options. Our certified technicians use premium parts, and our 6-month warranty means you're covered long after you leave. The drive from Northcote to Heidelberg is just 12 minutes via Heidelberg Road, and free parking at Warringal Shopping Centre makes the trip easy."
  },
  {
    name: "South Morang",
    slug: "south-morang",
    postcode: "3752",
    lat: -37.6500,
    lng: 145.0833,
    distance: "14 km",
    driveTime: "20-25 minutes",
    nearbySuburbs: ["Mill Park", "Mernda", "Epping", "Plenty", "Yan Yean"],
    landmarks: ["Westfield Plenty Valley", "South Morang Station", "Laurimar Town Centre"],
    faqs: [
      {
        question: "Is there a reliable phone repair near South Morang?",
        answer: "Mobile Armour at Warringal Shopping Centre, Heidelberg, is about 20-25 minutes from South Morang and is one of the most trusted repair shops in Melbourne's north. We offer certified same-day repairs with a 6-month warranty on all work."
      },
      {
        question: "Can I get my iPad repaired near South Morang?",
        answer: "Yes! We repair all iPad models — Pro, Air, Mini, and standard iPads. Screen replacements and battery repairs are our most popular iPad services. While iPad repair is hard to find in the South Morang area, our Heidelberg store handles it daily."
      },
      {
        question: "Do you repair phone charging ports near South Morang?",
        answer: "Yes! Charging port repair is one of our specialty services. We fix charging port issues on iPhones, Samsung Galaxy phones, iPads, and other devices. The repair typically takes 45-60 minutes and comes with our standard 6-month warranty."
      }
    ],
    intro: "Looking for phone repair near South Morang? Mobile Armour at Warringal Shopping Centre, Heidelberg, serves the South Morang, Mill Park, and Mernda communities with expert device repairs. While Westfield Plenty Valley has some options, many South Morang residents make the drive to Mobile Armour for our certified expertise, premium parts, and 6-month warranty. We offer same-day service for most repairs and handle everything from cracked screens to water damage.",
    serviceHighlights: "South Morang and northern suburbs residents come to Mobile Armour for iPhone and Samsung screen replacements, battery swaps for all phone models, iPad screen and battery repair, Apple Watch servicing, Google Pixel repairs, charging port fixes, and water damage recovery. We also offer MacBook and laptop repairs — a service that's difficult to find in the outer northern suburbs.",
    whyChooseUs: "South Morang residents choose Mobile Armour because we offer a level of expertise and warranty that's hard to find locally. Our certified technicians use premium-grade components and back every repair with a 6-month warranty. While the drive is a bit further than your nearest shopping centre, the quality of service and competitive pricing make it well worth the trip. Free parking at Warringal Shopping Centre means no extra hassle."
  },
  {
    name: "Thomastown",
    slug: "thomastown",
    postcode: "3074",
    lat: -37.6800,
    lng: 145.0167,
    distance: "8 km",
    driveTime: "12-15 minutes",
    nearbySuburbs: ["Lalor", "Epping", "Reservoir", "Kingsbury", "Bundoora"],
    landmarks: ["Thomastown Recreation Reserve", "High Street shops", "Settlement Road"],
    faqs: [
      {
        question: "Where can I get my phone fixed near Thomastown?",
        answer: "Mobile Armour at Warringal Shopping Centre in Heidelberg is about 12-15 minutes from Thomastown via Plenty Road. We offer certified same-day repairs for iPhone, Samsung, iPad, and Apple Watch with a 6-month warranty."
      },
      {
        question: "Do you repair water-damaged phones near Thomastown?",
        answer: "Yes! Water damage repair is one of our specialties. If your phone has been exposed to water, bring it to Mobile Armour as soon as possible. We have specialised equipment for water damage diagnostics and recovery. The sooner we see it, the better the chances of a successful repair."
      },
      {
        question: "Can I get a screen protector installed at Mobile Armour?",
        answer: "Yes! We offer professional screen protector installation including tempered glass, privacy, and anti-glare options for all iPhone, Samsung, and iPad models. Installation is quick — usually done in just 5-10 minutes while you wait."
      }
    ],
    intro: "Need phone repair near Thomastown? Mobile Armour at Warringal Shopping Centre, Heidelberg, provides certified mobile repair services for the Thomastown, Lalor, and surrounding communities. Just 12-15 minutes south on Plenty Road, we offer fast same-day repairs for all major smartphone, tablet, and smartwatch brands at competitive prices that Thomastown residents appreciate.",
    serviceHighlights: "Thomastown residents rely on Mobile Armour for comprehensive mobile repairs: iPhone and Samsung screen replacements, battery swaps, iPad repairs, Apple Watch servicing, charging port fixes, water damage recovery, and screen protector installation. We handle all major brands and models, using premium replacement components backed by our 6-month warranty.",
    whyChooseUs: "Thomastown locals trust Mobile Armour because we offer certified repairs at competitive prices with a 6-month warranty. Our transparent approach means you'll know the cost before we start any work, and we never push unnecessary repairs. The quick drive to Warringal Shopping Centre is easy via Plenty Road, and you can wait comfortably while we work on your device."
  },
  {
    name: "Coburg",
    slug: "coburg",
    postcode: "3058",
    lat: -37.7431,
    lng: 144.9661,
    distance: "8 km",
    driveTime: "15-18 minutes",
    nearbySuburbs: ["Brunswick", "Pascoe Vale", "Fawkner", "Moreland", "Northcote"],
    landmarks: ["Coburg North Village", "Pentridge", "Sydney Road shops", "Coburg Lake Reserve"],
    faqs: [
      {
        question: "Where can I get my phone repaired near Coburg?",
        answer: "Mobile Armour at Warringal Shopping Centre, Heidelberg, is about 15-18 minutes from Coburg. While Sydney Road has some repair options, many Coburg residents prefer Mobile Armour for our certified technicians, premium parts, and 6-month warranty."
      },
      {
        question: "Do you repair phones from all brands near Coburg?",
        answer: "Yes! We repair iPhones (all models), Samsung Galaxy phones, Google Pixel, iPad, Apple Watch, and MacBooks. We also handle less common brands. Serving Coburg, Brunswick, Pascoe Vale, and the wider Moreland area."
      },
      {
        question: "How much does an iPad screen replacement cost?",
        answer: "iPad screen replacement prices vary by model. iPad Mini, Air, Pro, and standard iPads all have different pricing. Call us on 0405-326-205 for an instant quote. We offer competitive rates and all repairs come with a 6-month warranty."
      }
    ],
    intro: "Looking for phone repair near Coburg? Mobile Armour at Warringal Shopping Centre, Heidelberg, serves the Coburg, Brunswick, and Moreland communities with professional mobile repair services. While Sydney Road has a few repair options, Coburg residents increasingly choose Mobile Armour for our combination of certified expertise, premium parts, and a genuine 6-month warranty that gives real peace of mind.",
    serviceHighlights: "Coburg residents visit Mobile Armour for iPhone screen and battery replacements, Samsung Galaxy repairs, iPad screen and battery servicing, MacBook and laptop repairs, Apple Watch screen replacements, and specialised services like back glass replacement and water damage recovery. We're one of the few repair shops in Melbourne's north that can handle the full range of Apple, Samsung, and Google devices.",
    whyChooseUs: "Coburg locals appreciate Mobile Armour's honest, transparent approach to phone repair. We'll always tell you exactly what's wrong with your device and what it will cost before starting work. Our 6-month warranty means if anything goes wrong, we'll fix it at no extra charge. The drive from Coburg to Heidelberg takes about 15 minutes via Bell Street, and free parking at Warringal Shopping Centre makes the visit convenient."
  },
  {
    name: "Ivanhoe",
    slug: "ivanhoe",
    postcode: "3079",
    lat: -37.7690,
    lng: 145.0440,
    distance: "2 km",
    driveTime: "5 minutes",
    nearbySuburbs: ["Eaglemont", "Heidelberg", "Fairfield", "Kew", "Alphington"],
    landmarks: ["Ivanhoe shops", "Ivanhoe Library", "Darebin Parklands", "Upper Heidelberg Road"],
    faqs: [
      {
        question: "Where is the closest phone repair shop to Ivanhoe?",
        answer: "Mobile Armour at Warringal Shopping Centre is just 5 minutes from Ivanhoe — we're your nearest certified phone repair shop. Located on Burgundy Street in Heidelberg, we offer same-day repairs for all major devices."
      },
      {
        question: "Can I walk to Mobile Armour from Ivanhoe station?",
        answer: "It's a short drive from Ivanhoe, but if you prefer public transport, you can catch a bus from Ivanhoe to Warringal Shopping Centre in about 10 minutes. The store is at Kiosk 4 on the ground level of the shopping centre."
      },
      {
        question: "Do you sell phone accessories near Ivanhoe?",
        answer: "Yes! Mobile Armour stocks a wide range of phone accessories including cases, screen protectors, chargers, cables, car mounts, and power banks. We carry accessories for iPhone, Samsung, and other popular brands. Drop in and browse our collection."
      }
    ],
    intro: "Need phone repair in Ivanhoe? Mobile Armour at Warringal Shopping Centre in neighbouring Heidelberg is your closest certified repair shop — just 5 minutes away. Ivanhoe residents enjoy the convenience of having expert phone repair right in their backyard. Whether you've cracked your screen near the Darebin Parklands or your battery died while shopping on Upper Heidelberg Road, we'll have your device back in your hands within 30-60 minutes.",
    serviceHighlights: "As the closest suburb to our store, Ivanhoe residents make up a significant part of our customer base. Popular services include iPhone screen and battery replacements, Samsung Galaxy repairs, iPad servicing, Apple Watch screen and battery repair, MacBook diagnostics and repair, and a full range of phone accessories for all brands. We also offer screen protector installation while you wait.",
    whyChooseUs: "Ivanhoe residents are our neighbours, and we treat every device with the care it deserves. Our certified technicians provide fast, reliable repairs using premium components, backed by a 6-month warranty. Being just 5 minutes from Ivanhoe means we're incredibly convenient — you can drop your phone off and grab a coffee at the shopping centre while we work. Many Ivanhoe locals have been coming to us for years because of our consistent quality and honest service."
  },
  {
    name: "Rosanna",
    slug: "rosanna",
    postcode: "3084",
    lat: -37.7417,
    lng: 145.0664,
    distance: "1.5 km",
    driveTime: "3-5 minutes",
    nearbySuburbs: ["Heidelberg", "Macleod", "Viewbank", "Eaglemont", "Watsonia"],
    landmarks: ["Rosanna Station", "Rosanna Village shops", "Rosanna Parklands"],
    faqs: [
      {
        question: "What's the closest phone repair to Rosanna?",
        answer: "Mobile Armour at Warringal Shopping Centre is just 3-5 minutes from Rosanna — we share the same postcode (3084). We're the nearest certified phone repair shop to Rosanna Station and Rosanna Village."
      },
      {
        question: "Can I drop off my phone before work in Rosanna?",
        answer: "Absolutely! We're open from 9:30am and most repairs take 30-60 minutes. Many Rosanna commuters drop off their phone on the way to work and pick it up on their way home. Call 0405-326-205 to arrange your drop-off."
      },
      {
        question: "Do you do back glass replacement for iPhones near Rosanna?",
        answer: "Yes! We offer iPhone back glass replacement for iPhone 11 and newer models. This is a specialised repair that many shops can't do, but our certified technicians handle it regularly. The repair typically takes 60-90 minutes."
      }
    ],
    intro: "Phone repair in Rosanna couldn't be more convenient — Mobile Armour at Warringal Shopping Centre is just 3 minutes from Rosanna Village. Sharing the same postcode (3084), we're essentially your local phone repair shop. Rosanna residents enjoy the shortest trip of any suburb to our store, making us the obvious choice for quick same-day repairs. From cracked iPhone screens to Samsung battery issues, we handle it all with certified expertise.",
    serviceHighlights: "Rosanna residents enjoy quick access to our full range of services: iPhone screen and battery replacements for all models, Samsung Galaxy repairs, iPad screen and battery servicing, Apple Watch repairs, MacBook diagnostics, charging port fixes, back glass replacement, water damage recovery, and a wide selection of phone accessories and cases.",
    whyChooseUs: "As Rosanna's nearest repair shop, we've built strong relationships with local residents who appreciate our quality and convenience. Our 6-month warranty, transparent pricing, and certified technicians mean you always know what you're getting. Many Rosanna locals tell us they tried other repair shops before finding us, and haven't looked back since. The 3-minute drive to Warringal Shopping Centre makes us an easy choice."
  },
  {
    name: "Bulleen",
    slug: "bulleen",
    postcode: "3105",
    lat: -37.7681,
    lng: 145.0856,
    distance: "4 km",
    driveTime: "8-10 minutes",
    nearbySuburbs: ["Templestowe", "Doncaster", "Heidelberg", "Ivanhoe", "Kew East"],
    landmarks: ["Bulleen Plaza", "Heide Museum", "Bulleen Art & Garden", "Yarra River trail"],
    faqs: [
      {
        question: "Where can I get my phone fixed near Bulleen?",
        answer: "Mobile Armour at Warringal Shopping Centre in Heidelberg is just 8-10 minutes from Bulleen via Manningham Road or Banksia Street. We're the closest certified phone repair shop to the Bulleen area."
      },
      {
        question: "Do you repair cracked screens for all phone brands near Bulleen?",
        answer: "Yes! We repair cracked screens for iPhone (all models), Samsung Galaxy, Google Pixel, and iPad. Screen replacements are our most common repair and typically take 30-45 minutes. All repairs come with a 6-month warranty."
      },
      {
        question: "Can I buy phone cases near Bulleen?",
        answer: "Mobile Armour stocks a great range of phone cases, screen protectors, chargers, and accessories for all major brands. Our Heidelberg store is just 8 minutes from Bulleen — come browse our collection."
      }
    ],
    intro: "Need phone repair near Bulleen? Mobile Armour at Warringal Shopping Centre, Heidelberg, is just 8-10 minutes from Bulleen via Manningham Road. We serve the Bulleen, Templestowe, and Kew East communities with expert mobile device repairs. Whether you've dropped your phone near the Yarra River trail or cracked your screen at Bulleen Plaza, our certified technicians will have your device back to you in under an hour.",
    serviceHighlights: "Bulleen residents come to Mobile Armour for iPhone and Samsung screen repairs, battery replacements, iPad servicing, Google Pixel repairs, Apple Watch screen and battery replacement, and a full range of accessories. We also handle specialised repairs like charging port fixes, camera lens replacement, and back glass repair for newer iPhones.",
    whyChooseUs: "Bulleen residents appreciate that Mobile Armour is so close — just 8 minutes via Banksia Street. Our combination of certified technicians, premium parts, competitive pricing, and a 6-month warranty sets us apart from the larger chain stores. We offer a personalised experience where you can speak directly with the technician working on your device."
  },
  {
    name: "Templestowe",
    slug: "templestowe",
    postcode: "3106",
    lat: -37.7500,
    lng: 145.1167,
    distance: "7 km",
    driveTime: "12-15 minutes",
    nearbySuburbs: ["Bulleen", "Doncaster", "Lower Templestowe", "Eltham", "Warrandyte"],
    landmarks: ["The Pines Shopping Centre", "Westerfolds Park", "Templestowe Village"],
    faqs: [
      {
        question: "Is there a good phone repair shop near Templestowe?",
        answer: "Mobile Armour at Warringal Shopping Centre, Heidelberg, is about 12-15 minutes from Templestowe. We're highly rated by Manningham residents for our certified same-day repairs and 6-month warranty."
      },
      {
        question: "Do you repair Google Pixel phones near Templestowe?",
        answer: "Yes! We repair all Google Pixel models including Pixel 10, 9, 8, 7, and 6 series. Screen replacements, battery swaps, and other repairs are available. Authorised Google Pixel repair is hard to find — we're one of the few shops in Melbourne's east that handles Pixel repairs."
      },
      {
        question: "Can I get my phone screen protector installed at Mobile Armour?",
        answer: "Absolutely! We offer professional screen protector installation for all devices. Choose from tempered glass, privacy, or anti-glare options. Installation takes just 5-10 minutes and ensures a perfect, bubble-free fit."
      }
    ],
    intro: "Looking for phone repair near Templestowe? Mobile Armour at Warringal Shopping Centre, Heidelberg, serves the Templestowe, Lower Templestowe, and wider Manningham community. Located about 12-15 minutes away via Manningham Road, we offer expert same-day repairs for iPhones, Samsung devices, iPads, Google Pixels, and Apple Watches. Templestowe residents who value quality and warranty trust us for all their device repair needs.",
    serviceHighlights: "Templestowe and Manningham residents visit Mobile Armour for comprehensive device servicing: iPhone screen and battery repairs, Samsung Galaxy servicing, iPad screen replacements, Google Pixel repairs (including hard-to-find authorised service), Apple Watch repairs, MacBook diagnostics, and a range of accessories. We use premium components and provide detailed diagnostics before every repair.",
    whyChooseUs: "Templestowe locals choose Mobile Armour for the same reasons as other Manningham residents: we offer a personal, transparent service that the big chains simply can't match. Our 6-month warranty covers all repairs, and our certified technicians use only premium-grade parts. The drive from Templestowe to Warringal Shopping Centre is straightforward via Manningham Road, with free parking waiting for you."
  },
];

export function getSuburbBySlug(slug: string): SuburbData | undefined {
  return locationPages.find((s) => s.slug === slug);
}

export function getAllSuburbSlugs(): string[] {
  return locationPages.map((s) => s.slug);
}
