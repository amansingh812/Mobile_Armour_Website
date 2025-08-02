import Form from "@/components/shared/form/form";
import React from "react";

function ContactSection() {
  const imageUrl = "/img/contact/contact-img2.jpg";
  return (
    <div className="contact-section">
      <div
        className="contact-bg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="contact-form-wrap gray-bg">
        <div className="section-title">
          <h6>Get in Touch</h6>
          <h2>
            Don't hesitate to <br /> contact us for info
          </h2>
        </div>
        <div className="contact-form">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
