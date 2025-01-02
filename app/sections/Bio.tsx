import React  from 'react'

const Bio = () => {

    return (
        <div
            className={"grid max-md:flex sm:grid-cols-5 gap-4 justify-between items-end bg-contain mx-10"}
            style={{
                backgroundImage: `url(./assets/LIN.png)`,
                height: "400px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "20% 50%",
            }}
        >
            <div className={"max-sm:hidden col-span-2"}></div>
            <div className="font-mono text-center md:col-span-3 max-sm:mb-14">
                <span className="text-white font-bold text-4xl max-sm:text-right max-sm:text-lg max-sm:bg-black max-sm:bg-opacity-80">
                    Hi there! I am LIN.
                </span>
                <p className="px-2 font-semibold text-xl w-full text-left max-lg:bg-black max-lg:bg-opacity-80 max-lg:text-lg max-sm:text-xs">
                    &emsp;&emsp;&emsp;&emsp;I decided to pursue my studies in Japan post Covid-19, after which my life turned around
                    forever!
                    <br/><br className={"max-sm:hidden"}/>
                    &emsp;&emsp;&emsp;&emsp;<span className="max-lg:hidden">Having grown up in a third-world country, my academic journey in Japan has been a blast!</span>
                    <span className={"lg:hidden"}>&emsp;&emsp;&emsp;&emsp;</span> Not only am I able to get tuition-free education, I am also able to do an exchange program in
                    Canada.
                    <br/><br className={"max-sm:hidden"}/>
                    &emsp;&emsp;&emsp;&emsp;I am grateful for this unique opportunity and will be sharing my experience through this blog
                    site.
                </p>
            </div>
        </div>
    )
}
export default Bio
