import type { Metadata } from "next";
import Home1 from "./home1/page";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};


export default function Home() {
  return (
    <div>
      <Home1 />
    </div>
  );
}
