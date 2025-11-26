"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AdvancePaymentPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [amount, setAmount] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [description, setDescription] = useState<string>("Advance Payment - Mobile Repair");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      router.push("/account/login");
      return;
    }

    if (session.user.email !== 'dromperfectly125@gmail.com') {
      router.push("/");
      return;
    }
  }, [session, status, router]);

  // Don't render until auth is checked
  if (status === "loading") {
    return (
      <div style={containerStyle}>
        <p>Loading...</p>
      </div>
    );
  }

  // Don't render if not admin
  if (!session?.user || session.user.email !== 'dromperfectly125@gmail.com') {
    return null;
  }

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPaymentLink(null);
    setCopiedLink(false);

    // Validate amount
    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    setIsCreating(true);

    try {
      const response = await fetch('/api/payments/create-advance-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountNum,
          customerEmail: customerEmail.trim() || null,
          customerName: customerName.trim() || null,
          description: description.trim() || 'Advance Payment - Mobile Repair',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment link');
      }

      setPaymentLink(data.url);
    } catch (err: any) {
      console.error('Error creating payment link:', err);
      setError(err.message || 'Failed to create payment link');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyLink = () => {
    if (paymentLink) {
      navigator.clipboard.writeText(paymentLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleReset = () => {
    setAmount("");
    setCustomerEmail("");
    setCustomerName("");
    setDescription("Advance Payment - Mobile Repair");
    setPaymentLink(null);
    setError(null);
    setCopiedLink(false);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Generate Advance Payment Link</h1>
        <p style={subtitleStyle}>Create a payment link to collect advance payment for mobile repairs</p>
      </div>

      {error && (
        <div style={errorBoxStyle}>
          {error}
        </div>
      )}

      {paymentLink ? (
        <div style={successContainerStyle}>
          <div style={successBoxStyle}>
            <h2 style={successTitleStyle}>Payment Link Generated!</h2>
            <p style={successSubtitleStyle}>Share this link with your customer to collect the advance payment</p>

            <div style={linkContainerStyle}>
              <input
                type="text"
                value={paymentLink}
                readOnly
                style={linkInputStyle}
              />
              <button
                onClick={handleCopyLink}
                style={copyButtonStyle}
              >
                {copiedLink ? '✓ Copied!' : 'Copy Link'}
              </button>
            </div>

            <div style={linkActionsStyle}>
              <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                style={openLinkButtonStyle}
              >
                Open Payment Page
              </a>
              <button
                onClick={handleReset}
                style={newLinkButtonStyle}
              >
                Create New Link
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleGenerateLink} style={formStyle}>
          <div style={formGridStyle}>
            <div style={formGroupFullStyle}>
              <label style={labelStyle}>
                Amount (AUD) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
                required
                style={inputStyle}
              />
              <p style={hintStyle}>Enter the advance payment amount in Australian Dollars</p>
            </div>

            <div style={formGroupFullStyle}>
              <label style={labelStyle}>
                Description *
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Advance Payment - Mobile Repair"
                required
                style={inputStyle}
              />
              <p style={hintStyle}>This will appear on the payment page</p>
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>
                Customer Name (Optional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="John Doe"
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>
                Customer Email (Optional)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="customer@example.com"
                style={inputStyle}
              />
              <p style={hintStyle}>If provided, email will be pre-filled on payment page</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isCreating}
            style={submitButtonStyle}
          >
            {isCreating ? 'Generating Link...' : 'Generate Payment Link'}
          </button>
        </form>
      )}
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  padding: "24px",
  maxWidth: 800,
  margin: "0 auto",
};

const headerStyle: React.CSSProperties = {
  marginBottom: 32,
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 8,
  color: '#111827',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 16,
  color: '#6b7280',
};

const errorBoxStyle: React.CSSProperties = {
  background: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#991b1b",
  padding: "12px 16px",
  borderRadius: 8,
  marginBottom: 24,
  textAlign: 'center',
};

const formStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 24,
};

const formGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  marginBottom: 24,
};

const formGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const formGroupFullStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gridColumn: "1 / -1",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 600,
  marginBottom: 8,
  color: '#374151',
  fontSize: 14,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  padding: "12px 16px",
  outline: "none",
  fontSize: 16,
  transition: 'border-color 0.2s',
};

const hintStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#6b7280',
  marginTop: 6,
};

const submitButtonStyle: React.CSSProperties = {
  width: '100%',
  background: "#111827",
  color: "#fff",
  padding: "14px 20px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 600,
  transition: 'background 0.2s',
};

const successContainerStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 32,
};

const successBoxStyle: React.CSSProperties = {
  textAlign: 'center',
};

const successTitleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  color: '#059669',
  marginBottom: 8,
};

const successSubtitleStyle: React.CSSProperties = {
  fontSize: 16,
  color: '#6b7280',
  marginBottom: 24,
};

const linkContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  marginBottom: 24,
};

const linkInputStyle: React.CSSProperties = {
  flex: 1,
  padding: '12px 16px',
  border: '2px solid #d1d5db',
  borderRadius: 8,
  fontSize: 14,
  fontFamily: 'monospace',
  background: '#f9fafb',
};

const copyButtonStyle: React.CSSProperties = {
  background: '#3b82f6',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  whiteSpace: 'nowrap',
};

const linkActionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  justifyContent: 'center',
};

const openLinkButtonStyle: React.CSSProperties = {
  background: '#059669',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-block',
};

const newLinkButtonStyle: React.CSSProperties = {
  background: '#6b7280',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
};
