import React, { useState } from 'react'
import "./css/ImageList.css"
import Paragraf from './Paragraf'

export default function ImageList({
    imgList,
    value, // устанавливается если определено
    onChange
}) {
    const [interValue, setInterValue] = useState(1);

    const handleClick = (index) => {
        const newValue = index + 1;
        setInterValue(newValue);
        onChange && onChange({ newValue })
    }

    const realValue = value ?? interValue;

    return imgList && imgList.length && (
        <div className="image-list">
            {imgList.map((img, index) => (
                <img
                    key={index}
                    className={`image-list__img ${realValue - 1 == index ? "image-list__img_selected" : ""}`}
                    src={img}
                    onClick={() => handleClick(index)} />
            ))}
        </div>
    ) || (
        <div className="image-list">
                <img
                    className={`image-list__img image-list__img_selected`}
                    style={{content: "var(--icon-picture)"}} />
        </div>
    )
}
