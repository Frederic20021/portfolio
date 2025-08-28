"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../interfaces/types';
import emailjs from "@emailjs/browser";

export const Contact: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        level: 'beginner',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error message

        try {
            const result = await emailjs.send(
                "service_mvj6kjl", // Replace with your EmailJS service ID
                "template_8l3j228", // Replace with your EmailJS template ID
                {
                    from_name: email.substring(0, email.indexOf("@")),
                    from_email: email,
                    to_name: email.substring(email.indexOf("@")),
                    to_email: "frederic123.bf@gmail.com",
                },
                "6QoeQf_j3aOl01Tut" // Replace with your EmailJS public key
            );
            console.log('Success:', result);
            setEmail(''); // Clear the input after successful submission
            setIsSubmitted(false);
        } catch (error) {
            console.error('Error sending email:', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="お問い合わせ" className="py-16 px-6 md:px-12 bg-gray-50">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">無料相談のお申し込み</h2>
                    <p className="text-gray-600">
                        まずは30分の無料相談で、あなたの英語学習の目標や課題をお聞かせください。<br className="hidden md:block" />
                        最適な学習プランをご提案いたします。
                    </p>
                </div>

                {isSubmitted ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
                    >
                        <strong className="font-bold">送信完了！</strong>
                        <span className="block sm:inline"> お問い合わせありがとうございます。2営業日以内にご返信いたします。</span>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="bg-white p-6 md:p-8 rounded-lg shadow-md"
                    >
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">お名前</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">メールアドレス</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="level" className="block text-gray-700 font-medium mb-2">現在の英語レベル</label>
                            <select
                                id="level"
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="beginner">初心者</option>
                                <option value="intermediate">中級者</option>
                                <option value="advanced">上級者</option>
                                <option value="other">その他</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">相談したい内容・目標</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
                        >
                            {loading ? '送信中' : '送信'}
                        </motion.button>
                    </motion.form>
                )}
            </div>
        </section>
    );
};