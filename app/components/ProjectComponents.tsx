import Link from "next/link";
import GlobeAnimation from "@/app/components/GlobeAnimation";
import Image from "next/image";

const Title = ({ title } : { title : string }) => {
    return (
        <span className={"text-xl font-bold text-center px-4 my-2"}>{title}</span>
    )
}
const Map = () => {
    return (
        <div className={`cusAlign justify-center items-center rounded-lg `}>
            <Title title={"Pan around the globe and find me!"}></Title>
            <GlobeAnimation />
        </div>
    )
}


const Karate = () => {
    return (
        <div className={`cusAlign p-4 w-[500px]`}>
            <Title title={"Martial Arts Journey"}></Title>
            <p className={"p-2 indent-8"}>I first started practising karate during middle school and trained for 2 years.<br/><p className={"indent-8"}>I went back to training after finishing high school and went on to place third at a local competition during the first year of studying abroad in Japan.</p></p>
            <Image src={"/assets/projects/karate/karateCompetition.png"} alt={"Prefectural Karate Championship"} width={400} height={400} className={"rounded-xl"} />
        </div>
    )
}

const Scholarship = () => {
    return (
        <div className={`bg-blue-800 cusAlign w-[300px]`}>
            <Title title={"Scholarships"}></Title>
            <p>I was fortunate to be able to pursue my study in Japan free of educational expenses via the ABP full scholarship program. On top of that, I am delighted to be a member of Mabuchi International Scholarship Foundation that provides financial support for my life in Japan.</p>
        </div>
    )
}

const Internship = () => {
    return (
        <div className={`bg-gray-500 cusAlign w-[400px]`}>
            <Title title={"Internship at Yamaha Cooperate Service"}></Title>
            <p>After a year in Japan, I applied for an internship at YCS which was a requisite credit at my University.<br/>Yamaha YSC is one of the branches of the main company which has different levels of </p>
        </div>
    )
}

const Exchange = () => {
    return (
        <div className={"cusAlign w-[500px]"}>Exchange</div>
    )
}

const TechnicalTrainee = () => {
    return (
        <div className={`cusAlign w-[200px]`}>
            <Title title={"Japan's ongoing Problems of Technical Trainee"}></Title>
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
