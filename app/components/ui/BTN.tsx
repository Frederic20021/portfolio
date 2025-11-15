import Link from "next/link";
import { FaArrowRight } from 'react-icons/fa';

type params = {
    text: string,
    href: string
}

export default function BTN ({ text, href } : params) {
    return (
        <>
            <Link href={href}
                className="py-2 hover:scale-103 max-sm:text-sm px-4 my-8 text-center hover:font-bold mx-auto border duration-500 border-blue-400 rounded-4xl flex items-center gap-8 text-black group ">
                <span className="duration-500">{text}</span>
                <span className="text-white group-hover:rotate-90 duration-500 border p-2 bg-blue-500 rounded-full">
                    <FaArrowRight />
                </span>
            </Link>
        </>
    )

}