"use client";

import React from "react";
import PopupWrapper from "./popup-wrapper";

interface props {
  children: React.ReactNode;
}
const RoofixPopup = ({ children }: props) => {
  return (
    <PopupWrapper
      trigger={
        <button className="video-play-btn">
          <i className="fa-solid fa-play"></i>
        </button>
      }
    >
      {(close: () => void) => (
        <div className="custom-modal position-relative">
          <button className="modal-close" onClick={close}>
            &times;
          </button>
          <div className="modal-content">{children}</div>
        </div>
      )}
    </PopupWrapper>
  );
};

export default RoofixPopup;
