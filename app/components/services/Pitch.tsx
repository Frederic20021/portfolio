import Image from "next/image";
import { getAssetPath } from "../../utils/paths";

const image = [
  "english.jpg",
  "english1.jpg",
  "english2.jpg",
  "english3.jpg",
  "english4.jpg",
];

export default function Pitch() {
  return (
    <>
      <div className="">
        <div className="bg-[#589EEE] h-[70px]"></div>

        {image.map((img, index) => (
          <Image
            key={index}
            alt={`English Service + ${index}`}
            src={getAssetPath(`/hero/${img}`)}
            width={1920}
            height={1080}
            className="object-cover w-full h-auto"
          />
        ))}
      </div>
    </>
  );
}
