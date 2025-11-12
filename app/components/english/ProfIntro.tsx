'use client';

import { ProfInfo, courses } from "@/app/constants/english";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProfIntro() {
  const [selectedProf, setSelectedProf] = useState<string | null>(null);
  const [courseSelected, setCourseSelected] = useState<typeof courses>([]);

  // Fix: Calculate courseSelected after selectedProf changes
 useEffect(() => {
    console.log("useEffect triggered, selectedProf:", selectedProf);
    console.log("Available courses:", courses);
    console.log("All professor names in courses:", courses.map(course => course.prof));
    
    if (selectedProf) {
        const filtered = courses.filter(course => course.prof === selectedProf.toUpperCase());
        setCourseSelected(filtered);
        console.log("Selected prof:", selectedProf);
        console.log("Filtered courses:", filtered);
        console.log("Number of filtered courses:", filtered.length);
    } else {
        setCourseSelected([]);
    }
}, [selectedProf]);

  const handleSelectProf = (profName: string) => {
    console.log("handleSelectProf called with:", profName);
    setSelectedProf(profName);
  };
  return (
    <div
      id="profIntro"
      className="grid items-center gap-2 md:gap-4 px-4 md:px-8 lg:p-12 bg-blue-50 mx-auto"
    >
      <h2
        className="text-3xl md:text-5xl font-extrabold text-left bg-gradient-to-r from-[#3375C0] via-[#1A3C63] text-transparent bg-clip-text mb-4 md:mb-6"
        style={{
          fontFamily: "'Noto Serif Japanese'",
          letterSpacing: "0em",
        }}
      >
        講師紹介
      </h2>
      <div className="md:p-4 gap-12 md:gap-8 grid md:grid-cols-3 mx-auto items-stretch ">
        {ProfInfo.map((prof) => (
          <div
            key={prof.id}
            className="flex flex-col bg-white p-2 md:p-4 h-full hover:translate-y-[-30px] transition-transform duration-500 cursor-pointer"
            onClick={() => handleSelectProf(prof.name)}
          >
            <div className="w-[200px] h-[200px] mx-auto">
              <Image
                src={prof.image}
                alt={prof.name}
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            <div className="bg-amber-400 w-[100px] md:w-[150px] ml-[-15px] text-white">
              <span
                className="text-sm md:text-xl text-center"
                style={{ fontFamily: "Yu Gothic" }}
              >
                Profile
              </span>
            </div>
            <div className="grid bg-white gap-2 md:gap-4 flex-1">
              <div
                style={{ fontFamily: "Yu Gothic" }}
                className="text-base md:text-lg lg:text-xl bg-gradient-to-r from-black to-gray-600 py-1 md:py-2"
              >
                <h3 className="font-bold text-2xl text-center text-white">
                  {prof.name}&nbsp;&nbsp;&nbsp;&nbsp;講師
                </h3>
                <p className="font-semibold lg:pl-16 pl-14 md:pl-4 text-white">
                  ({prof.kana})
                </p>
              </div>

              {prof.sections.map((section, index) => (
                <div className="font-bold pl-4 md:pl-8" key={index}>
                  <h2 className="text-sm md:text-base bg-gradient-to-r from-blue-400 via-blue-900 to-blue-800 text-transparent bg-clip-text font-bold mb-1 md:mb-2">
                    {section.title}
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-xs md:text-sm text-gray-700 whitespace-pre"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/*modal section*/}
      {selectedProf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedProf(null)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedProf} 講師のコース一覧
            </h2>
            <div className="space-y-8 max-h-[70vh] overflow-y-auto">
              {courseSelected.length > 0 ? (
                courseSelected.map((course) => (
                  <div
                    key={course.id}
                    className=" p-4 border border-gray-200 rounded-lg"
                  >
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {course.title}
                      </h3>
                    <div className="flex justify-around items-center">
                      <div className="flex flex-col">
                      <p className="text-gray-600 mb-1">
                        <span className="font-bold">種類:</span>{" "}
                        {course.payType}
                      </p>
                      <p className="text-gray-600 mb-1">
                        <span className="font-bold">時間:</span>{" "}
                        {course.pricing.duration}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-bold">価格:</span>{" "}
                        {course.pricing.price}
                      </p>
                      </div>
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                    <span 
                    style={{fontFamily: 'Yu Gothic'}} 
                    className="hover:cursor-pointer bg-gradient-to-b from-black to-gray-600 text-white p-2 font-bold rounded-lg text-sm hover:shadow-lg hover:scale-110 duration-300"
                    onClick={() => {
                      setSelectedProf(null);
                      window.location.href = `#${course.id}`;
                    }}
                  >
                      詳細を見る
                    </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  この講師のコースは現在ありません。
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}