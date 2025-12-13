"use client";
import React from "react";

function TrustBadges() {
  const badges = [
    {
      icon: "fa-solid fa-star",
      title: "5-Star Rated",
      description: "Google Reviews",
      color: "#FFD700",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "6-Month Warranty",
      description: "On All Repairs",
      color: "#FF5600",
    },
    {
      icon: "fa-solid fa-bolt",
      title: "Same Day Repair",
      description: "Most Devices",
      color: "#4CAF50",
    },
    {
      icon: "fa-solid fa-certificate",
      title: "Certified Technicians",
      description: "Expert Service",
      color: "#2196F3",
    },
    {
      icon: "fa-solid fa-location-dot",
      title: "Warringal Centre",
      description: "Easy Parking",
      color: "#FF9800",
    },
  ];

  return (
    <div className="trust-badges-section" style={{ backgroundColor: "#f8f9fa", padding: "40px 0" }}>
      <div className="container">
        <div className="row justify-content-center g-4">
          {badges.map((badge, index) => (
            <div className="col-xl-2 col-lg-3 col-md-4 col-6" key={index}>
              <div
                className="trust-badge-item text-center"
                style={{
                  padding: "20px 15px",
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  height: "100%",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="badge-icon"
                  style={{
                    fontSize: "40px",
                    color: badge.color,
                    marginBottom: "10px",
                  }}
                >
                  <i className={badge.icon}></i>
                </div>
                <h6
                  className="badge-title fw-bold mb-1"
                  style={{
                    fontSize: "14px",
                    color: "#1a1a1a",
                  }}
                >
                  {badge.title}
                </h6>
                <p
                  className="badge-description mb-0"
                  style={{
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrustBadges;
