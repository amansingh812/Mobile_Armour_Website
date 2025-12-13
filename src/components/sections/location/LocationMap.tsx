"use client";
import SectionTitle from "@/components/shared/section/section-title";
import React from "react";

function LocationMap() {
  const contactInfo = [
    {
      icon: "fa-solid fa-location-dot",
      title: "Visit Us",
      info: "Kiosk 4, Warringal Shopping Centre",
      subInfo: "Heidelberg, VIC 3084",
      link: "https://maps.google.com/?q=Kiosk+4+Warringal+Shopping+Centre+Heidelberg",
    },
    {
      icon: "fa-solid fa-phone",
      title: "Call Us",
      info: "0405 326 205",
      subInfo: "Mon-Sun: 9:30 AM - 5:30 PM",
      link: "tel:+61405326205",
    },
    {
      icon: "fa-solid fa-envelope",
      title: "Email Us",
      info: "repair@mobilearmour.com.au",
      subInfo: "We reply within 24 hours",
      link: "mailto:repair@mobilearmour.com.au",
    },
  ];

  return (
    <div className="location-section section-padding" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <SectionTitle
              title="Visit Our Store at Warringal Shopping Centre"
              subTitle="Location"
            />
          </div>
        </div>
        <div className="row mt-60 g-4 align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="location-info-wrap">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.icon.includes("location") ? "_blank" : undefined}
                  rel={info.icon.includes("location") ? "noopener noreferrer" : undefined}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  <div
                    className="single-contact-info"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "20px",
                      padding: "30px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "10px",
                      marginBottom: "20px",
                      transition: "all 0.3s ease",
                      border: "2px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#FF5600";
                      e.currentTarget.style.borderColor = "#FF5600";
                      e.currentTarget.style.transform = "translateX(10px)";
                      const icon = e.currentTarget.querySelector(".contact-icon") as HTMLElement;
                      const title = e.currentTarget.querySelector(".contact-title") as HTMLElement;
                      const text = e.currentTarget.querySelector(".contact-text") as HTMLElement;
                      const subtext = e.currentTarget.querySelector(".contact-subtext") as HTMLElement;
                      if (icon) icon.style.color = "#ffffff";
                      if (title) title.style.color = "#ffffff";
                      if (text) text.style.color = "#ffffff";
                      if (subtext) subtext.style.color = "rgba(255,255,255,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                      const icon = e.currentTarget.querySelector(".contact-icon") as HTMLElement;
                      const title = e.currentTarget.querySelector(".contact-title") as HTMLElement;
                      const text = e.currentTarget.querySelector(".contact-text") as HTMLElement;
                      const subtext = e.currentTarget.querySelector(".contact-subtext") as HTMLElement;
                      if (icon) icon.style.color = "#FF5600";
                      if (title) title.style.color = "#1a1a1a";
                      if (text) text.style.color = "#1a1a1a";
                      if (subtext) subtext.style.color = "#666";
                    }}
                  >
                    <div
                      className="contact-icon"
                      style={{
                        fontSize: "40px",
                        color: "#FF5600",
                        transition: "color 0.3s ease",
                        flexShrink: 0,
                      }}
                    >
                      <i className={info.icon}></i>
                    </div>
                    <div className="contact-content">
                      <h6
                        className="contact-title fw-bold mb-2"
                        style={{
                          fontSize: "16px",
                          color: "#1a1a1a",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {info.title}
                      </h6>
                      <p
                        className="contact-text mb-1"
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#1a1a1a",
                          marginBottom: "5px",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {info.info}
                      </p>
                      <p
                        className="contact-subtext mb-0"
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {info.subInfo}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
              <div
                className="parking-info"
                style={{
                  padding: "20px",
                  backgroundColor: "#e8f5e9",
                  borderRadius: "10px",
                  borderLeft: "4px solid #4CAF50",
                  marginTop: "20px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "#2e7d32",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <i className="fa-solid fa-square-parking" style={{ fontSize: "20px" }}></i>
                  <strong>Free Parking Available</strong> - Easy access at Warringal Shopping Centre
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div
              className="map-wrapper"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.8665467889877!2d145.05807431531583!3d-37.754700779758515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccc90!2sWarringal%20Shopping%20Centre!5e0!3m2!1sen!2sau!4v1699999999999!5m2!1sen!2sau"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mobile Armour Location - Warringal Shopping Centre"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationMap;
