import React from 'react'

const Bio = () => {
    return (
        <div
            className={"grid max-sm:flex sm:grid-cols-5 gap-4 justify-between items-center bg-contain mx-10"}
            style={{
                backgroundImage: `url(./assets/subject.png)`,
                height: "400px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "20% 50%",
            }}
        >
            <div className={"max-sm:hidden col-span-2"}></div>
            <div className={" text-center sm:col-span-3 max-sm:mt-[150px]"}>
                <span className={"text-white bg-black text-2xl"}>Hi, I am LIN.</span>
                <p className={"px-4 indent-4 bg-black opacity-80 text-left w-full"}>I decided to pursue my studies in Japan post Covid-19 where my life turned around forever. <br /> Having grown up in a third world country, my academic journey in Japan has been a blast!</p>
            </div>
        </div>
    )
}
export default Bio
