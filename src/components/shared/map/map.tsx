"use client";

import React from "react";

function Map({}) {
  const handleMapClick = () => {
    // Open Google Maps directions in new tab
    // Coordinates from the embedded map: -37.75574869999999, 145.06878609999998
    const storeLocation = "MOBILE ARMOUR - Phone Repair Specialist";
    const directionsUrl = `https://www.google.com/maps/dir//${encodeURIComponent(storeLocation)}/@-37.75574869999999,145.06878609999998,17z`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <div className="contact-page google-map">
      <div
        className="map-container"
        onClick={handleMapClick}
        style={{ cursor: 'pointer', position: 'relative' }}
        title="Click to get directions to our store"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.462652365058!2d145.06878609999998!3d-37.75574869999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad647c89707795f%3A0x2ce576275e4b8085!2sMOBILE%20ARMOUR%20-%20Phone%20Repair%20Specialist!5e0!3m2!1sen!2sin!4v1761033751415!5m2!1sen!2sin"
          width="600"
          height="600"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
        {/* Click overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'transparent',
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}

export default Map;
