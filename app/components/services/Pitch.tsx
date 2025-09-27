import Image from "next/image";
import { getAssetPath } from "../../utils/paths";

const image = [
  "/english/english.jpg",
  "/english/english1.jpg",
  "/english/english2.jpg",
  "/english/english3.jpg",
  "/english/english4.jpg",
];

export default function Pitch() {
  return (
    <>
      <div className="">
        <div className="bg-[#589EEE] h-[90px]"></div>

        {image.map((img, index) => (
          <Image
            key={index}
            alt={`English Service + ${index}`}
            src={getAssetPath(`${img}`)}
            width={1920}
            height={1080}
            className="object-cover w-full h-auto"
          />
        ))}
      </div>
    </>
  );
}
