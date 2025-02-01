import GlobeAnimation from "@/app/components/GlobeAnimation";
import Image from "next/image";

const Title = ({ title } : { title : string }) => {
    return (
        <span className={"text-2xl Title text-center px-4 my-2"}>{title}</span>
    )
}
const Map = () => {
    return (
        <div className={`cusAlign justify-center items-center rounded-lg w-[400px]`}>
            <Title title={"Pan around the globe and find me!"}></Title>
            <GlobeAnimation />
        </div>
    )
}


const Karate = () => {
    return (
        <div className={`cusAlign p-4 w-[450px]`}>
            <Title title={"Martial Arts Journey"}></Title>
            <p>I first started practising karate during middle school and trained for 2 years.</p>
            <p>I went back to training after finishing high school and went on to place third at a local competition during the first year of studying abroad in Japan.</p>
            <Image src={"/assets/karate/karateCompetition.png"} alt={"Prefectural Karate Championship"} width={400} height={400} className={"rounded-xl my-2"}/>
        </div>
    )
}

const Scholarship = () => {
    return (
        <div className={`cusAlign w-[350px]`}>
            <Title title={"Receiving Private Scholarships"}></Title>
            <p>
                I was fortunate to not only be able to study in Japan free of tuition cost, but also be a member of Mabuchi
                International Scholarship Foundation, providing me with additional stipends as financial support.
            </p>
            <Image src={"/assets/scholarship/scholarship.jpg"} alt={"Prefectural Karate Championship"} width={400} height={400} className={"rounded-xl my-2"}/>
            <p>
                One underrated fact about such private scholarship foundation is that you are able to participate
                in their events and activities such as the reading reports of self-help books, social gathering and the
                hosting of museum exhibits, all of which are really beneficial for the students.
            </p>
        </div>
    )
}

const Internship = () => {
    return (
        <div className={`cusAlign w-[300px]`}>
            <Title title={"Internship at Yamaha Cooperate Service"}></Title>
            <Image src={"/assets/internship/internship.jpg"} alt={"Prefectural Karate Championship"} width={400} height={400} className={"rounded-xl my-2"}/>
            <p>After a year in Japan, I applied for an internship at YCS which was a requisite credit at my University&apos;s program.</p>
            <p>Yamaha YSC is one of the branches of the main company which has different levels of </p>
        </div>
    )
}

const Exchange = () => {
    return (
        <div className={"cusAlign w-[350px]"}>
            <Title title={"Exchange program to Canada 🇨🇦"}></Title>
            <p>
                Having studied for 2 years in Japan, I seized the opportunity to get better education and
                applied to the exchange program between Shizuoka University and Ontario Tech University.
            </p>
            <Image src={"/assets/exchange/OTU.jpg"} alt={"Ontario Tech University"} width={400} height={400} className={"rounded-xl my-2"}/>
            <p>
                One of the main reasons behind this decision was that the program is exempted from study expenses,
                which was greatly beneficial for me as a student. And also the University ranking in Canada is also
                higher that that of in Japan.
            </p>
        </div>
    )
}

const TechnicalTrainee = () => {
    return (
        <div className={`cusAlign w-[500px]`}>
            <Title title={"Japan's ongoing Issue of Technical Trainee"}></Title>
            <p>After studying in Japan for one year, I had an opportunity to interpret at one of the centres for technical trainees in Hamamatsu, Shizuoka. However, after a few months of interpretation, one of the trainees who have the same nationality as me had gone missing. And as a scholar from the same country (Myanmar), who has the ability to communicate in both languages, I felt an obligation to confront the issue.</p>
            <br/>
            <p>As I was investigating the possible causes to the vanishing of technical trainees, I came across a thesis contest in Japan which is also supported by the Japanese Ministry of Foreign Affairs. Thus, I saw this as an opportunity to bring this issue to light to Japanese society and participated in the contest while doing an exchange study in Canada. Surprisingly, my thesis placed third on the contest.</p>
        </div>
    )
}

export {Map, Internship, Karate, TechnicalTrainee, Scholarship, Exchange}
