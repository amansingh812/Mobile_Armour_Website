import Image from "next/image";
import React from "react";

function Service2Slider({ }) {
  return (
    <div className="service_slider_wrap light-bg overflow-hidden">
      <div className="slider_item">
        <h5>
          <Image
            src="/img/service/1-13.png"
            alt="img"
            width={64}
            height={64}

          />
          Phone Screen Repairs
        </h5>
        <h5 className="stroke">
          <Image
            src="/img/service/repairing.png"
            alt="img"
            width={64}
            height={64}

          />
          Corporate Repair
        </h5>
        <h5>
          <Image
            src="/img/service/1-33.png"
            alt="img"
            width={64}
            height={64}

          />
          In Home repair{" "}
        </h5>
        <h5 className="stroke">
          <Image
            src="/img/service/1-41.png"
            alt="img"
            width={64}
            height={64}

          />
          Water Damage Repairs
        </h5>
      </div>
    </div>
  );
}

export default Service2Slider;
