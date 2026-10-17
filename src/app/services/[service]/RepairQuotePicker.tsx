'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BUSINESS } from '@/data/business';

export default function RepairQuotePicker({
  service,
  models,
  modelPages,
}: {
  service: string;
  models: string[];
  /** model name → /repairs/... path, for models with their own page */
  modelPages: Record<string, string>;
}) {
  const [model, setModel] = useState(models[0] || '');
  const page = modelPages[model];
  return (
    <div className="ma-quote">
      <h2>Get a repair quote</h2>
      <p>Choose your model and we&apos;ll confirm the price and time before any work starts.</p>
      <label className="ma-field">
        <span>Your model</span>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          {models.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <div className="ma-quote__out" aria-live="polite">
        <strong>
          {model} {service.toLowerCase().replace(/^(iphone|samsung|google pixel|ipad|apple watch) /i, '')}
        </strong>
        <span>Price: quoted for your exact model · Typically same day · {BUSINESS.warranty.short}</span>
      </div>
      <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--primary">
        Call for a quote: {BUSINESS.phoneDisplay}
      </a>
      <Link href={`/contact?topic=repair`} className="ma-btn ma-btn--outline">
        Send us your model
      </Link>
      {page && (
        <Link href={page} className="ma-link">
          All {model} repairs →
        </Link>
      )}
    </div>
  );
}
