import { ITestimonial1CardData } from "@/data/testimonial1-card-seeds";
import Image from "next/image";
import React from "react";
interface Testimonial1CardProps {
  testimonial1Card: ITestimonial1CardData;
}
function Testimonial1Card({ testimonial1Card }: Testimonial1CardProps) {
  return (
    <div className="single-testimonial-item">
      <div className="testimonial-icon">{testimonial1Card.icon}</div>
      
      {/* Star Rating */}
      {testimonial1Card.rating && (
        <div 
          className="testimonial-rating" 
          style={{ 
            marginBottom: "12px", 
            display: "flex",
            gap: "4px",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className="las la-star"
              style={{
                color: i < (testimonial1Card.rating || 0) ? "#FE574F" : "#ddd",
                fontSize: "clamp(14px, 4vw, 16px)",
              }}
            ></i>
          ))}
        </div>
      )}
      
      <p style={{ 
        fontSize: "clamp(13px, 3.5vw, 15px)",
        lineHeight: "1.6",
        marginBottom: "16px",
        color: "#666",
      }}>
        {testimonial1Card.comment}
      </p>
      
      <div className="author-wrap" style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <div className="author-thumb" style={{
          flexShrink: 0,
        }}>
          <Image
            src={testimonial1Card.src}
            alt={testimonial1Card.alt}
            width={60}
            height={60}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="author-desc" style={{
          flex: 1,
          minWidth: 0,
        }}>
          <h5 style={{
            fontSize: "clamp(13px, 3.5vw, 16px)",
            fontWeight: "600",
            margin: "0 0 4px 0",
            wordBreak: "break-word",
          }}>
            {testimonial1Card.name}
          </h5>
          <span style={{
            fontSize: "clamp(11px, 2.5vw, 13px)",
            color: "#999",
            display: "block",
            wordBreak: "break-word",
          }}>
            {testimonial1Card.designation}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Testimonial1Card;
