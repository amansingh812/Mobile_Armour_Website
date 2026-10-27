'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type Status = 'paid' | 'ordered' | 'ready' | 'shipped' | 'completed' | 'cancelled' | 'refunded';
interface Item {
  name: string;
  quantity: number;
  unitPrice: number;
  sku?: string;
  orderIn?: boolean;
}
interface Order {
  _id: string;
  orderNumber: string;
  status: Status;
  fulfilment: 'collect' | 'delivery';
  customer: { name?: string; email?: string; phone?: string };
  shippingAddress?: { line1?: string; line2?: string; city?: string; state?: string; postcode?: string };
  items: Item[];
  total: number;
  shipping: number;
  trackingNumber?: string;
  notes?: string;
  paymentIntentId?: string;
  customerEmailSent?: boolean;
  createdAt: string;
}

const STATUS_LABEL: Record<Status, string> = {
  paid: 'Paid – to do',
  ordered: 'Ordered in',
  ready: 'Ready to collect',
  shipped: 'Shipped',
  completed: 'Completed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};
const STATUS_COLOUR: Record<Status, string> = {
  paid: '#e85d1f',
  ordered: '#8a5cf6',
  ready: '#1f8a4c',
  shipped: '#1f6feb',
  completed: '#666',
  cancelled: '#999',
  refunded: '#999',
};
const FILTERS: { key: string; label: string }[] = [
  { key: 'open', label: 'Open' },
  { key: 'paid', label: 'To do' },
  { key: 'ordered', label: 'Ordered in' },
  { key: 'ready', label: 'Ready' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'completed', label: 'Completed' },
  { key: '', label: 'All' },
];

const when = (iso: string) =>
  new Date(iso).toLocaleString('en-AU', {
    timeZone: 'Australia/Melbourne',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });

function OrderCard({ order, onSaved }: { order: Order; onSaved: (o: Order, msg: string) => void }) {
  const [status, setStatus] = useState<Status>(order.status);
  const [tracking, setTracking] = useState(order.trackingNumber || '');
  const [notes, setNotes] = useState(order.notes || '');
  const [saving, setSaving] = useState(false);
  const dirty = status !== order.status || tracking !== (order.trackingNumber || '') || notes !== (order.notes || '');
  const willEmail = status !== order.status && (status === 'ready' || status === 'shipped') && !!order.customer.email;
  const a = order.shippingAddress;

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order._id, status, trackingNumber: tracking, notes }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'Save failed');
      onSaved(j.order, j.emailed ? `${order.orderNumber} saved, customer emailed` : `${order.orderNumber} saved`);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article style={{ border: '1px solid #e5e5e5', borderRadius: 12, padding: 18, background: '#fff', display: 'grid', gap: 12 }}>
      <header style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <strong style={{ fontSize: 18 }}>{order.orderNumber}</strong>
          <span style={{ background: STATUS_COLOUR[order.status], color: '#fff', borderRadius: 99, padding: '2px 10px', fontSize: 12 }}>
            {STATUS_LABEL[order.status]}
          </span>
          <span style={{ fontSize: 13, color: '#666' }}>
            {order.fulfilment === 'collect' ? 'Click & collect' : 'Delivery'} · {when(order.createdAt)}
          </span>
        </div>
        <strong style={{ fontSize: 18 }}>${order.total.toFixed(2)}</strong>
      </header>

      <div style={{ display: 'grid', gap: 4, fontSize: 14 }}>
        <span>
          <strong>{order.customer.name || 'No name'}</strong>
          {order.customer.phone && (
            <>
              {' · '}
              <a href={`tel:${order.customer.phone}`}>{order.customer.phone}</a>
            </>
          )}
          {order.customer.email && (
            <>
              {' · '}
              <a href={`mailto:${order.customer.email}`}>{order.customer.email}</a>
            </>
          )}
        </span>
        {order.fulfilment === 'delivery' && a && (
          <span style={{ color: '#444' }}>{[a.line1, a.line2, a.city, a.state, a.postcode].filter(Boolean).join(', ')}</span>
        )}
        {!order.customerEmailSent && order.customer.email && (
          <span style={{ color: '#b45309', fontSize: 12 }}>Confirmation email not sent – check SMTP settings.</span>
        )}
      </div>

      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, display: 'grid', gap: 4 }}>
        {order.items.map((i, k) => (
          <li key={k}>
            {i.quantity} × {i.name} <span style={{ color: '#666' }}>(${(i.unitPrice * i.quantity).toFixed(2)})</span>
            {i.sku && <span style={{ color: '#999', fontSize: 12 }}> · {i.sku}</span>}
            {i.orderIn && (
              <span style={{ marginLeft: 6, background: '#f3e8ff', color: '#6b21a8', borderRadius: 6, padding: '1px 6px', fontSize: 11 }}>
                order in from Crazy Parts
              </span>
            )}
          </li>
        ))}
        {order.fulfilment === 'delivery' && <li style={{ color: '#666' }}>Delivery ${order.shipping.toFixed(2)}</li>}
      </ul>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <select value={status} onChange={(e) => setStatus(e.target.value as Status)} style={{ padding: 8, borderRadius: 8, border: '1px solid #ccc' }}>
          {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        {(order.fulfilment === 'delivery' || status === 'shipped') && (
          <input
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            placeholder="Tracking number"
            style={{ padding: 8, borderRadius: 8, border: '1px solid #ccc', minWidth: 180 }}
          />
        )}
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (only you see these)"
          style={{ padding: 8, borderRadius: 8, border: '1px solid #ccc', flex: '1 1 200px' }}
        />
        <button
          onClick={save}
          disabled={!dirty || saving}
          style={{ padding: '8px 16px', borderRadius: 8, border: 0, background: dirty ? '#111' : '#ccc', color: '#fff', cursor: dirty ? 'pointer' : 'default' }}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
      {willEmail && <span style={{ fontSize: 12, color: '#1f6feb' }}>Saving will email the customer that it&apos;s {status === 'ready' ? 'ready to collect' : 'on its way'}.</span>}
      {order.paymentIntentId && (
        <a
          href={`https://dashboard.stripe.com/payments/${order.paymentIntentId}`}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 12, color: '#666' }}
        >
          View payment in Stripe (refunds)
        </a>
      )}
    </article>
  );
}

export default function AdminOrdersPage() {
  const { status: authStatus } = useSession();
  const [filter, setFilter] = useState('open');
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    setError('');
    const r = await fetch(`/api/admin/orders${filter ? `?status=${filter}` : ''}`, { cache: 'no-store' });
    if (r.status === 403) return setError('Sign in with an admin account to see orders.');
    if (!r.ok) return setError('Could not load orders.');
    const j = await r.json();
    setOrders(j.orders);
    setCounts(j.counts || {});
  }, [filter]);

  useEffect(() => {
    if (authStatus !== 'loading') load();
  }, [authStatus, load]);

  const open = ['paid', 'ordered', 'ready', 'shipped'].reduce((n, s) => n + (counts[s] || 0), 0);

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 16px 80px', display: 'grid', gap: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Orders</h1>
        <nav style={{ display: 'flex', gap: 14, fontSize: 14 }}>
          <Link href="/admin/products">Products</Link>
          <button onClick={load} style={{ background: 'none', border: 0, color: '#1f6feb', cursor: 'pointer', padding: 0 }}>
            Refresh
          </button>
        </nav>
      </div>

      <div role="tablist" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {FILTERS.map((f) => {
          const n = f.key === 'open' ? open : f.key ? counts[f.key] || 0 : undefined;
          const on = filter === f.key;
          return (
            <button
              key={f.key || 'all'}
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(f.key)}
              style={{ padding: '6px 12px', borderRadius: 99, border: '1px solid #ddd', background: on ? '#111' : '#fff', color: on ? '#fff' : '#111', cursor: 'pointer' }}
            >
              {f.label}
              {typeof n === 'number' ? ` (${n})` : ''}
            </button>
          );
        })}
      </div>

      {toast && <div style={{ background: '#ecfdf3', color: '#166534', padding: '10px 14px', borderRadius: 8 }}>{toast}</div>}
      {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
      {!error && orders === null && <p>Loading…</p>}
      {orders && orders.length === 0 && <p style={{ color: '#666' }}>No orders here.</p>}
      {orders?.map((o) => (
        <OrderCard
          key={o._id + o.status}
          order={o}
          onSaved={(saved, msg) => {
            setToast(msg);
            setTimeout(() => setToast(''), 4000);
            load();
            void saved;
          }}
        />
      ))}
    </main>
  );
}
