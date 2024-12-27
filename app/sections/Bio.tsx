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
                <span className={"text-white bg-black text-4xl"}>Hi there! I am LIN.</span>
                <p className={"px-4 indent-4 text-left text-xl w-full backdrop-blur"}>
                    I decided to pursue my studies in Japan post Covid-19 after which my life had turned around forever.
                    <br/><br/>
                    Having grown up in a third world country, my academic journey in Japan has been a blast!
                    Not only am I able to get tuition-free education, I am also able to do an exchange program in
                    Canada.
                    <br/><br/>
                    I am greatful for this unique opportunity and will be sharing my experience through this blog site.
                </p>
            </div>
        </div>
    )
}
export default Bio
