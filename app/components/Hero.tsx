"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";

export const Hero: React.FC = () => {
    return (
        <section className="py-12 px-6 md:px-12 bg-gradient-to-r from-blue-50 to-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:w-1/2 mb-8 md:mb-0 text-white"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        「使える英語」を<br className="hidden md:block" />効率的に学ぶ
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-8">
                        教科書ではなく、実践的な英語力を身につける<br className="hidden md:block" />パーソナライズド英語コーチングサービス
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#お問い合わせ"
                            className="bg-blue-600 text-white px-6 py-3 rounded-md text-center hover:bg-blue-700 transition-colors"
                        >
                            無料相談する
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#サービスの特徴"
                            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-center hover:bg-blue-50 transition-colors"
                        >
                            詳しく見る
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:w-1/2"
                >
                    <Image
                        src="/assets/language/flyer.png"
                        alt="楽しく英語を学ぶイメージ"
                        className="rounded-lg shadow-xl w-full h-auto"
                        width={300}
                        height={300}
                    />
                </motion.div>
            </div>
        </section>
    );
};