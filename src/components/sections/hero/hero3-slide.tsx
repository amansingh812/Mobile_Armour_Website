import PrimaryBtn from "@/components/shared/button/primary-btn";
import Image from "next/image";

interface props {
  subtitle: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
  src: string;
}
export default function Hero3Slide({
  subtitle,
  title,
  description,
  src,
  link,
  buttonText,
}: props) {
  return (
    <div className="single-slide-item d-flex align-items-center">
      <Image
        src={src}
        alt="Responsive Image"
        fill
        style={{ objectFit: "cover" }}
      />
      <div className="hero-area-content">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-8 col-md-8 ">
              <div className="section-title">
                <h6 className="text-white">{subtitle}</h6>
                <h1 className="text-white">{title}</h1>
              </div>
              <p className="text-white">{description}</p>
              <PrimaryBtn href={link} text={buttonText} className="mt-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
