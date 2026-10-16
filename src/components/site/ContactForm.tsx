"use client";

import { useEffect, useState } from "react";
import { BUSINESS } from "@/data/business";

type Topic = "repair" | "product" | "order" | "business";

const TOPICS: { id: Topic; label: string; msgLabel: string; hint: string }[] = [
  { id: "repair", label: "Repair quote", msgLabel: "Anything else we should know?", hint: "e.g. dropped it yesterday, the glass is cracked but the screen still works" },
  { id: "product", label: "Product question", msgLabel: "Which product and phone?", hint: "e.g. do you have a MagSafe case for the iPhone 17 Pro Max?" },
  { id: "order", label: "Order or collection", msgLabel: "Your order number and question", hint: "e.g. order #1042, can I collect it this afternoon?" },
  { id: "business", label: "Business repairs", msgLabel: "Tell us about your devices", hint: "e.g. 12 staff iPhones, we need one monthly invoice" },
];

const ISSUES = ["Screen", "Battery", "Charging", "Water damage", "Camera", "Other"];
const BRANDS = ["Apple", "Samsung", "Google Pixel", "Xiaomi", "OnePlus", "Other"];

// Same Google Sheet the old contact form wrote to, so enquiries keep landing
// in one place.
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycby6QqWh0-AJ-YETsbPYHtwPmmLxN5QjkVCgFycAxaxrmQNmr1tXpHGohLCMt_sCZixU/exec";

export default function ContactForm() {
  const [topic, setTopic] = useState<Topic>("repair");
  const [issues, setIssues] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && TOPICS.some((x) => x.id === t)) setTopic(t as Topic);
  }, []);

  const cur = TOPICS.find((t) => t.id === topic)!;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("company")) return; // honeypot: bots fill hidden fields
    setStatus("sending");

    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const brand = topic === "repair" ? String(fd.get("brand") || "") : "";
    const model = topic === "repair" ? String(fd.get("model") || "").trim() : "";
    const message = [
      `Topic: ${cur.label}`,
      issues.length && topic === "repair" ? `Issue: ${issues.join(", ")}` : "",
      String(fd.get("message") || "").trim(),
    ]
      .filter(Boolean)
      .join("\n");

    let emailed = false;
    let sheeted = false;
    try {
      const res = await fetch("/api/send-lead-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "CONTACT", data: { name, phone, email, brand, model, message } }),
      });
      emailed = res.ok;
    } catch {
      emailed = false;
    }
    try {
      const sheet = new URLSearchParams();
      sheet.append("DATE", new Date().toLocaleDateString("en-CA"));
      sheet.append("NAME", name);
      sheet.append("PHONE", phone);
      sheet.append("EMIAL", email); // column name in the existing sheet
      sheet.append("BRAND", brand || cur.label);
      sheet.append("MODEL", model);
      sheet.append("DESCRIPTION", message);
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: sheet.toString(),
      });
      sheeted = true;
    } catch {
      sheeted = false;
    }

    if (emailed || sheeted) {
      setStatus("sent");
      form.reset();
      setIssues([]);
    } else {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="ma-form-done" role="status">
        <span className="ma-form-done__tick" aria-hidden="true">
          ✓
        </span>
        <h2>Thanks, message sent</h2>
        <p>
          We&apos;ll reply by text or email during opening hours. Need it sooner? Call{" "}
          <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a> or just walk in.
        </p>
        <button type="button" className="ma-btn ma-btn--outline" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="ma-form" onSubmit={onSubmit} noValidate={false}>
      <div>
        <h2 className="ma-form__title">Send us a message</h2>
        <p className="ma-form__sub">We reply during opening hours, usually the same day.</p>
      </div>

      <fieldset className="ma-form__topics">
        <legend>What can we help with?</legend>
        <div className="ma-chips">
          {TOPICS.map((t) => (
            <label key={t.id} className={`ma-chip${topic === t.id ? " is-on" : ""}`}>
              <input
                type="radio"
                name="topic"
                value={t.id}
                checked={topic === t.id}
                onChange={() => setTopic(t.id)}
                className="ma-sr"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      {topic === "repair" && (
        <div className="ma-form__grid">
          <label className="ma-field">
            <span>Phone brand</span>
            <select name="brand" defaultValue="Apple">
              {BRANDS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="ma-field">
            <span>Model</span>
            <input name="model" placeholder="e.g. iPhone 15 Pro" autoComplete="off" />
          </label>
          <fieldset className="ma-field ma-field--full">
            <legend>What&apos;s wrong?</legend>
            <div className="ma-chips">
              {ISSUES.map((i) => {
                const on = issues.includes(i);
                return (
                  <label key={i} className={`ma-chip ma-chip--sm${on ? " is-on" : ""}`}>
                    <input
                      type="checkbox"
                      className="ma-sr"
                      checked={on}
                      onChange={() => setIssues((s) => (on ? s.filter((x) => x !== i) : [...s, i]))}
                    />
                    {i}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      )}

      <div className="ma-form__grid">
        <label className="ma-field">
          <span>Name</span>
          <input name="name" required autoComplete="name" maxLength={80} />
        </label>
        <label className="ma-field">
          <span>Mobile number</span>
          <input name="phone" type="tel" required autoComplete="tel" maxLength={20} inputMode="tel" />
        </label>
        <label className="ma-field ma-field--full">
          <span>
            Email <em>(optional)</em>
          </span>
          <input name="email" type="email" autoComplete="email" maxLength={120} />
        </label>
        <label className="ma-field ma-field--full">
          <span>{cur.msgLabel}</span>
          <textarea name="message" rows={4} placeholder={cur.hint} maxLength={2000} />
        </label>
        <label className="ma-hp" aria-hidden="true">
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="ma-form__privacy">We only use your details to reply to this message.</p>

      {status === "error" && (
        <p className="ma-form__error" role="alert">
          Sorry, that didn&apos;t send. Please call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a> or email{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
        </p>
      )}

      <button type="submit" className="ma-btn ma-btn--primary ma-form__submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
