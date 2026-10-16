"use client";

import { useEffect, useState } from "react";
import { BUSINESS, DAYS, formatTime } from "@/data/business";

function melbourneNow() {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: BUSINESS.timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value || "";
  return { day: get("weekday"), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "Open now · closes 5:30 pm" badge, worked out in Melbourne time. */
export function OpenNowBadge() {
  const [label, setLabel] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    const update = () => {
      const now = melbourneNow();
      const today = BUSINESS.hours.find((h) => h.day === now.day);
      if (today && now.minutes >= toMin(today.opens) && now.minutes < toMin(today.closes)) {
        setLabel({ open: true, text: `Open now · closes ${formatTime(today.closes)}` });
        return;
      }
      const idx = DAYS.indexOf(now.day as (typeof DAYS)[number]);
      const before = today && now.minutes < toMin(today.opens);
      const next = before ? today : BUSINESS.hours.find((h) => h.day === DAYS[(idx + 1) % 7]);
      setLabel({
        open: false,
        text: next ? `Closed · opens ${before ? "today" : next.day} ${formatTime(next.opens)}` : "Closed now",
      });
    };
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  if (!label) return <span className="ma-open ma-open--pending">Opening hours</span>;
  return <span className={`ma-open${label.open ? " is-open" : ""}`}>● {label.text}</span>;
}

/** Hours table with today highlighted (in Melbourne time). */
export function HoursTable() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(melbourneNow().day), []);
  return (
    <table className="ma-hours">
      <caption className="ma-sr">Opening hours</caption>
      <tbody>
        {BUSINESS.hours.map((h) => (
          <tr key={h.day} className={h.day === today ? "is-today" : undefined}>
            <th scope="row">
              {h.day}
              {h.day === today ? " (today)" : ""}
            </th>
            <td>
              <time dateTime={h.opens}>{formatTime(h.opens)}</time> – <time dateTime={h.closes}>{formatTime(h.closes)}</time>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
