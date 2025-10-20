import { ProfInfo } from "@/app/constants/english";
import Image from "next/image";

export default function ProfIntro() {
    return(
        <div className="grid items-center gap-2 md:gap-4 px-4 md:px-8 lg:p-12 bg-blue-50 mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-left bg-gradient-to-r from-[#3375C0] via-[#1A3C63] text-transparent bg-clip-text mb-4 md:mb-6" 
                style={{
                    fontFamily: "'Noto Serif Japanese'",
                    letterSpacing: '0em',
                }}>
                講師紹介
            </h2>
            <div className="md:p-4 gap-12 md:gap-24 grid md:grid-cols-2 mx-auto">
                {ProfInfo.map((prof) => (
                    <div key={prof.id} className="grid bg-white items-center p-2 md:p-4">
                        <Image 
                            src={prof.image} 
                            alt={prof.name} 
                            width={300}
                            height={300}
                            className="mx-auto object-contain rounded-4xl" />
                        <div className="bg-amber-400 w-[100px] md:w-[150px] ml-[-15px] text-white">
                            <span className="text-sm md:text-xl text-center" style={{fontFamily: "Yu Gothic"}}>Profile</span>
                        </div>
                        <div className="grid bg-white gap-2 md:gap-4">
                            <div style={{fontFamily: "Yu Gothic"}} className="text-base md:text-lg lg:text-xl bg-gradient-to-r from-black to-gray-600 py-1 md:py-2">
                                <h3 className="font-bold text-2xl text-center text-white">{prof.name}&nbsp;&nbsp;&nbsp;&nbsp;講師</h3>
                                <p className="font-semibold pl-16 text-white">({prof.kana})</p>
                            </div>
                            
                            {prof.sections.map((section, index) => (
                                <div className="font-bold pl-4 md:pl-8" key={index}>
                                    <h2 className="text-sm md:text-base bg-gradient-to-r from-blue-400 via-blue-900 to-blue-800 text-transparent bg-clip-text font-bold mb-1 md:mb-2">
                                        {section.title}
                                    </h2>
                                    <ul className="list-disc list-inside space-y-1">
                                        {section.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="text-xs md:text-sm text-gray-700 whitespace-pre-line">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}