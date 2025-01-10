import React, { useState} from 'react';

const DropdownList = ({
    id,
    name='dropdown_1',
    label='label',
    placeholder='placeholder',
    value,
    comment='Comment',
    options,
    disabled=false,
    onChange}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [optionName,setOptionName]=useState('');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (key) => {
        onChange(value,options[key]);
        setOptionName(key);
        setIsOpen(false);
    };

    const handleMouseLeave=()=>{
        if (isOpen)
            setIsOpen(false);
    }

    return (
        <div className="dropdown" id={id} name={`${name}_${optionName?optionName:'none'}`} onMouseLeave={handleMouseLeave}>
            {label&&(<p className="dropdown_caption">{label}</p>)}
            <div className={`dropdown_header${isOpen?' focus':''}`} onClick={toggleDropdown}>
                <input type="text" className='dropdown_header_option' value={value} placeholder={placeholder} readOnly/>
                <img className={`dropdown_header_arrow ${isOpen?'up':''}`} alt='🔻'/>
            </div>
            {comment&&(<p className={`dropdown_comment${isOpen?' focus':''}`}>{comment}</p>)}
            
                <ul className={`dropdown_list${isOpen?' open':''}`}>
                    {Object.keys(options).map((key)=>{
                        return  <li key={key} onClick={() => handleOptionClick(key)}>{options[key]}</li>
                    })}
                </ul>
            
            {disabled&&(<div className="input-string_filter"/>)}
        </div>
    );
};

export default DropdownList;