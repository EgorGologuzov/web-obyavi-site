import React from 'react';

const VisibilityIcon = ({onClick,value}) => {

    return (
        <svg version="1.1" viewBox="0 0 36.883 31.655" xmlns="http://www.w3.org/2000/svg" className='visibility-icon' data-visible={value}>
            <defs>
                <clipPath id="a">
                <ellipse cx="64.223" cy="40.209" rx="18.452" ry="14.9" strokeWidth=".28843"/>
                </clipPath>
            </defs>
            <g transform="translate(-.31906 .22005)" onClick={onClick}>
                <ellipse transform="translate(-45.472 -20.008)" cx="64.243" cy="32.321" rx="18.452" ry="14.9" clipPath="url(#a)" strokeWidth=".28843" className="visibility-icon_eyeball"/>
                <circle cx="18.761" cy="16.257" r="7.9449" fill="#fff" strokeWidth=".36034" className="visibility-icon_outer-circle"/>
                <circle cx="18.761" cy="16.257" r="5.0359" strokeWidth=".36034" className="visibility-icon_inner-circle"/>
                <rect transform="rotate(224.1)" x="-24.351" y="-17.052" width="3.4894" height="37.578" strokeWidth="4.265" className='visibility-icon_main-line'/>
                <rect transform="matrix(-.71838 -.69565 .69629 -.71776 0 0)" x="-27.604" y="-17.098" width="3.4958" height="37.647" fill="#fff" strokeWidth="4.2728" className='visibility-icon_side-line'/>
            </g>
        </svg>
    );
}
 
export default VisibilityIcon;