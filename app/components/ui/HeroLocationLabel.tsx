import React from 'react'
import { labels } from '@/app/constants/HeroLocationLabels'

const HeroLocationLabel = () => {
    return (
            labels.map((item, idx) => {
                return (
                    <div key={idx}
                         className="absolute group flex items-center justify-center w-8 h-8 text-white rounded-full"
                         style={{
                             top: `${item.top}%`,
                             right: `${item.right}%`,
                             bottom: `${item.bottom}%`,
                             left: `${item.left}%`
                         }}
                    >
                        <div className="relative justify-center mx-auto animate-bounce">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-xs z-10">{item.countryCode}</span>
                            </div>
                            <div
                                className="absolute w-4 h-4 bg-blue-500 rotate-45 -bottom-1 left-[50%] translate-x-[-50%]"/>
                        </div>
                        <div
                            className={"hidden group-hover:block absolute w-[250px] h-[100px] bg-red-600 mt-40"}>{item.institution}.&ensp;📍 {item.emoji}</div>
                    </div>
                )
            })
)
}

export default HeroLocationLabel