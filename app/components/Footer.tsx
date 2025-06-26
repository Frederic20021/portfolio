import React from 'react';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 px-6 md:px-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="footer-logo">
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">LINGLISH</h3>
                    <p className="text-gray-400">日本人のためのパーソナライズド英語コーチング</p>
                </div>

                <div className="footer-links">
                    <h4 className="text-lg font-semibold mb-4">リンク</h4>
                    <ul className="space-y-2">
                        {['サービスの特徴', 'プラン', '講師について', 'お問い合わせ'].map((item) => (
                            <li key={item}>
                                <a
                                    href={`#${item}`}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
                    <p className="text-gray-400 mb-4">Email: info@linglish.jp</p>
                    <div className="social-icons flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FaTwitter size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FaInstagram size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FaFacebook size={24} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>© {new Date().getFullYear()} LINGLISH All Rights Reserved.</p>
            </div>
        </footer>
    );
};