import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { BUSINESS } from "@/data/business";

// Products and phone lists refresh from the database at most once an hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Phone Repairs & Accessories Heidelberg | Mobile Armour",
  description: `Phone repairs and accessories at Warringal Shopping Centre, Heidelberg. Most repairs in ${BUSINESS.repairTimes.common} with a ${BUSINESS.warranty.short}. Cases and glass to take home today.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
