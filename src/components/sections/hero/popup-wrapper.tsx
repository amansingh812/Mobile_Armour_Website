"use client";
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface PopupWrapperProps {
  trigger: React.ReactNode;
  children: (close: () => void) => React.ReactNode;
}

const PopupWrapper: React.FC<PopupWrapperProps> = ({ trigger, children }) => {
  return (
    <Popup trigger={trigger} modal nested>
      {children as unknown as React.ReactNode}
    </Popup>
  );
};

export default PopupWrapper;
