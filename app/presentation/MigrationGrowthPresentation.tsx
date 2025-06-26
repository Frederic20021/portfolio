"use client"
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const MigrationGrowthPresentation = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const sections = [
        { id: 'intro', title: '移住に伴う成長', subtitle: 'SI THU LIN' },
        { id: 'profile', name: 'Mi Mi Aung (ミミアウン)', details: [
                '両親がアメリカに移住',
                'アメリカ生まれ',
                'ミャンマー・マレーシアで育ち'
            ]},
        { id: 'education', title: '学歴/Career', items: [
                'Illinois大学卒業（電子信号処理）',
                '修士課程卒業（1990）',
                'NASA DSN（宇宙ネットワーク）',
                'NASA ASD 次長就任（2013）',
                '火星ヘリプロジェクトリーダー（2015～）',
                'Amazon Kuiper Systems 取締役（2021～）'
            ]},
        { id: 'project', title: '火星ヘリプロジェクト', items: [
                '火星におけるヘリ飛行試験',
                '高難易度の取り組み',
                '開発資金2,300万$',
                '重さ2 kg以下'
            ]},
        { id: 'whitehouse', title: '2021/04 バイデン大統領に報告', content: [
                'NASA\'S PERSEVERANCE ROVER',
                'AND INGENUITY HELICOPTER',
                'THE WHITE HOUSE DESIGNATION'
            ]},
        { id: 'current', title: '現役', items: [
                'Amazon Kuiper Systems 理事長',
                '地球低軌道（2000km以下）における衛星ネットワーク向上'
            ]},
        { id: 'family', title: '家族の背景', items: [
                '両親が移住者（アメリカ）',
                'ミャンマー・マレーシアで育ち',
                '移住 → USA'
            ]},
        { id: 'summary', title: 'まとめ', items: [
                '育った環境によって生活が左右する',
                '移住する→成長の機会が増える'
            ]}
    ];

    return (
        <div ref={containerRef} className="font-sans bg-white text-gray-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full h-[100px] bg-white flex items-center z-50 shadow-sm py-4">
                <div className="container mx-auto px-6 flex justify-between">
                    <div className="font-bold text-xl">移住に伴う成長</div>
                    <div className="flex justify-between gap-6">
                        {sections.map((section) => (
                            <motion.a
                                key={section.id}
                                href={`#${section.id}`}
                                className="font-bold hover:text-gray-600 hover:text-xl transition-colors"
                            >
                                {section.title || section.name}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <motion.section
                id="intro"
                className="h-screen flex flex-col justify-center items-center bg-black text-white"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <motion.h1
                    className="text-7xl font-bold mb-4"
                    initial={{y: -100, opacity: 0}}
                    animate={{y: -30, opacity: 1}}
                    transition={{delay: 4, duration: 1}}
                >
                    移住に伴う成長
                </motion.h1>
                <motion.p
                    className="text-2xl font-bold"
                    initial={{opacity: 0}}
                    animate={{y:20, opacity: 1}}
                    transition={{delay: 0.8, duration: 0.8}}
                >
                    SI THU LIN
                </motion.p>
                <motion.p
                    className="text-xl font-bold"
                    initial={{opacity: 0}}
                    animate={{y:20, opacity: 1}}
                    transition={{delay: 1.5, duration: 0.8}}
                >
                    7021 0703
                </motion.p>
            </motion.section>

            {/* Content Sections */}
            <div className="container mx-auto px-6 py-12">
                {sections.slice(1).map((section, index) => (
                    <Section key={section.id} section={section} index={index}/>
                ))}
            </div>
        </div>
    );
};

const Section = ({ section, index }: { section: any; index: number }) => {
    return (
        <motion.section
            id={section.id}
            className="py-24 border-b border-gray-200 last:border-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
        >
            <motion.h2
                className="text-4xl font-bold mb-12"
                whileHover={{ scale: 1.02 }}
            >
                {section.title || section.name}
            </motion.h2>

            {section.items ? (
                <ul className="space-y-4 text-2xl">
                    {section.items.map((item: string, i: number) => (
                        <motion.li
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i }}
                        >
                            <span className="mr-2">•</span> {item}
                        </motion.li>
                    ))}
                </ul>
            ) : section.details ? (
                <ul className="space-y-4 text-lg">
                    {section.details.map((item: string, i: number) => (
                        <motion.li
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i }}
                        >
                            <span className="mr-2">•</span> {item}
                        </motion.li>
                    ))}
                </ul>
            ) : null}

            {section.content && (
                <div className="mt-12 p-8 bg-gray-100 border-l-4 border-black">
                    {section.content.map((line: string, i: number) => (
                        <motion.p
                            key={i}
                            className="text-2xl mb-2 last:mb-0"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 * i }}
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>
            )}
        </motion.section>
    );
};

export default MigrationGrowthPresentation;