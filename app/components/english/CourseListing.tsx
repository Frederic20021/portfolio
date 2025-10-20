"use client";

import Image from "next/image";
import React, { useState } from "react";
import Calendar from 'react-calendar';
import emailjs from '@emailjs/browser';
import { getAssetPath } from "../../utils/paths";
import { courses } from "@/app/constants/english";
import { serviceID, templateID, publicKey } from "@/app/constants/emailjs";
// Add calendar CSS import
import 'react-calendar/dist/Calendar.css';

// Individual course card component
const CourseCard = ({ course }: { course: (typeof courses)[0] }) => {
  // Booking flow states
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', 
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  // Step 1: Handle date selection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setShowCalendar(false);
      setShowTimeSlots(true); // Move to time selection
    }
  };

  // Step 2: Handle time selection  
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setShowTimeSlots(false);
    setShowUserForm(true); // Move to user info form
  };

  // Step 3: Handle booking submission
  const handleBookingSubmit = async () => {
    if (!userInfo.name || !userInfo.email) {
      alert('お名前とメールアドレスは必須項目です。');
      return;
    }

  
    if (selectedDate && selectedTime) {
      const formattedDate = selectedDate.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
      
      const appointmentDateTime = `${formattedDate} ${selectedTime}`;
      
      try {
        // EmailJS configuration - Replace with your actual values
        
        // Redirect to Stripe payment link
        const stripePaymentLink = course.stripeLink;
        window.open(stripePaymentLink, '_blank');
        
        const templateParams = {
          to_email: 'frederic123.bf@gmail.com',
          from_name: userInfo.name,
          from_email: userInfo.email,
          customer_phone: userInfo.phone || '未記入',
          course_name: course.title,
          course_price: course.pricing.price,
          course_duration: course.pricing.duration,
          appointment_datetime: appointmentDateTime,
          customer_message: userInfo.message || '特になし',
          subject: `【新規予約】${course.title} - ${userInfo.name}様`
        };

        await emailjs.send(serviceID, templateID, templateParams, publicKey);
        
        alert(
          `✅ 予約リクエストを送信いたしました！\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `📋 ご予約内容の確認\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `📚 コース名: ${course.title}\n` +
          `📅 ご希望日時: ${appointmentDateTime}\n` +
          `👤 お名前: ${userInfo.name}様\n` +
          `📧 メールアドレス: ${userInfo.email}\n` +
          `📱 電話番号: ${userInfo.phone || '未記入'}\n` +
          `💬 ご要望: ${userInfo.message || '特になし'}\n\n` +
          `📩 24時間以内に確認メールをお送りいたします。\n` +
          `ご不明な点がございましたら、お気軽にお問い合わせください。\n\n` +
          `次のページでお支払い手続きにお進みください。\n` +
          `ありがとうございました！`
        );
        
        
        resetBooking();
      } catch (error) {
        console.error('EmailJS error:', error);
        alert(
          `申し訳ございません。送信中にエラーが発生いたしました。\n\n` +
          `📧 EmailJS の設定が必要です。\n` +
          `🔧 開発者にお問い合わせいただくか、\n` +
          `📞 お急ぎの場合は直接お電話にてご連絡ください。\n\n` +
          `ご不便をおかけして申し訳ございません。`
        );
      }
    }
  };

  // Reset all booking states
  const resetBooking = () => {
    setShowCalendar(false);
    setShowTimeSlots(false);
    setShowUserForm(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setUserInfo({ name: '', email: '', phone: '', message: '' });
  };

  // Handle main booking button click
  const handleBookingButtonClick = () => {
    if (selectedDate && selectedTime && userInfo.name) {
      // Reset if booking is complete
      resetBooking();
    } else {
      // Start booking process
      setShowCalendar(true);
    }
  };

  // Get button text based on current state
  const getButtonText = () => {
    if (selectedDate && selectedTime && userInfo.name) {
      return '予約をリセット';
    } else {
      return '日程調整する';
    }
  };

  return (
    <div
      id="courses"
      className="grid md:flex justify-center bg-white md:justify-between md:mx-auto md:max-w-[1000px] shadow-lg overflow-hidden mb-6"
    >
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
                  } text-white font-bold text-sm`}
                >
                  <span>{tag}</span>
                </div>
              ))}
            </div>
            {/* Pricing */}
            <div className="md:flex justify-center items-center grid gap-4 md:text-lg text-sm font-bold text-blue-600">
              <span>🕐{course.pricing.duration}</span>
              <span>{course.pricing.price}</span>
            </div>
          </div>

          {/* Course title */}
          <h3 className="font-bold text-black">{course.title}</h3>

          <div className="flex gap-8 items-center">
            <Image
              src={getAssetPath(course.image)}
              alt={course.title}
              width={150}
              height={150}
              className="object-cover"
            />
            <div className="grid md:max-w-[500px] max-w-[250px]">
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {course.description}
              </p>

              <div className="grid md:flex items-center justify-around">
                {/* Features */}
                  <div className="grid text-black gap-2">
                  <div>
                    <span className="text-blue-500">三者面談</span>:&nbsp;
                    {course.features.interview}
                  </div>
                  <div>
                    <span className="text-blue-500">無料体験</span>:&nbsp;
                    {course.features.freeTrial}
                  </div>

                  </div>
                  <div className="gap-2 text-white grid">
                    <span className="bg-gradient-to-r from-blue-400 to-blue-800 text-center p-2 font-bold mt-8 rounded-lg">
                      担当講師
                    </span>
                    <span className="bg-gradient-to-r from-gray-600 to-black text-center p-2 font-bold">
                      {course.prof}
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Pricing and actions */}
      <div className="mx-auto w-80 p-6 flex flex-col bg-[#EDF6FF] justify-center relative">
        {/* Action buttons */}
        <div className="space-y-3 font-bold">
          <div className="w-full text-center bg-gradient-to-br from-blue-500 to-blue-300 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors">
            <span>
              お試し無料体験を
              <br />
              申し込む
            </span>
          </div>
          <button
            className="w-full cursor-pointer hover:shadow-lg bg-white bg-gradient-to-b from-white via-blue-300 to-blue-500 text-blue-900 border border-blue-500 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-4"
            onClick={handleBookingButtonClick}
          >
            <span>+</span>
            <span className="">{getButtonText()}</span>
          </button>
        </div>

        {/* Step 1: Calendar Modal */}
        {showCalendar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-96 max-w-[90vw]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">
                  📅 STEP 1: 日程を選択
                </h3>
                <button
                  onClick={() => setShowCalendar(false)}
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
              <p className="mt-3 text-sm text-gray-600">
                ご希望の日付をクリックしてください
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Time Slots Modal */}
        {showTimeSlots && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-96 max-w-[90vw] max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">
                  ⏰ STEP 2: 時間を選択
                </h3>
                <button
                  onClick={() => {
                    setShowTimeSlots(false);
                    setShowCalendar(true);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                選択日:{" "}
                {selectedDate?.toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelection(time)}
                    className="p-2 text-sm text-black border rounded hover:bg-blue-50 hover:border-blue-500"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: User Information Form Modal */}
        {showUserForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-96 max-w-[90vw] max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">
                  👤 STEP 3: お客様情報
                </h3>
                <button
                  onClick={() => {
                    setShowUserForm(false);
                    setShowTimeSlots(true);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="mb-4 p-3 bg-blue-50 rounded">
                <p className="text-sm font-semibold text-blue-800">予約内容</p>
                <p className="text-xs text-blue-600">
                  {course.title}
                  <br />
                  {selectedDate?.toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}{" "}
                  {selectedTime}
                </p>
              </div>

              <form className="space-y-4 text-black">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    placeholder="田中太郎"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    placeholder="090-1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メッセージ・ご要望
                  </label>
                  <textarea
                    value={userInfo.message}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, message: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    rows={3}
                    placeholder="ご質問やご要望があればお書きください"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleBookingSubmit}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  予約リクエストを送信
                </button>
              </form>
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
