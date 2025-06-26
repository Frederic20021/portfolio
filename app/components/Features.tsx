"use client"
import React from 'react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: '✍️',
        title: 'パーソナライズド添削',
        description: '毎週提出する小エッセイや文章を丁寧に添削。あなたの弱点に合わせたフィードバックで、確実にライティング力を向上させます。',
        time: '30-40分/回'
    },
    {
        icon: '📰',
        title: '実践的な英語学習',
        description: '教科書ではなく、最新のニュースや記事を使用。リアルな英語表現を学びながら、時事問題への理解も深まります。',
        time: '30-40分/回'
    },
    {
        icon: '🗣️',
        title: '発音矯正セッション',
        description: '1対1の会話セッションで発音を徹底指導。ネイティブに通じるクリアな発音を身につけます。',
        time: '15-30分/回'
    }
];

export const Features: React.FC = () => {
    return (
        <section id="サービスの特徴" className="py-16 px-6 md:px-12 bg-white">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">LINGLISHの3つの特徴</h2>
                <p className="text-gray-600">効果的な学習メソッドで、確実に英語力を向上させます</p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <p className="text-blue-600 font-medium">{feature.time}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};