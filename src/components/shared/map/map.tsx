import React from "react";

function Map({}) {
  return (
    <div className="contact-page google-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.462652365058!2d145.06878609999998!3d-37.75574869999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad647c89707795f%3A0x2ce576275e4b8085!2sMOBILE%20ARMOUR%20-%20Phone%20Repair%20Specialist!5e0!3m2!1sen!2sin!4v1761033751415!5m2!1sen!2sin" 
        width="600"
        height="600"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
    );
}

export default Map;
