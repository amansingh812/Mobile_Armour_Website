import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { BUSINESS } from "@/data/business";

// Products and phone lists refresh from the database at most once an hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Phone Repairs & Accessories Heidelberg | Mobile Armour, Warringal Shopping Centre",
  description: `Phone repairs and accessories at Warringal Shopping Centre, Heidelberg. Screens, batteries and charging ports done in ${BUSINESS.repairTimes.common} with a ${BUSINESS.warranty.short}. Cases, screen protectors and chargers to collect today or delivered.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
