import React, { useState } from 'react'
import UpDown from './UpDown'
import "./css/ImageCarousel.css"
import { useAppContext } from '../contexts/AppContext';
import ImageViewDialog from './ImageViewDialog';

export default function ImageCarousel({
    imgList,
    value, // устанавливается если определено
    onChange,
}) {
    const [interValue, setInterValue] = useState(1);
    const appContext = useAppContext();

    const realValue = value ?? interValue;
    const src = imgList[realValue - 1];

    const handleOnChange = (event) => {
        setInterValue(event.newValue);
        onChange && onChange(event);
    }

    const handleOnClick = () => {
        appContext.showModal("", <ImageViewDialog src={src} />)
    }

    return imgList && imgList.length && (
        <div className="image-carousel">
            <div className="image-carousel__content">
                <img className="image-carousel__back" src={src} />
                <img className="image-carousel__img" src={src} onClick={handleOnClick} />
            </div>
            <UpDown
                min={1}
                max={imgList.length}
                value={realValue}
                needSetValueForce={true}
                canPrintValue={false}
                onChange={handleOnChange} />
        </div>
    ) || (
        <div className="image-carousel">
            <div className="image-carousel__content">
                <img className="image-carousel__back" style={{content: "var(--icon-picture)"}} />
                <img className="image-carousel__img" style={{content: "var(--icon-picture)"}} />
            </div>
            <UpDown min={0} max={0} value={0} disabled={true} />
        </div>
    )
}
