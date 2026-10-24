// Single source of truth for Mobile Armour's business facts.
// Every page, the header/footer and all JSON-LD read from here, so a change
// (new hours, new phone number) is made once and stays consistent for
// Google, ChatGPT and other AI answer engines.
//
// Hours and warranty confirmed by the owner on 24 Oct 2026.

import { SITE_URL } from "@/lib/site";

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningHours {
  day: Day;
  opens: string; // 24h "HH:MM"
  closes: string;
}

export const DAYS: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const BUSINESS = {
  name: "Mobile Armour",
  legalDescription:
    "Independent device repairer, not affiliated with or authorised by any device manufacturer.",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo-22.png`,
  image: `${SITE_URL}/img/og-image.jpg`,
  phoneDisplay: "0405 326 205",
  phoneHref: "tel:0405326205",
  phoneIntl: "+61405326205",
  email: "repair@mobilearmour.com.au",
  address: {
    unit: "Kiosk 4",
    centre: "Warringal Shopping Centre",
    street: "56 Burgundy Street",
    streetShort: "56 Burgundy St",
    suburb: "Heidelberg",
    state: "VIC",
    postcode: "3084",
    country: "AU",
  },
  geo: { lat: -37.7547, lng: 145.0603 },
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=MOBILE+ARMOUR+-+Phone+Repair+Specialist,+Warringal+Shopping+Centre,+Heidelberg+VIC+3084",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.462652365058!2d145.06878609999998!3d-37.75574869999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad647c89707795f%3A0x2ce576275e4b8085!2sMOBILE%20ARMOUR%20-%20Phone%20Repair%20Specialist!5e0!3m2!1sen!2sau!4v1761033751415!5m2!1sen!2sau",
  timeZone: "Australia/Melbourne",
  hours: DAYS.map((day) => ({ day, opens: day === "Sunday" ? "10:00" : "09:00", closes: "17:00" })) as OpeningHours[],
  warranty: {
    short: "6-month warranty",
    long: "6-month warranty on parts and labour",
  },
  repairTimes: {
    common: "about 1–2 hours",
    complex: "24–48 hours",
    express: "Express 90-minute service is available for some repairs.",
  },
  sameAs: [
    "https://www.facebook.com/people/Mobile-Armour/61577763766480/",
    "https://www.instagram.com/mobilearm0ur/",
    "https://tiktok.com/@mobilearmourau",
  ],
} as const;

export const fullAddress = `${BUSINESS.address.unit}, ${BUSINESS.address.centre}, ${BUSINESS.address.streetShort}, ${BUSINESS.address.suburb} ${BUSINESS.address.state} ${BUSINESS.address.postcode}`;

/** "9:30 am" from "09:30" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

const SHORT_DAY: Record<Day, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

/** Hours grouped by run of days, e.g. "Mon–Sat 9 am – 5 pm, Sun 10 am – 5 pm". */
export function hoursShort(): string {
  const runs: { from: Day; to: Day; opens: string; closes: string }[] = [];
  for (const h of BUSINESS.hours) {
    const last = runs[runs.length - 1];
    if (last && last.opens === h.opens && last.closes === h.closes) last.to = h.day;
    else runs.push({ from: h.day, to: h.day, opens: h.opens, closes: h.closes });
  }
  return runs
    .map((r) => {
      const days = r.from === r.to ? SHORT_DAY[r.from] : `${SHORT_DAY[r.from]}–${SHORT_DAY[r.to]}`;
      return `${days} ${formatTime(r.opens)} – ${formatTime(r.closes)}`;
    })
    .join(", ");
}

/** One-line summary, e.g. "Open 7 days: Mon–Sat 9 am – 5 pm, Sun 10 am – 5 pm". */
export function hoursSummary(): string {
  return BUSINESS.hours.length === 7 ? `Open 7 days: ${hoursShort()}` : hoursShort();
}

/** Suburbs with their own /phone-repair/[suburb] page, nearest first. */
export const SERVICE_AREAS: { name: string; slug?: string }[] = [
  { name: "Heidelberg" },
  { name: "Ivanhoe", slug: "ivanhoe" },
  { name: "Rosanna", slug: "rosanna" },
  { name: "Bulleen", slug: "bulleen" },
  { name: "Templestowe", slug: "templestowe" },
  { name: "Preston", slug: "preston" },
  { name: "Greensborough", slug: "greensborough" },
  { name: "Bundoora", slug: "bundoora" },
  { name: "Doncaster", slug: "doncaster" },
  { name: "Eltham", slug: "eltham" },
  { name: "Reservoir", slug: "reservoir" },
  { name: "Northcote", slug: "northcote" },
];

/** schema.org openingHoursSpecification grouped by identical hours. */
export function openingHoursSpecification() {
  const groups = new Map<string, Day[]>();
  for (const h of BUSINESS.hours) {
    const key = `${h.opens}-${h.closes}`;
    groups.set(key, [...(groups.get(key) || []), h.day]);
  }
  return Array.from(groups.entries()).map(([key, days]) => {
    const [opens, closes] = key.split("-");
    return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes };
  });
}
