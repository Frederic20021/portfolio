import React from 'react'
import { labels } from '@/app/constants/HeroLocationLabels'

const HeroLocationLabel = ( { WH } : { WH : number }) => {
    const w = `${WH*2.5}px`
    const h = `${WH}px`
    console.log(w,h)
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
                            <div className="md:w-8 md:h-8 max-md:w-4 max-md:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="max-md:text-[6px] text-xs z-10">{item.countryCode}</span>
                            </div>
                            <div
                                className="absolute md:w-4 md:h-4 max-md:w-2 max-md:h-2 bg-blue-500 rotate-45 -bottom-1 max-md:-bottom-0.5 left-[50%] translate-x-[-50%]"/>
                        </div>
                        <div
                            className={`opacity-0 group-hover:opacity-100 duration-500 absolute bg-red-600 mt-40 max-sm:mt-20 lg:text-xl max-sm:text-xs sm:max-md:text-lg`}
                            style={{
                                width: w,
                                height: h
                            }}
                        >
                            {item.institution}.&ensp;📍 {item.emoji}
                        </div>
                    </div>
                )
            })
    )
}

export default HeroLocationLabel