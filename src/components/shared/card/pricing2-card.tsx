import React from "react";

interface Pricing2CardProps {
  type: string;
  price: string;
  duration: string;
  discount: string;
}

const Pricing2Card: React.FC<Pricing2CardProps> = ({
  type,
  price,
  duration,
  discount,
}) => {
  return (
    <div className="single-price-wrap">
      <div className="price-amount">
        <h2>
          {price}
          <span>{duration}</span>
        </h2>
      </div>
      <div className="price-title">
        <h4>{type}</h4>
      </div>
      <div className="price-coupon">
        <span>{discount}</span>
      </div>
    </div>
  );
};

export default Pricing2Card;
