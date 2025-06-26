"use client"
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'

interface SectionData {
    id: string;
    title?: string;
    name?: string;
    subtitle?: string;
    items?: string[];
    details?: string[];
    content?: string[];
    imageUrl?: string;
    width?: number;
    height?: number;
}

const MigrationGrowthPresentation = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const sections = [
        {
            id: 'intro',
            title: '移住に伴う成長',
            subtitle: 'SI THU LIN'
        },
        {
            id: 'profile',
            name: 'Mi Mi Aung (ミミアウン)',
            items: [
                '両親がアメリカに移住',
                'アメリカ生まれ',
                'ミャンマー・マレーシアで育ち'
            ],
            imageUrl: '/assets/presentation/profile1.jpg',
            width: 400,
            height: 400
        },
        {
            id: 'education',
            title: '学歴/Career',
            items: [
                'Illinois大学卒業（電子信号処理）',
                '修士課程卒業（1990）',
                'NASA DSN（宇宙ネットワーク）',
                'NASA ASD 次長就任（2013）',
                '火星ヘリプロジェクトリーダー（2015～）',
                'Amazon Kuiper Systems 取締役（2021～）'
            ],
            imageUrl: '/assets/presentation/nasa.jpg',
            width: 550,
            height: 550
        },
        {
            id: 'project',
            title: '火星ヘリプロジェクト',
            items: [
                '火星におけるヘリ飛行試験',
                '高難易度の取り組み',
                '開発資金2,300万$',
                '重さ2 kg以下'
            ],
            imageUrl: '/assets/presentation/marsHeli.jpg',
            width: 600,
            height: 600
        },
        {
            id: 'whitehouse',
            title: '2021/04 バイデン大統領に報告',
            content: [
                'NASA\'S PERSEVERANCE ROVER',
                'AND INGENUITY HELICOPTER',
                'THE WHITE HOUSE DESIGNATION'
            ],
            imageUrl: '/assets/presentation/whiteHouse.jpg',
            width: 500,
            height: 500
        },
        {
            id: 'current',
            title: '現役',
            items: [
                'Amazon Kuiper Systems 理事長',
                '地球低軌道（2000km以下）における衛星ネットワーク向上'
            ],
            imageUrl: '/assets/presentation/amazonProject.jpg',
            width: 500,
            height: 300
        },
        {
            id: 'family',
            title: '家族の背景',
            items: [
                '両親が移住者（アメリカ）',
                'ミャンマー・マレーシアで育ち',
                '移住 → USA'
            ],
            imageUrl: '/assets/presentation/family.jpg',
            width: 1000,
            height: 600
        },

        {
            id: 'summary',
            title: 'まとめ',
            items: [
                '育った環境によって生活が左右する',
                '移住する→成長の機会が増える'
            ],
        }
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
                    className="text-8xl font-bold mb-4"
                    initial={{y: -100, opacity: 0}}
                    animate={{y: -30, opacity: 1}}
                    transition={{delay: 5, duration: 1}}
                >
                    移住に伴う成長
                </motion.h1>
                <motion.p
                    className="text-4xl font-bold"
                    initial={{opacity: 0}}
                    animate={{y:100, opacity: 1}}
                    transition={{delay: 1.5, duration: 0.8}}
                >
                    SI THU LIN
                </motion.p>
                <motion.p
                    className="text-3xl font-bold"
                    initial={{opacity: 0}}
                    animate={{y:100, opacity: 1}}
                    transition={{delay: 2, duration: 0.8}}
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

const Section = ({ section, index }: { section: SectionData; index: number }) => {
    return (
        <motion.section
            id={section.id}
            className="py-24 border-b border-gray-200 last:border-0 scroll-mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
        >
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Content on the left */}
                <div className="flex-1">
                    <motion.h2
                        className="text-5xl font-bold mb-8"
                        whileHover={{ scale: 1.02 }}
                    >
                        {section.title || section.name}
                    </motion.h2>

                    {section.items ? (
                        <ul className="space-y-4 text-3xl">
                            {section.items.map((item, i) => (
                                <motion.li
                                    key={i}
                                    className="flex items-start"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    <span className="mr-2 ${}">•</span>
                                    {item.includes("2015") ?
                                    <span className={"text-amber-900 text-4xl"}>{item}</span> :
                                    item
                                    }
                                </motion.li>
                            ))}
                        </ul>
                    ) : section.details ? (
                        <ul className="space-y-4 text-lg">
                            {section.details.map((item, i) => (
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
                        <div className="mt-8 p-6 bg-gray-100 border-l-4 border-black">
                            {section.content.map((line, i) => (
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
                </div>

                {/* Image on the right */}
                {section.imageUrl && (
                    <motion.div
                        className="w-full lg:w-[40%] h-64 lg:h-96 relative mt-8 lg:mt-0"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Image
                            src={section.imageUrl}
                            alt={`${section.title || section.name || ''} image`}
                            className="object-cover object-center rounded-lg shadow-lg"
                            priority={index < 3}
                            width={section.width}
                            height={section.height}
                        />
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
};


export default MigrationGrowthPresentation;