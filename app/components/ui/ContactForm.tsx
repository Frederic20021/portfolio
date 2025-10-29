'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { serviceID, contactTemplateID, publicKey } from '@/app/constants/emailjs';



export default function ContactForm() {

  const [formData, setFormData] = useState({
    user_name: '',
    company_name: '',
    user_email: '',
    phone_number: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(serviceID, contactTemplateID, formData, publicKey);
      alert('メッセージが送信されました！');
      setFormData({
        user_name: '',
        company_name: '',
        user_email: '',
        phone_number: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.log('FAILED...', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-8 bg-gray-50 text-black grid gap-8 justify-center px-4">
        <h3 className="mx-auto text-center text-lg md:text-xl">以下のフォームよりお問い合わせください。</h3> 
        <form onSubmit={handleSubmit} className="grid gap-4 w-full max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium mb-2">お名前（必須）</label>
            <input 
              type="text" 
              name="user_name" 
              required 
              value={formData.user_name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">会社名（法人の方は必ずご入力ください）</label>
            <input 
              type="text" 
              name="company_name" 
              value={formData.company_name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">メールアドレス（必須）</label>
            <input 
              type="email" 
              name="user_email" 
              value={formData.user_email}
              onChange={handleChange}
              required 
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">電話番号</label>
            <input 
              type="tel" 
              name="phone_number" 
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">題名（必須）</label>
            <input 
              type="text" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              required 
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">メッセージ本文（必須）</label>
            <textarea 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required 
              className="w-full border border-gray-300 p-3 rounded-md focus:border-blue-500 focus:outline-none" 
              rows={5} 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white p-3 rounded-md mt-4 transition-colors font-medium"
          >
            {isSubmitting ? '送信中...' : '送信'}
          </button>
        </form>
      </section>
    </>
  );
}