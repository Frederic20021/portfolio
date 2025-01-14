import React from 'react'

interface param {
    caption?: string,
    imgSrc: string,
    width?: number,
    height?: number,
}

const MdxImage = ( param : param ) => {
    return (
        <div>
            <img src={param.imgSrc} alt={param.caption} width={param.width} height={param.height} className={"mx-auto"}/>
            <p className={"text-center"}>Fig: {param.caption}</p>
        </div>
    )
}
export default MdxImage
