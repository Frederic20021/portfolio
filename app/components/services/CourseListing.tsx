"use client";

import Image from "next/image";
import React, { useState } from "react";
import Calendar from 'react-calendar';
import { getAssetPath } from "../../utils/paths";
import { courses } from "@/app/constants/english";
// Add calendar CSS import
import 'react-calendar/dist/Calendar.css';


// Individual course card component
const CourseCard = ({ course }: { course: (typeof courses)[0] }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setShowCalendar(false);
      // Here you can add logic to handle the selected date
      alert(`選択された日程: ${value.toLocaleDateString('ja-JP')}`);

    }
  };

  return (
    <div className="grid md:flex bg-white justify-between mx-auto shadow-lg overflow-hidden mb-6">
      <div className="flex">
        {/* Blue accent bar */}
        <div className="w-16 max-md:hidden bg-blue-600"></div>

        {/* Main content */}
        <div className="grid py-2 px-6 justify-around gap-2">
          {/* Tags */}
          <div className="flex justify-between p-2 my-2 md:gap-4 gap-2 items-center">
            <div className="flex gap-2 items-center">
              {course.tags.map((tag, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 ${
                    tag === "月額" ? "bg-gray-400" : "bg-blue-400"
                  } text-white font-bold text-sm `}
                >
                  <span>{tag}</span>
                </div>
              ))}
            </div>
            {/* Pricing */}
            <div className="md:flex justify-center items-center grid gap-4 md:text-lg text-sm font-bold text-blue-600 ">
              <span>🕐{course.pricing.duration}</span>
              <span>{course.pricing.price}</span>
            </div>
          </div>

          {/* Course title */}
          <h3 className=" font-bold text-black">{course.title}</h3>

          <div className="flex gap-8 items-center">
            <Image
              src={getAssetPath(course.image)}
              alt={course.title}
              width={150}
              height={150}
              className="object-cover"
            />
            <div className="grid md:max-w-[500px] max-w-[150px]">
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {course.description}
              </p>

              {/* Features */}
              <div className="space-y-1 text-sm text-gray-700">
                <div><span className="text-blue-500">三者面談</span>: {course.features.interview}</div>
                <div><span className="text-blue-500">無料体験</span>: {course.features.freeTrial}</div>
                <div><span className="text-blue-500">学年</span>: {course.features.grade}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Pricing and actions */}
      <div className="w-80 p-6 flex flex-col bg-[#EDF6FF] justify-center relative">
        {/* Action buttons */}
        <div className="space-y-3 font-bold">
          <button 
            className="w-full cursor-pointer bg-gradient-to-br from-blue-500 to-blue-300 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors"
            onClick={() => window.open(course.link, '_blank')}
          >
            <span>お試し無料体験を<br />申し込む</span>
          </button>
          <button 
            className="w-full cursor-pointer hover:shadow-lg bg-white bg-gradient-to-b from-white via-blue-300 to-blue-500 text-blue-900 border border-blue-500 py-3 px-4 rounded-lg transition-colors flex items-center gap-10"
            onClick={() => {
              console.log('Button clicked, showCalendar will be:', !showCalendar);
              setShowCalendar(!showCalendar);
            }}
          >
            <span>+</span>
            <span>日程調整する {showCalendar ? '(開)' : '(閉)'}</span>
          </button>
        </div>

        {/* Calendar Modal */}
        {showCalendar && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-red-500 rounded-lg shadow-2xl z-[9999] p-4 w-96 max-w-[90vw]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">日程を選択してください</h3>
              <button
                onClick={() => {
                  console.log('Closing calendar');
                  setShowCalendar(false);
                }}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={new Date()}
              className="w-full text-black"
              locale="ja-JP"
            />
            <div className="mt-2 text-sm text-gray-600">
              Calendar state: {showCalendar ? 'Open' : 'Closed'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main course listing section
const CourseListing = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-blue-600">
              オンライン指導コース一覧
            </h2>
          </div>
        </div>

        {/* Course cards */}
        <div className="space-y-6 ">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseListing;
