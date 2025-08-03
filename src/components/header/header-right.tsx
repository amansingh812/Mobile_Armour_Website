"use client";

import { useEffect, useState, useRef } from "react";
import SearchPopup from "./search-popup";
import Form from "./form-quote";
import MobileQuoteButton from "../quote-button/mobile-quote-button";
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
        <button
          ref={buttonRef}
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="theme-btn  d-none d-lg-inline-block mr-4"
        >
          Get a Quote
        </button>
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

      {/* Mobile Quote Button */}
      <MobileQuoteButton onOpenQuoteForm={handleOpenQuoteForm} />
    </>
  );
}