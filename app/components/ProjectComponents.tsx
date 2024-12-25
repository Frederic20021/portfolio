import Link from "next/link";
import GlobeAnimation from "@/app/components/GlobeAnimation";

const cusCss = "flex flex-col items-center text-justify"

const Map = () => {
    return (
        <div className={`${cusCss}`}>
            <span>Pan around the globe and find me!</span>
            <GlobeAnimation />
        </div>
    )
}


const Karate = () => {
    return (
        <div className={`bg-red-500 ${cusCss}`}>
            <span>Karate</span>
            <p>I first started practising karate during middle school and got my black belt after 2 years.<br/>I went back to training after finishing high school and went to placed third at a local competition during the first year of studying abroad in Japan.</p>
            <Link
                href="/"
                className={"hover:bg-blue-800 rounded-lg"}
            >More on this</Link>
        </div>
    )
}

const Scholarship = () => {
    return (
        <div className={`bg-blue-800 basis-2/5 ${cusCss}`}>
            <span>Scholarship</span>
            <p>I was fortunate to be able to pursue my study in Japan free of educational expenses via the ABP full scholarship program. On top of that, I am delighted to be a member of Mabuchi International Scholarship Foundation that provides financial support for my life in Japan.</p>
        </div>
    )
}

const Internship = () => {
    return (
        <div className={`bg-gray-500 basis-2/3 ${cusCss}`}>
            <span>Internship at Yamaha YCS</span>
            <p>After a year in Japan, I applied for an internship at YCS which was a requisite credit at my University.<br/>Yamaha YSC is one of the branches of the main company which has different levels of </p>
        </div>
    )
}

const Exchange = () => {
    return (
        <div>Exchange</div>
    )
}

const TechnicalTrainee = () => {
    return (
        <div className={`${cusCss} basis-2/3`}>
            <span>Japan&apos;s ongoing Problems of Technical Trainee</span>
            <p>After studying in Japan for one year, I had an opportunity to interpret at one of the centres for technical trainees in Hamamatsu, Shizuoka. However, after a few months of interpretation, one of the trainees had gone missing. <br/> So I decided to look into the problem and wrote a report on it.</p>
            <Link
                href={"/"}
                >
                Learn more about this problem
            </Link>
        </div>
    )
}

export {Map, Internship, Karate, TechnicalTrainee, Scholarship, Exchange}
