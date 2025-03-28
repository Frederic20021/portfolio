'use client'

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import { FaGlobeAsia } from "react-icons/fa";
import HeroLocationLabel from "@/app/components/ui/HeroLocationLabel";

const Hero = () => {
    const [scholarSize, setScholarSize] = useState(400); // Default size
    const [labelWH, setLabelWH] = useState(220);

    useEffect(() => {
        const updateSize = () => {
            setScholarSize(window.innerWidth >= 1024 ? 400 : window.innerWidth >= 768 ? 280 : 150);
        };

        updateSize(); // Set initial size
        window.addEventListener("resize", updateSize); // Listen to resize events
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        const updateWH = () => {
            setLabelWH(window.innerWidth >= 1024 ? 220 : window.innerWidth >= 768 ? 130 : 50);
        };

        updateWH(); // Set initial size
        window.addEventListener("resize", updateWH); // Listen to resize events
        return () => window.removeEventListener("resize", updateWH);
    }, []);

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
                <div className="text-center px-4 max-md:px-6 lg:px-8 md:my-2 lg:my-4 md:py-4 max-w-[1000px] mx-auto rounded-full backdrop-blur-lg">
                        <span className="max-md:text-lg md:text-2xl lg:text-3xl">Study Abroad with Full Tuition Exemption</span>
                        <h1 className={"text-xl font-bold md:text-3xl lg:mt-4 flex items-center"}>Your Ticket to Exploring the
                            <span className={"flex text-xl md:text-5xl text-orange-400"}>
                                <span className="">
                                    &nbsp;W
                                </span>
                                <FaGlobeAsia className="mt-2 w-3 h-3 md:w-8 md:h-8 mb-2"/>
                                <span className={""}>rld!</span>
                            </span>
                        </h1>
                    {/*
                    <p className="max-md:text-sm md:text-xl max-w-2xl mx-auto mt-2">
                        Achieve your dream of traveling the world as you pursue your degree.
                    </p>
                    */}
                </div>
                <HeroLocationLabel WH={labelWH}/>
                <Image
                    className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2`}
                    src={"/assets/scholar.png"}
                    alt={"Scholar"}
                    width={scholarSize}
                    height={scholarSize}/>
            </div>
        </section>
    );
};

export default Hero;