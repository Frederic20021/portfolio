import React from 'react';

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-blue-500 via-purple-600 to-red-500 flex items-center justify-center text-white overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <div className="w-40 h-40 bg-pink-400 rounded-full blur-[150px] opacity-50 absolute top-10 left-10 animate-pulse"></div>
                <div className="w-60 h-60 bg-blue-300 rounded-full blur-[150px] opacity-50 absolute bottom-20 right-20 animate-pulse"></div>
            </div>

            <div className="text-center space-y-8 my-4 px-4">
                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold grid gap-4">
                    <span className={"text-4xl"}>Study Abroad with Full Tuition Exemption</span>
                    <span>Your Ticket to Exploring the World!</span>
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    Unlock your academic dreams by studying in <span className="text-pink-300">Japan</span> or through exciting exchange programs in <span className="text-blue-300">Canada</span>.
                </p>

                {/* Interactive Buttons */}
                <div className="flex justify-center gap-4">
                    <button className="bg-yellow-300 text-black px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                        Explore Japan
                    </button>
                    <button className="bg-blue-300 text-black px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                        Explore Canada
                    </button>
                </div>
            </div>

        </section>
    );
};

export default Hero;
