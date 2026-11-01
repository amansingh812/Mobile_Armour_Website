"use client";

import { useEffect, useRef, useState } from "react";
import { BUSINESS } from "@/data/business";
import { track } from "@/lib/analytics";

const STORAGE = ["Not sure", "64GB", "128GB", "256GB", "512GB", "1TB"];
const CONDITION = ["No preference", "Best condition", "Best price"];
const CONTACT = ["Call", "Text", "WhatsApp", "Email"];

/** wa.me needs the number in international format without the leading 0. */
const WHATSAPP = `https://wa.me/${BUSINESS.phoneIntl.replace(/^\+/, "")}`;
const SMS = `sms:${BUSINESS.phoneIntl}`;

/** Event the model finder fires to pre-fill this form. */
export const REFURB_ASK_EVENT = "ma-refurb-ask";

export default function RefurbEnquiry({ models, defaultModel = "" }: { models: string[]; defaultModel?: string }) {
  const [model, setModel] = useState(defaultModel);
  const [contact, setContact] = useState("Text");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = (e: Event) => {
      const m = (e as CustomEvent<{ model: string }>).detail?.model;
      if (m) setModel(m);
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener(REFURB_ASK_EVENT, on);
    return () => window.removeEventListener(REFURB_ASK_EVENT, on);
  }, []);

  const hello = `Hi Mobile Armour, do you have a refurbished ${model || "phone"}?`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("company")) return; // honeypot
    setStatus("sending");
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = [
      `Refurbished phone enquiry`,
      `Model: ${model || "Not sure"}`,
      `Storage: ${fd.get("storage")}`,
      `Condition: ${fd.get("condition")}`,
      fd.get("budget") ? `Budget: ${String(fd.get("budget")).trim()}` : "",
      `Contact by: ${contact}`,
      String(fd.get("message") || "").trim(),
    ]
      .filter(Boolean)
      .join("\n");
    try {
      const res = await fetch("/api/send-lead-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "REFURB_ENQUIRY", data: { name, phone, email, model, message } }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("generate_lead", { lead_type: "refurbished_phone", item_name: model || "not sure" });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="ma-refurb-ask" id="enquire" ref={ref}>
      <div className="ma-refurb-ask__quick">
        <h2 className="ma-h2">Ask what&apos;s in stock</h2>
        <p className="ma-lead">
          Stock changes daily. Tell us the model, storage and your budget and we&apos;ll tell you what we have or can
          get. No obligation.
        </p>
        <div className="ma-refurb-ask__btns">
          <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--primary">
            Call {BUSINESS.phoneDisplay}
          </a>
          <a href={`${SMS}?&body=${encodeURIComponent(hello)}`} className="ma-btn ma-btn--outline">
            Text us
          </a>
          <a href={`${WHATSAPP}?text=${encodeURIComponent(hello)}`} className="ma-btn ma-btn--outline" target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a
            href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Refurbished ${model || "phone"}`)}&body=${encodeURIComponent(hello)}`}
            className="ma-btn ma-btn--outline"
          >
            Email
          </a>
        </div>
        <p className="ma-refurb-ask__visit">
          Or visit {BUSINESS.address.unit}, {BUSINESS.address.centre}, Heidelberg, open 7 days.
        </p>
      </div>

      {status === "sent" ? (
        <div className="ma-form-done" role="status">
          <span className="ma-form-done__tick" aria-hidden="true">
            ✓
          </span>
          <h3>Thanks, we&apos;ve got your enquiry</h3>
          <p>
            We&apos;ll get back to you during opening hours, usually the same day. Need it sooner? Call{" "}
            <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.
          </p>
          <button type="button" className="ma-btn ma-btn--outline" onClick={() => setStatus("idle")}>
            Ask about another phone
          </button>
        </div>
      ) : (
        <form className="ma-form" onSubmit={onSubmit}>
          <div className="ma-form__grid">
            <label className="ma-field ma-field--full">
              <span>Which phone?</span>
              <input
                name="model"
                list="ma-refurb-models"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. iPhone 15 Pro or Galaxy S24"
                autoComplete="off"
                maxLength={80}
              />
              <datalist id="ma-refurb-models">
                {models.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </label>
            <label className="ma-field">
              <span>Storage</span>
              <select name="storage" defaultValue="Not sure">
                {STORAGE.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="ma-field">
              <span>Condition</span>
              <select name="condition" defaultValue="No preference">
                {CONDITION.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="ma-field ma-field--full">
              <span>
                Budget <em>(optional)</em>
              </span>
              <input name="budget" placeholder="e.g. around $500" maxLength={40} />
            </label>
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
            <fieldset className="ma-field ma-field--full">
              <legend>How should we reply?</legend>
              <div className="ma-chips">
                {CONTACT.map((c) => (
                  <label key={c} className={`ma-chip ma-chip--sm${contact === c ? " is-on" : ""}`}>
                    <input type="radio" name="contact" className="ma-sr" checked={contact === c} onChange={() => setContact(c)} />
                    {c}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="ma-field ma-field--full">
              <span>
                Anything else? <em>(optional)</em>
              </span>
              <textarea name="message" rows={3} placeholder="e.g. colour, or when you need it by" maxLength={1000} />
            </label>
            <label className="ma-hp" aria-hidden="true">
              Company
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <p className="ma-form__privacy">We only use your details to reply to this enquiry.</p>
          {status === "error" && (
            <p className="ma-form__error" role="alert">
              Sorry, that didn&apos;t send. Please call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a> or text us.
            </p>
          )}
          <button type="submit" className="ma-btn ma-btn--primary ma-form__submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Check availability"}
          </button>
        </form>
      )}
    </div>
  );
}
