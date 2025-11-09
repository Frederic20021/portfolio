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
                className="py-2 px-4 hover:px-8 my-8 text-center mx-auto border duration-500 border-blue-400 rounded-4xl flex items-center gap-8 hover:gap-14 text-black group ">
                <span className="group-hover:scale-110 group-hover:font-black duration-500">{text}</span>
                <span className="text-white group-hover:rotate-90 hover:scale-110 duration-500 border p-2 bg-blue-500 rounded-full">
                    <FaArrowRight />
                </span>
            </Link>
        </>
    )

}