import React from 'react'
import {Map, Karate, Internship, Scholarship, Exchange, TechnicalTrainee } from "@/app/components/ProjectComponents"
import {projectItems} from "@/app/constants/ProjectItems";
import Link from "next/link";

const componentMap: Record<string, React.ComponentType> = {
    Map: Map,
    Karate: Karate,
    Scholarship: Scholarship,
    Internship: Internship,
    TechnicalTrainee: TechnicalTrainee,
    Exchange: Exchange,
};

const Projects = () => {
    return (
        <div className={"flex md:flex-wrap max-md:flex-col gap-8 mx-auto justify-center"}>
            {projectItems.map((item, index) => {
                const Component = componentMap[item];
                return Component
                    ?
                    <div className={"rounded-lg shadow-lg hover:shadow-gray-600 flex flex-col max-w-[300px] items-center p-2"}>
                        <Component key={index} />
                        <Link
                            href="/"
                            className={"hover:bg-blue-800 rounded-lg"}
                        >More on this</Link>
                    </div>
                    : null;
            })}
        </div>
    )
}
export default Projects
