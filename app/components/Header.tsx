"use client"
import React from 'react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
            <div className="logo">
                <h1 className="text-3xl font-bold text-blue-600 text-center">LINGLISH</h1>
                <p className="text-xs text-gray-900">日本人のためのパーソナライズド英語コーチング</p>
            </div>

            <nav className="hidden md:block">
                <ul className="flex space-x-8">
                    {['サービスの特徴', 'プラン', '講師について', 'お問い合わせ'].map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item}`}
                                className="text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
            >
                <a
                    href="#お問い合わせ"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    無料相談する
                </a>
            </motion.div>

            <button className="md:hidden text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </header>
    );
};