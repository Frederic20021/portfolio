import React from 'react';
import Image from "next/image";
import { FaGlobeAsia } from "react-icons/fa";

const Hero = () => {
    return (
        <section className="relative text-white overflow-hidden">
            <div
                className="relative aspect-video flex flex-col"
                style={{
                    backgroundImage: `url(/assets/worldMap.jpg)`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    boxShadow: "0px 10px 30px black"
                }}
            >
                <div className="text-center p-8 max-w-[1000px] mx-auto rounded-full backdrop-blur">
                    <h1 className="text-5xl font-bold grid gap-4">
                        <span className={"text-3xl"}>Study Abroad with Full Tuition Exemption</span>
                        <span>
                            Your Ticket to Exploring the <span className={"text-green-500 text-6xl"}>W<FaGlobeAsia className={"inline size-7"}/>rld!</span>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mt-4 mx-auto">
                        Achieve your dream of traveling the world as you pursue your degree.
                    </p>

                </div>
                {/* TODO: make another component in UI to wrap the labels from a constant file */}
                {/* Canada Label */}
                <div className="absolute group flex items-center justify-center w-8 h-8 text-white rounded-full"
                     style={{
                         top: "32.5%",
                         left: "20%",
                     }}
                >
                    <div className="relative justify-center mx-auto animate-bounce">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-xs z-10">CA</span>
                        </div>
                        <div
                            className="absolute w-4 h-4 bg-blue-500 rotate-45 -bottom-1 left-[50%] translate-x-[-50%]"/>
                    </div>
                    <div className={"hidden group-hover:block absolute w-[200px] h-[100px] bg-red-600 mt-40"}>Ontario
                        Tech
                        University
                    </div>
                </div>

                {/* Japan Label */}
                <div
                    className="absolute group flex items-center justify-center w-8 h-8 text-white rounded-full"
                    style={{
                        top: "38%",
                        right: "13%",
                    }}
                >
                    <div className="relative animate-bounce">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs z-10">JP</span>
                        </div>
                        <div
                            className="absolute w-4 h-4 bg-red-500 rotate-45 -bottom-1 left-[50%] translate-x-[-50%]"/>
                    </div>
                    <div className={"hidden group-hover:block absolute w-[200px] h-[100px] bg-red-600 mt-40"}>Shizuoka
                        University
                    </div>
                </div>
                <Image
                    className={"absolute -bottom-7 left-1/2 transform -translate-x-1/2"}
                    src={"/assets/scholar.png"}
                    alt={"Scholar"}
                    width={400}
                    height={400}/>
            </div>
        </section>
    );
};

export default Hero;
{//top-[45%] left-[35%] translate-x-[-50%] translate-y-[-50]
}