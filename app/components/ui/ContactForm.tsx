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
      <section className="py-8 bg-gray-50 text-black grid gap-8 justify-center">
        <h3 className="mx-auto">以下のフォームよりお問い合わせください。</h3> 
        <form ref={form} onSubmit={sendEmail} className="grid gap-2 max-w-md">
          <label>お名前（必須）</label>
          <input 
            type="text" 
            name="user_name" 
            required 
            className="border p-2 rounded" 
          />
          
          <label>会社名（法人の方は必ずご入力ください）</label>
          <input 
            type="text" 
            name="company_name" 
            className="border p-2 rounded" 
          />
          
          <label>メールアドレス（必須）</label>
          <input 
            type="email" 
            name="user_email" 
            required 
            className="border p-2 rounded" 
          />
          
          <label>電話番号</label>
          <input 
            type="tel" 
            name="phone_number" 
            className="border p-2 rounded" 
          />
          
          <label>題名（必須）</label>
          <input 
            type="text" 
            name="subject" 
            required 
            className="border p-2 rounded" 
          />
          
          <label>メッセージ本文（必須）</label>
          <textarea 
            name="message" 
            required 
            className="border p-2 rounded" 
            rows={4} 
          />
          
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white p-3 rounded mt-4 transition-colors"
          >
            送信
          </button>
        </form>
      </section>
    </>
  );
}