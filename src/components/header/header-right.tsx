"use client";

import { useEffect, useState, useRef } from "react";
import SearchPopup from "./search-popup";
import Form from "./form-quote";
import AuthNav from "../auth/AuthNav";

interface HeaderRightProps { }
export default function HeaderRight({ }: HeaderRightProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenQuoteForm = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        buttonRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className={`header-right relative ${isModalOpen ? 'modal-active' : ''}`}>
        {/* Phone Number - Click to Call */}
        <a 
          href="tel:0405326205" 
          className="header-phone-link d-none d-lg-inline-block mr-4"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#ff5722',
            color: '#fff',
            borderRadius: '4px',
            fontWeight: '600',
            fontSize: '15px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#e64a19'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#ff5722'}
        >
          <i className="fa-light fa-phone" style={{ fontSize: '16px'  , paddingRight: '6px' }}></i>
          0405-326-205
        </a>
        
        {/* Get a Quote Button */}
        {/* <button
          ref={buttonRef}
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="theme-btn d-none d-lg-inline-block mr-4"
        >
          Get a Quote
        </button> */}
        
        {/* Auth Navigation */}
        <div className="auth-nav-container d-none d-lg-inline-block mr-4">
          <AuthNav />
        </div>
        
        {isModalOpen && (
          <div
            ref={modalRef}
            className="header-modal"
          >
            <Form />
          </div>
        )}
      </div>
    </>
  );
}