'use client'

import Image from "next/image";
import BTN from "../ui/BTN";

const image = [
  "/offshore/offshore1.jpg",
  "/offshore/offshore2.jpg",
  "/offshore/offshore3.jpg",
  "/offshore/offshore4.jpg",
  "/offshore/offshore5.jpg",
  "/offshore/offshore6.jpg",
];

export default function Pitch() {
  return (
    <>
        {image.map((img, index) => (
          <div key={index} className="flex bg-white flex-col items-center">
          {index === 1 ? (
            <BTN text="エンパワー＆リンクについて" href="/" />
          ) : index === 2 ? (
            <BTN text="料金プランを見る" href={`#price-plan`} />
          ) : null}
          <Image
            id={`${index}`}
            alt={`Offshore Service + ${index}`}
            src={img}
            width={1920}
            height={1080}
            className="object-cover w-full h-auto"
          />
          </div>
        ))}
    </>
  );
}
