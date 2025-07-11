"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";

export const About: React.FC = () => {
    return (
        <section id="講師について" className="py-12 px-6 md:px-12 bg-black text-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl indent-4 font-bold mb-4">講師紹介</h2>
                    <p className="text-gray-300">経験豊富な講師があなたの英語学習をサポートします</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12">

                    <motion.div
                        initial={{opacity: 0, x: -40}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="md:w-2/3"
                    >
                        <h3 className="text-3xl font-semibold mb-4">LINGLISH 代表講師 <strong>(静大留学生)</strong></h3>
                        <ul className="space-y-3 mb-6 text-2xl">
                            {[
                                '日本語←→英語　バイリンガル',
                                'TOEIC 940点',
                                '🇯🇵 x 🇨🇦留学経験者',
                                '小、中、高校指導経験あり'
                            ].map((item) => (
                                <li key={item} className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="font-bold text-lg text-gray-100">
                            「日本人がつまずきやすいポイントを理解した上で、効率的に英語力を伸ばす指導」をモットーにしています。英語教科書ではなく、一人ひとりの目的、趣味に特化した英語学習サポートなので、能動性が大事！
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, x: 40}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                    >
                        <Image
                            src="/assets/LIN.png"
                            alt="講師の写真"
                            className="rounded-lg shadow-xl w-full h-auto"
                            width={600}
                            height={600}
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};