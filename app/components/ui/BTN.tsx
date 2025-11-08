import Link from "next/link";

type params = {
    text: string,
    href: string
}

export default function BTN ({ text, href } : params) {
    return (
        <>
            <div 
                className="p-2 flex border border-blue-400 items-center gap-4 bg-white text-black group ">
                <span>{text}</span>
                <span className="text-white border p-2 w-8 h-8 bg-blue-500 rounded-full">
                    {String.fromCharCode(8594)}
                </span>
            </div>
        </>
    )

}