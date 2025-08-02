import Image from "next/image";
import React from "react";

function SdLeft({ }) {
  return (
    <div>
      <div className="service-details-wrap">
        <div className="feature-img">
          <Image
            src="/img/service/service-feat-img1.jpg" //roofix\public\img\service\service-feat-img1.jpg
            alt="img"
            width={768}
            height={511}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <p>
          At Mobile Armour, we specialise in restoring your essential devices with precision and care. Whether you’ve dropped your phone or your Apple Watch isn’t functioning right, our expert technicians are here to help. We provide fast and dependable phone screen repairs using premium parts that restore both clarity and touch response. Our Apple Watch repair service covers everything from cracked screens to battery replacements, ensuring your wearable tech is back on your wrist and working perfectly in no time.
        </p>
        <h5>Mobile & Wearable Repairs</h5>
        <p>
          If your device has taken an unexpected dip in water, our specialised water damage repair service can help recover it before permanent damage sets in. Using advanced diagnostic tools and thorough cleaning methods, we aim to rescue both your phone and your data. Additionally, if you’re noticing a swollen battery or your phone won’t hold a charge, our battery replacement service ensures long-lasting power with high-quality battery cells, keeping your device running like new.
        </p>

        <div className="service-details-img">
          <div className="row gy-5">
            <div className="col-md-6">
              <Image
                src="/img/service/service-details-img-11.jpg"
                alt="img"
                width={372}
                height={248}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
            <div className="col-md-6">
              <Image
                src="/img/service/service-details-img-22.jpg"
                alt="img"
                width={372}
                height={248}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
        <p>

          We understand how valuable your time is, which is why we offer in-home repair services. Our skilled technicians come to you—at home, work, or anywhere convenient—to fix your phone on-site with the same level of professionalism and quality you’d expect in-store. Whether it’s a charging port issue or a cracked back glass, we’ve got the tools and expertise to handle it on the spot, saving you the hassle of visiting a repair shop.

        </p>
        <h5>Convenience & Corporate Solutions</h5>
        <p>
          A common yet frustrating issue is a faulty charging port. Whether your phone charges slowly or not at all, our team quickly identifies the issue and performs precise charging repairs to get your device powered up and back in your hands. For those who care about the look and integrity of their phone, our back glass replacement service restores your device’s original finish, using clean, safe methods and factory-quality materials.
        </p>
        <p>
          For businesses and organisations, our corporate repair solutions are designed to keep your team connected with minimal disruption. We offer bulk device servicing, priority turnaround, and flexible account options tailored to your workflow. Whether your company uses iPhones, Androids, or a mix of both, we provide ongoing support and repairs that reduce downtime and extend the life of your devices. With a trusted reputation for quality and efficiency, Mobile Armour is the partner your business can rely on.
        </p>
        <div className="service-details-img">
          <Image
            src="/img/service/service-details-img-333.jpg"
            alt="img"
            width={768}
            height={512}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <p>
          we combine technical expertise, premium parts, and customer-first service to deliver reliable, high-quality mobile and wearable repairs across the board. Whether you’re an individual needing a quick screen fix or a business looking for dependable device maintenance, our solutions are designed to be fast, transparent, and hassle-free. With in-store, in-home, and corporate service options available, we make it easy to keep your devices—and your life—running smoothly.
        </p>
      </div>
    </div>
  );
}

export default SdLeft;
