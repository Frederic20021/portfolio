import Image from "next/image";
import { getAssetPath } from "../../utils/paths";

const image = [
  "/english/english1.jpg",
  "/english/english2.jpg",
];

export default function Pitch() {
  return (
    <>
        <div className="bg-[#589EEE] h-[120px]"></div>

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
    </>
  );
}
