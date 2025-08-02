"use client";
import { useState } from "react";
import Pricing2Card from "@/components/shared/card/pricing2-card";
import SectionTitle from "@/components/shared/section/section-title";
import {
  monthlyPricingData,
  yearlyPricingData,
} from "@/data/pricing2-card-seeds";

const Pricing2 = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  return (
    <div className="price-section section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-7 text-center">
            <SectionTitle
              title="Affordable Pricing Packages to your choice"
              subTitle="Our Pricing"
            />
          </div>
        </div>

        <div className="row mt-30">
          <div className="col-xl-6 col-lg-6">
            <div className="price-tab-wrap gray-bg">
              <div className="price-tab">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === "monthly" ? "active" : ""}`}
                      onClick={() => setActiveTab("monthly")}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "monthly"}
                    >
                      Monthly
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === "yearly" ? "active" : ""}`}
                      onClick={() => setActiveTab("yearly")}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "yearly"}
                    >
                      Yearly
                    </button>
                  </li>
                </ul>
              </div>
              <div className="price-feat-list">
                <ul>
                  <li>
                    <i className="fa-solid fa-circle-check"></i> Newly Roofing
                    Installation
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i> Flexible
                    Roofing Repair
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i> Best Quality
                    Materials
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i> Professional
                    Worker Engaged
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6">
            <div className="tab-content">
              {activeTab === "monthly" && (
                <div className="tab-pane fade show active">
                  {monthlyPricingData.map((item) => (
                    <Pricing2Card
                      key={item.id}
                      type={item.type}
                      price={item.price}
                      duration={item.duration}
                      discount={item.discount}
                    />
                  ))}
                </div>
              )}

              {activeTab === "yearly" && (
                <div className="tab-pane fade show active">
                  {yearlyPricingData.map((item) => (
                    <Pricing2Card
                      key={item.id}
                      type={item.type}
                      price={item.price}
                      duration={item.duration}
                      discount={item.discount}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing2;
