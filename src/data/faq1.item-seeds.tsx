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
      "Most common repairs (screen, battery, charging port) take 1-2 hours. Water damage or complex issues may require 24-48 hours for proper diagnosis and repair. We offer express 90-minute service for select repairs.",
  },
  {
    id: "Two",
    question: "Do you offer a warranty on repairs?",
    answer:
      "Yes! All repairs come with a 1-year warranty covering both parts and labor. If an issue recurs, we’ll fix it for free. (Excludes physical damage or liquid exposure post-repair).",
  },
  {
    id: "Three",
    question: "Are your parts original (OEM)?",
    answer:
      "We use OEM-equivalent or premium-grade parts that match manufacturer quality. For screens, we offer both original (if available) and high-quality aftermarket options with perfect touch sensitivity.",
  },
  {
    id: "Four",
    question: "Can you fix water-damaged phones?",
    answer:
      "Yes, if addressed quickly! We disassemble, clean corrosion, and replace damaged components. Success depends on water type (fresh/salt) and how long the device was exposed. Bring it in ASAP for the best chance of recovery.",
  },
  {
    id: "Five",
    question: "Will my data be safe during repair?",
    answer:
      "Absolutely. We never access your data unless requested (e.g., data recovery). For privacy, we recommend backing up your device before service.",
  },
];
