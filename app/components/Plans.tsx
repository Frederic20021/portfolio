"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Plan } from '../interfaces/types';

const plans: Plan[] = [
    {
        name: 'ベーシックプラン',
        price: '¥15,000',
        features: [
            '週1回のライティング添削',
            '週1回の実践英語レッスン',
            '月2回の発音矯正セッション',
            '24時間以内の質問対応'
        ]
    },
    {
        name: 'スタンダードプラン',
        price: '¥25,000',
        features: [
            '週2回のライティング添削',
            '週2回の実践英語レッゼン',
            '週1回の発音矯正セッション',
            '12時間以内の質問対応'
        ],
        isPopular: true
    },
    {
        name: 'プレミアムプラン',
        price: '¥40,000',
        features: [
            '毎日のライティング添削',
            '毎日の実践英語レッスン',
            '週2回の発音矯正セッション',
            '6時間以内の質問対応',
            '週1回の進捗レビュー'
        ]
    }
];

export const Plans: React.FC = () => {
    return (
        <section id="プラン" className="py-16 px-6 md:px-12 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">コースプラン</h2>
                <p className="text-gray-600">あなたの目標とライフスタイルに合ったプランをお選びください</p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow ${plan.isPopular ? 'border-2 border-blue-500' : ''}`}
                    >
                        {plan.isPopular && (
                            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                                人気
                            </div>
                        )}

                        <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                        <p className="text-3xl font-bold mb-6">
                            {plan.price}<span className="text-base font-normal text-gray-500">/月</span>
                        </p>

                        <ul className="mb-8 space-y-3">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#お問い合わせ"
                            className={`block text-center py-3 px-6 rounded-md font-medium ${plan.isPopular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition-colors`}
                        >
                            申し込む
                        </motion.a>
                    </motion.div>
                ))}
            </div>

            <p className="text-center text-gray-500 mt-8">※ すべてのプランで初回相談無料</p>
        </section>
    );
};