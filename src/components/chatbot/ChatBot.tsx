'use client';

import React, { useState, useEffect } from 'react';
import './ChatBot.css';

const FloatingEnquiryForm: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTeaserVisible, setIsTeaserVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: '',
    otherBrand: '',
    model: '',
    description: '',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show teaser on first visit
  useEffect(() => {
    try {
      const shown = typeof window !== 'undefined' && sessionStorage.getItem('maChatTeaserShown');
      if (!shown) {
        const showTimer = setTimeout(() => setIsTeaserVisible(true), 1800);
        const hideTimer = setTimeout(() => setIsTeaserVisible(false), 10000);
        return () => {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
        };
      }
    } catch {}
  }, []);

  const openForm = () => {
    setIsOpen(true);
    setIsTeaserVisible(false);
    try { sessionStorage.setItem('maChatTeaserShown', '1'); } catch {}
  };

  const toggleForm = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      setIsTeaserVisible(false);
      try { sessionStorage.setItem('maChatTeaserShown', '1'); } catch {}
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'brand' && value !== 'other') {
      setFormData(prev => ({ ...prev, brand: value, otherBrand: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const finalBrand = formData.brand === 'other' ? formData.otherBrand : formData.brand;

    try {
      // Send to Google Sheets + email via /api/bookings
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ENQUIRY',
          data: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            brand: finalBrand,
            model: formData.model,
            message: formData.description,
          },
        }),
      });

      if (response.ok) {
        setSubmitMessage('success');
        setFormData({ name: '', phone: '', email: '', brand: '', otherBrand: '', model: '', description: '' });
      } else {
        setSubmitMessage('error');
      }
    } catch {
      setSubmitMessage('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Teaser bubble */}
      <div className={`chat-teaser ${isTeaserVisible ? 'show' : ''}`} onClick={openForm}>
        <div className="teaser-content">
          <div className="mbot-icon-placeholder">MA</div>
          <div className="teaser-text-area">
            <span className="teaser-main-text">Need a repair? Get a free quote!</span>
            <span className="teaser-meta-text">Quick enquiry form</span>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <div
        className={`chat-widget-button ${isOpen ? 'open' : ''}`}
        onClick={toggleForm}
        aria-label={isOpen ? 'Close enquiry form' : 'Open enquiry form'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </div>

      {/* Form window */}
      <div className={`enquiry-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="enquiry-header">
          <div className="enquiry-header-info">
            <div className="enquiry-avatar">MA</div>
            <div>
              <h4>Quick Enquiry</h4>
              <span className="enquiry-subtitle">We&apos;ll get back to you ASAP</span>
            </div>
          </div>
          <button className="close-button" onClick={() => setIsOpen(false)} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <div className="enquiry-body">
          {submitMessage === 'success' ? (
            <div className="enquiry-success">
              <div className="success-icon">&#10003;</div>
              <h3>Thank You!</h3>
              <p>Your enquiry has been submitted successfully. We&apos;ll contact you shortly.</p>
              <p className="whatsapp-link">
                For faster response, message us on{' '}
                <a href="https://wa.me/610405326205" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </p>
              <button
                className="enquiry-submit-btn"
                onClick={() => setSubmitMessage('')}
                type="button"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="enquiry-form">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Brand *</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Google Pixel">Google Pixel</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="OPPO">OPPO</option>
                    <option value="iPad">iPad</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  {formData.brand === 'other' ? (
                    <input
                      type="text"
                      name="otherBrand"
                      placeholder="Specify Brand *"
                      value={formData.otherBrand}
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      name="model"
                      placeholder="Model (e.g. iPhone 15)"
                      value={formData.model}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>

              {formData.brand === 'other' && (
                <div className="form-group">
                  <input
                    type="text"
                    name="model"
                    placeholder="Model (e.g. iPhone 15)"
                    value={formData.model}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="form-group">
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Describe your issue... *"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {submitMessage === 'error' && (
                <div className="enquiry-error">
                  Something went wrong. Please try again or call us at{' '}
                  <a href="tel:0405326205">0405-326-205</a>
                </div>
              )}

              <button
                type="submit"
                className="enquiry-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-loading">
                    <span className="spinner" /> Sending...
                  </span>
                ) : (
                  'Submit Enquiry'
                )}
              </button>

              <p className="enquiry-footer-text">
                Or call us directly:{' '}
                <a href="tel:0405326205">0405-326-205</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default FloatingEnquiryForm;
