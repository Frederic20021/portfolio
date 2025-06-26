"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";

export const About: React.FC = () => {
    return (
        <section id="講師について" className="py-16 px-6 md:px-12 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">講師紹介</h2>
                    <p className="text-gray-600">経験豊富な講師があなたの英語学習をサポートします</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="md:w-1/3"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                            alt="講師の写真"
                            className="rounded-lg shadow-xl w-full h-auto"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="md:w-2/3"
                    >
                        <h3 className="text-2xl font-semibold mb-4">LINGLISH 代表講師</h3>
                        <ul className="space-y-3 mb-6">
                            {[
                                '日本語能力試験N1取得',
                                'TOEIC 940点',
                                'カナダ留学経験',
                                '3年間の英語指導経験'
                            ].map((item) => (
                                <li key={item} className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-gray-700">
                            「日本人がつまずきやすいポイントを理解した上で、効率的に英語力を伸ばす指導」をモットーにしています。教科書英語ではなく、実際に使える英語を教えることにこだわっています。
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};