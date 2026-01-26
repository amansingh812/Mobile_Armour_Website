"use client";
import React, { useState } from "react";
import Head from "next/head";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does a typical phone repair take?",
      answer: "Most repairs are completed in 30-60 minutes. Screen replacements and battery changes are usually done while you wait. More complex repairs like water damage may take 1-2 hours. We'll give you an accurate time estimate after our free diagnosis."
    },
    {
      question: "Do you offer a warranty on repairs?",
      answer: "Yes. A 6-month limited warranty is provided only on Premium A-Grade parts and workmanship. Warranty does not cover standard or customer-supplied parts, accidental damage, liquid damage, or misuse. Proof of repair is required for warranty claims."
    },
    {
      question: "What phone brands do you repair?",
      answer: "We service all major brands including Apple iPhone, Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, Oppo, and more. Our technicians are experienced with the latest models and older devices. If you're unsure, just contact us!"
    },
    {
      question: "How much does a screen repair cost?",
      answer: "Screen repair prices vary by device model. iPhone screen replacements start from $79, Samsung from $89. We use quality parts and provide transparent pricing upfront. Contact us for an exact quote for your specific phone model."
    },
    {
      question: "Do I need to book an appointment?",
      answer: "No appointment needed! We welcome walk-ins at our Warringal Shopping Centre kiosk during business hours (Mon-Sun 9:30am-5:30pm). However, you can book online or call ahead if you prefer to guarantee immediate service."
    },
    {
      question: "Can you fix water-damaged phones?",
      answer: "Yes, we specialize in water damage repair. Bring your phone in as soon as possible - don't try to charge it or turn it on. We'll perform a free diagnosis to assess the damage and provide a repair quote. Success rates are highest when treated quickly."
    },
    {
      question: "What if my phone can't be repaired?",
      answer: "If we determine your phone cannot be repaired, there's no fee for the diagnosis. We follow a 'No Fix, No Fee' policy. We'll explain the issue and can discuss data recovery options or trade-in alternatives if applicable."
    },
    {
      question: "Will I lose my data during the repair?",
      answer: "In most cases, your data remains safe during repairs like screen or battery replacement. However, we always recommend backing up your phone before any repair service as a precaution. For water damage or motherboard repairs, data recovery is not guaranteed."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="faq-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-50">
              <div className="section-title">
                <span className="section-subtitle">Have Questions?</span>
                <h2>Frequently Asked Questions</h2>
                <p className="section-description">
                  Get answers to common questions about our mobile phone repair services
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">
              <div className="faq-wrapper">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${openIndex === index ? 'active' : ''}`}
                  >
                    <button 
                      className="faq-question"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={openIndex === index}
                    >
                      <span className="question-text">{faq.question}</span>
                      <span className="faq-icon">
                        <i className={`fa-solid ${openIndex === index ? 'fa-minus' : 'fa-plus'}`}></i>
                      </span>
                    </button>
                    <div className={`faq-answer ${openIndex === index ? 'show' : ''}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="faq-cta">
                <p style={{ color: '#212529' }}><strong>Still have questions?</strong></p>
                <p style={{ color: '#212529' }}>Our friendly team is here to help!</p>
                <div className="cta-buttons">
                  <a href="tel:0405326205" className="theme-btn">
                    <i className="fa-light fa-phone" style={{ paddingRight: '8px' }}></i>
                    0405-326-205
                  </a>
                  <a href="/contact" className="theme-btn theme-btn-outline">
                    <i className="fa-light fa-envelope "  style={{ paddingRight: '8px' }}></i>
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          padding: clamp(50px, 10vw, 80px) 0;
          background: #f8f9fa;
        }

        .section-subtitle {
          color: #ff5722;
          font-size: clamp(14px, 3vw, 16px);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 10px;
        }

        .section-title h2 {
          font-size: clamp(26px, 5vw, 36px);
          font-weight: 700;
          color: #212529;
          margin-bottom: 15px;
          word-wrap: break-word;
          line-height: 1.3;
        }

        .section-description {
          font-size: 16px;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
        }

        .faq-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .faq-item {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .faq-item.active {
          box-shadow: 0 4px 16px rgba(255, 87, 34, 0.15);
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: clamp(16px, 3vw, 20px) clamp(20px, 4vw, 25px);
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
          min-height: 60px;
        }

        .faq-item.active .faq-question {
          background: #fff3f0;
        }

        .question-text {
          font-size: clamp(15px, 3.5vw, 17px);
          font-weight: 600;
          color: #212529;
          line-height: 1.4;
          padding-right: 15px;
          word-wrap: break-word;
        }

        .faq-icon {
          width: clamp(28px, 6vw, 32px);
          height: clamp(28px, 6vw, 32px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ff5722;
          color: #fff;
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.3s ease;
          font-size: clamp(14px, 3vw, 16px);
        }

        .faq-item.active .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease;
        }

        .faq-answer.show {
          max-height: 500px;
          padding: 0 clamp(20px, 4vw, 25px) clamp(16px, 3vw, 20px) clamp(20px, 4vw, 25px);
        }

        .faq-answer p {
          font-size: clamp(14px, 3vw, 15px);
          color: #6c757d;
          line-height: 1.7;
          margin: 0;
        }

        .faq-cta {
          background: linear-gradient(135deg, #ff5722 0%, #e64a19 100%);
          border-radius: 12px;
          padding: clamp(30px, 6vw, 40px) clamp(25px, 5vw, 30px);
          text-align: center;
          color: #fff;
        }

        .faq-cta p {
          font-size: 16px;
          margin-bottom: 8px;
        }

        .faq-cta p:last-of-type {
          margin-bottom: 20px;
        }

        .cta-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .theme-btn {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          background: #fff;
          color: #ff5722;
          border-radius: 6px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid #fff;
        }

        .theme-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .theme-btn-outline {
          background: transparent;
          color: #fff;
        }

        .theme-btn-outline:hover {
          background: #fff;
          color: #ff5722;
        }

        @media (max-width: 767px) {
          .faq-section {
            padding: 50px 0;
          }

          .section-title h2 {
            font-size: 26px;
          }

          .section-description {
            font-size: 14px;
            padding: 0 10px;
          }

          .faq-wrapper {
            gap: 12px;
          }

          .faq-question {
            padding: 14px 18px;
            min-height: 54px;
          }

          .question-text {
            font-size: 15px;
            padding-right: 12px;
          }

          .faq-icon {
            width: 28px;
            height: 28px;
          }

          .faq-answer.show {
            padding: 0 18px 14px 18px;
          }

          .faq-answer p {
            font-size: 14px;
          }

          .faq-cta {
            padding: 30px 20px;
          }

          .cta-buttons {
            flex-direction: column;
            gap: 12px;
          }

          .theme-btn {
            width: 100%;
            justify-content: center;
            padding: 14px 24px;
            font-size: 15px;
          }
        }

        @media (max-width: 575px) {
          .faq-section {
            padding: 40px 0;
          }

          .mb-50 {
            margin-bottom: 30px !important;
          }

          .faq-question {
            padding: 12px 16px;
          }

          .faq-answer.show {
            padding: 0 16px 12px 16px;
          }
        }
      `}</style>
    </>
  );
}
