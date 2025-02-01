import React from 'react'
import Image from "next/image";

export const MDXImage = ({
                      imgSrc,
                      caption,
                      width,
                      height
} : {
    imgSrc: string;
    caption?: string;
    width?: number;
    height?: number;
}) => {
    return (
        <div>
            <Image src={imgSrc} alt={`${caption}`} width={width} height={height} className={"mx-auto"}/>
            <p className={"text-center"}>Fig: {caption}</p>
        </div>
    )
}
export default MDXImage
