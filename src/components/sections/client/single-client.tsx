import Image from "next/image";

interface props {
  imageSrc: string;
}

export default function SingleClient({ imageSrc }: props) {
  return (
    <div className="single-client">
      <a href="#">
        <Image
          src={imageSrc}
          width={190}
          height={60}
          alt="Mobile Armour partner brand logo"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </a>
    </div>
  );
}
