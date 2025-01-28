import React from 'react'
import { labels } from '@/app/constants/HeroLocationLabels'
import Link from "next/link";
import Image from "next/image";

const HeroLocationLabel = ( { WH } : { WH : number }) => {
    const w = `${WH*2}px`
    const h = `${WH*2}px`
    const showOrNot = `${WH <= 130 ? "hidden" : ""}`
    return (
            labels.map((item, idx) => {
                return (
                    <div key={idx}
                         className="absolute group flex items-center justify-center text-white rounded-full"
                         style={{
                             top: `${item.top}%`,
                             right: `${item.right}%`,
                             bottom: `${item.bottom}%`,
                             left: `${item.left}%`
                         }}
                    >
                        <div className="relative justify-center mx-auto animate-bounce hover:animate-none">
                            <div className="md:w-10 md:h-10 max-md:w-4 max-md:h-4 bg-orange-400 rounded-full flex items-center justify-center">
                                <span className="max-md:text-[6px] text-lg z-10">{item.countryCode}</span>
                            </div>
                            <div className="absolute md:w-6 md:h-6 max-md:w-2 max-md:h-2 bg-orange-400 rotate-45 -bottom-1 max-md:-bottom-0.5 left-[50%] translate-x-[-50%]"/>
                        </div>
                        <div
                            className={`z-10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm rounded-2xl shadow-2xl duration-500 absolute lg:mt-[500px] sm:max-lg:mt-60 p-2 text-justify max-sm:mt-20 md:text-lg sm:max-md:text-sm max-sm:text-[9px] max-sm:text-left`}
                            style={{
                                width: w,
                                height: h
                            }}
                        >
                            <div className={"text-2xl text-center"}>
                                <div className='text-orange-400 font-bold max-sm:text-xs text-center'>{item.institution}</div>
                                &ensp; {item.emoji}
                            </div>
                            <Image src={item.img} alt={"image"} className={`${showOrNot} my-2 mx-auto`} width={300} height={300} />
                            <p className={"indent-8 max-md:indent-4"}>{WH <= 130 ? item.smDescription : item.description}</p>
                            <Link href={item.link} className={"hover:bg-orange-400 border px-2 rounded-lg"}>Learn More</Link>
                        </div>
                    </div>
                )
            })
    )
}

export default HeroLocationLabel
