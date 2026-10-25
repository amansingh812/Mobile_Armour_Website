// FAQ content shared by /faq, /services and /contact, and by their
// FAQPage JSON-LD. Each answer opens with one sentence that answers the
// question on its own, so Google and AI engines can quote it directly.
// Only facts already stated on the site are used here.

import { BUSINESS, fullAddress, hoursSummary } from "@/data/business";

export interface Faq {
  id: string;
  q: string;
  /** First sentence: the direct answer. */
  short: string;
  /** Supporting detail. */
  more?: string;
  link?: { label: string; href: string };
}

export interface FaqGroup {
  id: string;
  title: string;
  items: Faq[];
}

const W = BUSINESS.warranty;

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "repairs",
    title: "Repairs",
    items: [
      {
        id: "repair-time",
        q: "How long does a phone screen repair take?",
        short: `Most screen repairs take ${BUSINESS.repairTimes.common}.`,
        more: `Batteries and charging ports take about the same. Water damage or complex faults can need ${BUSINESS.repairTimes.complex} for diagnosis and repair. ${BUSINESS.repairTimes.express}`,
        link: { label: "iPhone screen repair", href: "/services/iphone-screen-repair" },
      },
      {
        id: "appointment",
        q: "Do I need an appointment?",
        short: "No, walk-ins are welcome.",
        more: `Come to ${BUSINESS.address.unit}, ${BUSINESS.address.centre} any time we're open. Sending us your model first means we can have the part ready.`,
        link: { label: "Send us your model", href: "/contact?topic=repair" },
      },
      {
        id: "water-damage",
        q: "Can you fix a water-damaged phone?",
        short: "Often yes, if you bring it in quickly.",
        more: "We open the phone, clean corrosion and replace damaged parts. Success depends on the type of liquid and how long the phone was wet. Don't charge it before you come in.",
        link: { label: "Water damage repair", href: "/services/water-damage-repair" },
      },
      {
        id: "data",
        q: "Will my data be safe during the repair?",
        short: "Yes, we don't access your data unless you ask us to.",
        more: "The only exception is when you ask for data recovery. We still recommend backing up your phone before any repair.",
      },
      {
        id: "brands",
        q: "Which phones and devices do you repair?",
        short: "iPhone, Samsung Galaxy, Google Pixel, iPad and Apple Watch, plus many other brands.",
        more: `Not sure about your model? Call ${BUSINESS.phoneDisplay} and we'll tell you straight away.`,
        link: { label: "All repair services", href: "/services" },
      },
    ],
  },
  {
    id: "warranty",
    title: "Warranty and parts",
    items: [
      {
        id: "warranty-cover",
        q: "Do you offer a warranty on repairs?",
        short: `Yes, every repair comes with a ${W.long}.`,
        more: "If the same fault comes back, we fix it free. The warranty doesn't cover new drops, cracks or liquid damage after the repair.",
      },
      {
        id: "parts",
        q: "Are your parts original (OEM)?",
        short: "We use OEM-equivalent or premium-grade parts.",
        more: "For screens you can choose an original part when one is available, or a high-quality aftermarket screen. We explain the difference and the price before you decide.",
      },
      {
        id: "face-id",
        q: "Will Face ID still work after an iPhone screen repair?",
        short: "Yes. Face ID sits in the front sensor, not the screen.",
        more: "We test Face ID, touch and the cameras before handing your phone back.",
        link: { label: "iPhone screen repair", href: "/services/iphone-screen-repair" },
      },
      {
        id: "authorised",
        q: "Are you an Apple authorised repairer?",
        short: "No, Mobile Armour is an independent repairer.",
        more: `We're not affiliated with or authorised by Apple, Samsung or any other manufacturer. Our repairs carry our own ${W.short}.`,
      },
    ],
  },
  {
    id: "prices",
    title: "Prices",
    items: [
      {
        id: "screen-cost",
        q: "How much does a phone screen repair cost?",
        short: "It depends on your model and the screen you choose, so we quote each phone individually.",
        more: `Call ${BUSINESS.phoneDisplay} with your exact model for a quote. Every price includes fitting and the ${W.short}.`,
        link: { label: "Ask for a quote", href: "/contact?topic=repair" },
      },
      {
        id: "quote",
        q: "Can I get a repair quote over the phone?",
        short: "Yes, for most screen, battery and charging-port repairs.",
        more: "Tell us your exact model. We confirm the final price after a quick check in store, before any work starts.",
        link: { label: "Ask for a quote", href: "/contact?topic=repair" },
      },
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    items: [
      {
        id: "accessories",
        q: "Do you sell phone cases and screen protectors?",
        short: "Yes, we sell cases, screen protectors, chargers, cables and car holders in store and online.",
        more: "Buy online, or come to the kiosk and see them in person before you buy.",
        link: { label: "Shop accessories", href: "/products" },
      },
      {
        id: "fit",
        q: "How do I know a case will fit my phone?",
        short: "Each product lists the exact phone models it fits.",
        more: `Not sure? Bring your phone to the kiosk and we'll check the fit for you, or call ${BUSINESS.phoneDisplay}.`,
        link: { label: "Phone cases", href: "/shop/cases" },
      },
    ],
  },
  {
    id: "visiting",
    title: "Visiting us",
    items: [
      {
        id: "where",
        q: "Where is Mobile Armour?",
        short: `We're at ${fullAddress}.`,
        more: "We're a kiosk inside the shopping centre, so you can shop while your phone is repaired.",
        link: { label: "Directions and map", href: "/contact#find-us" },
      },
      {
        id: "hours",
        q: "What are your opening hours?",
        short: `${hoursSummary()}.`,
        more: "Hours can change on public holidays; we post any changes on our Google profile.",
        link: { label: "Contact and hours", href: "/contact" },
      },
      {
        id: "areas",
        q: "Which suburbs do you serve?",
        short: "Customers visit us from Heidelberg and across Melbourne's north and north-east.",
        more: "That includes Ivanhoe, Rosanna, Bulleen, Templestowe, Preston, Greensborough, Bundoora, Doncaster, Eltham, Reservoir and Northcote.",
      },
    ],
  },
];

export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);

export function faqsById(ids: string[]): Faq[] {
  return ids.map((id) => ALL_FAQS.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));
}

/** Plain-text answer for JSON-LD. */
export function faqAnswerText(f: Faq): string {
  return f.more ? `${f.short} ${f.more}` : f.short;
}
