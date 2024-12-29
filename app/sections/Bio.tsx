import React from 'react'

const Bio = () => {
    return (
        <div
            className={"grid max-md:flex sm:grid-cols-5 gap-4 justify-between items-center bg-contain mx-10"}
            style={{
                backgroundImage: `url(./assets/subject.png)`,
                height: "400px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "20% 50%",
            }}
        >
            <div className={"max-sm:hidden col-span-2"}></div>
            <div className="font-mono text-center md:col-span-3 bottom-0">
                <span className="text-white font-bold text-4xl max-sm:text-right mb-4">
                    Hi there! I am LIN.
                </span>
                <p className="px-4 font-semibold text-xl w-full text-left max-lg:bg-black max-lg:bg-opacity-50 max-lg:text-lg">
                    &emsp;&emsp;&emsp;&emsp;I decided to pursue my studies in Japan post Covid-19, after which my life turned around
                    forever!
                    <br/><br/>
                    &emsp;&emsp;&emsp;&emsp;<span className="max-lg:hidden">Having grown up in a third-world country, my academic journey in Japan has been a blast!</span>
                    &emsp;&emsp;&emsp;&emsp;Not only am I able to get tuition-free education, I am also able to do an exchange program in
                    Canada.
                    <br/><br/>
                    &emsp;&emsp;&emsp;&emsp;I am grateful for this unique opportunity and will be sharing my experience through this blog
                    site.
                </p>
            </div>
        </div>
    )
}
export default Bio
