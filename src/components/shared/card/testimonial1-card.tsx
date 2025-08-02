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
      <p>{testimonial1Card.comment}</p>
      <div className="author-wrap">
        <div className="author-thumb">
          <Image
            src={testimonial1Card.src}
            alt={testimonial1Card.alt}
            width={70}
            height={70}
          />
        </div>
        <div className="author-desc">
          <h5>{testimonial1Card.name}</h5>
          <span>{testimonial1Card.designation}</span>
        </div>
      </div>
    </div>
  );
}

export default Testimonial1Card;
