'use client';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { serviceID, contactTemplateID, publicKey } from '@/app/constants/emailjs';

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(serviceID, contactTemplateID, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          // Reset form after successful submission
          form.current?.reset();
          alert('メッセージが送信されました！');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('送信に失敗しました。もう一度お試しください。');
        },
      );
  };

  return (
    <>
      <section className="py-8 bg-gray-50 text-black grid gap-8 justify-center px-4">
        <h3 className="mx-auto text-center text-lg md:text-xl">以下のフォームよりお問い合わせください。</h3> 
        <form ref={form} onSubmit={sendEmail} className="grid gap-4 w-full max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium mb-2">お名前（必須）</label>
            <input 
              type="text" 
              name="user_name" 
              required 
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">会社名（法人の方は必ずご入力ください）</label>
            <input 
              type="text" 
              name="company_name" 
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">メールアドレス（必須）</label>
            <input 
              type="email" 
              name="user_email" 
              required 
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">電話番号</label>
            <input 
              type="tel" 
              name="phone_number" 
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">題名（必須）</label>
            <input 
              type="text" 
              name="subject" 
              required 
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">メッセージ本文（必須）</label>
            <textarea 
              name="message" 
              required 
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
              rows={5} 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white p-3 rounded-md mt-4 transition-colors font-medium"
          >
            送信
          </button>
        </form>
      </section>
    </>
  );
}