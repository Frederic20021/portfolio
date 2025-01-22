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
        <div className={"flex md:flex-wrap max-md:flex-col gap-12 max-sm:max-w-[350px] mx-auto justify-center"}>
            {projectItems.map((item, index) => {
                const Component = componentMap[item.component];
                return Component
                    ?
                    <div className={"rounded-lg shadow-lg hover:shadow-gray-600 flex flex-col max-sm:w-[330px] items-center p-2"}>
                        <Component key={index} />
                        <Link
                            href={item.link}
                            className={"group my-2 rounded-lg"}
                        >
                            More on this<span className={"group-hover:opacity-0 duration-500"}>&ensp;&gt;</span>
                            <span className={"opacity-0 group-hover:opacity-100 transition-opacity duration-500"}>&gt;&gt;&gt;</span>
                        </Link>
                    </div>
                    : null;
            })}
        </div>
    )
}
export default Projects
