/**
 * Real Google reviews for MOBILE ARMOUR - Phone Repair Specialist
 * (Warringal Shopping Centre), copied word for word from Google Maps on
 * 24 Oct 2026. Pick reviews from the listing only; never edit the wording
 * or write new ones.
 *
 * To swap one: open the Google reviews link in store-settings, copy the
 * name, star rating, month and text exactly.
 *
 * Note: Google does not allow review/rating schema markup built from
 * Google reviews on your own site, so these are shown but not marked up.
 */

export interface Review {
  name: string;
  rating: number;
  /** Month the review was posted, e.g. "Mar 2026". */
  date: string;
  /** What it was about, for the small tag on the card. */
  topic: string;
  text: string;
}

export const GOOGLE_REVIEWS: Review[] = [
  {
    name: "Alina Marquardt",
    rating: 5,
    date: "Mar 2026",
    topic: "Screen repair",
    text: "Came in today around 2:00pm and had the absolute best experience! My phone was very cracked to the point my screen had blacked out. I unfortunately didn’t catch their name but the worker who served me and fixed my phone is the absolute nicest person. Amazing service and really fair and affordable price. Will definitely be back in the future if I need. I highly recommend this place! I can finally use my phone again, Thank you so much!!",
  },
  {
    name: "Jack Ford",
    rating: 5,
    date: "Feb 2026",
    topic: "Honest advice",
    text: "Amazing service, super honest about my screen not being broken and saved me heaps of money if I’d gone to another place, would recommend this place to anyone! Will be back every time my phone goes kaput, couldn’t be happier :)",
  },
  {
    name: "Elenor Reid",
    rating: 5,
    date: "Mar 2026",
    topic: "Phone case",
    text: "Defender case is really protective. I dropped it yesterday from moving car and thank God I got what he recommended.  It saved my 17 pro Max",
  },
  {
    name: "jake buckley",
    rating: 5,
    date: "Jan 2026",
    topic: "Front & back glass",
    text: "Smashed both sides of my iPhone. Was about to shell out $3000 for a new one but decided to give mobile armour a visit. My phone feels new again. Happy customer!",
  },
  {
    name: "Shaki Prasanna",
    rating: 5,
    date: "May 2026",
    topic: "iPhone 15 Pro screen",
    text: "Sam got the job done but most importantly he was full of knowledge and helped explore all the different options with repairs on my iPhone 15 Pro and we went with an original service pack replacement screen and it’s exactly like what I would’ve got from Apple l! Will be back 👌🏾",
  },
  {
    name: "Shehani Fernando",
    rating: 5,
    date: "Oct 2025",
    topic: "Repair & accessories",
    text: "Great service! Got my phone repaired quickly and picked up a solid Beautiful case and charger. Friendly staff, fair prices, and good quality accessories. Highly recommend!",
  },
  {
    name: "Hayley Alex",
    rating: 5,
    date: "Aug 2026",
    topic: "iPhone 15 Pro",
    text: "got my smashed back and front screen replaced for my iphone 15 pro, is like new and only took 2 hours. amazing service :)",
  },
  {
    name: "Greg Vivas",
    rating: 5,
    date: "May 2026",
    topic: "iPad battery",
    text: "Sam was very responsive to my enquiry about getting the battery replaced in my iPad, he was very knowledgeable and professional got the job done promptly and at a fair price.",
  },
];
