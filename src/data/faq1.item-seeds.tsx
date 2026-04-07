export interface IFaqItemData {
  id: string;
  question: string;
  answer: string;
}

export const FaqItemData: IFaqItemData[] = [
  {
    id: "One",
    question: "How many days it'll take to repair broken screen?",
    answer:
      "Most common repairs (screen, battery, charging port) take 1-2 hours. Water damage or complex issues may require 24-48 hours for proper diagnosis and service. We offer express 90-minute service for select repairs.",
  },
  {
    id: "Two",
    question: "Do you offer a warranty on repairs?",
    answer:
      "Yes! All repairs come with a 1-year warranty covering both parts and labor. If an issue recurs, we’ll fix it for free. (Excludes physical damage or liquid exposure post-service).",
  },
  {
    id: "Three",
    question: "Are your parts genuine?",
    answer:
      "Yes! We are an Apple Authorised Repair Provider, which means we use genuine Apple parts for all iPhone, iPad, and Apple Watch repairs. Our IRP certified technicians are trained to Apple's standards. For Samsung and other brands, we use OEM-equivalent or premium-grade parts that match manufacturer quality.",
  },
  {
    id: "Four",
    question: "Can you fix water-damaged phones?",
    answer:
      "Yes, if addressed quickly! We disassemble, clean corrosion, and replace damaged components. Success depends on water type (fresh/salt) and how long the device was exposed. Bring it in ASAP for the best chance of recovery.",
  },
  {
    id: "Five",
    question: "Will my data be safe during service?",
    answer:
      "Absolutely. We never access your data unless requested (e.g., data recovery). For privacy, we recommend backing up your device before service.",
  },
];
