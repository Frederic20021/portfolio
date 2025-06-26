import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Plans } from '../components/Plans';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

const Page = () => {
    return (
        <div className="font-sans text-gray-800">
            <Header />
            <main>
                <Hero />
                <Features />
                <Plans />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Page;