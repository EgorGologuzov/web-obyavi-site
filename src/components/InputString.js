import React, { useState } from 'react';

const InputString = ({value='',
    valid=true,
    required=false,
    id='input-string_1',
    name='input-string_name',
    disabled=false,
    label='',
    comment='',
    placeholder='Placeholder',
    onChange}) =>
{
    const [hasFocus,setFocus]=useState(false);

    const handleFocus=()=>{
        setFocus(true);
    }
    const handleFocusOut=()=>{
        setFocus(false);
    }

    return(
        <div className="input-string" id={id} name={name}>
            {label&&(
                <div className='input-string_header'>
                    <p className='input-string_header_content'>{label}</p>
                    {required && (
                        <p className='input-string_header_required'>*</p>
                    )}
                </div>
            )}
            <input value={value} name={name} className={`input-string_input${!valid?' error':hasFocus?' focus':''}`} type='text' onChange={onChange} placeholder={placeholder} onFocus={(e)=>handleFocus(value,e.target.value)} onBlur={handleFocusOut}/>
            {comment&&(
                <p className={`input-string_comment${!valid?' error':hasFocus?' focus':''}`}>{comment}</p>
            )}
            {disabled&&(
                <div className='input-string_filter'/>
            )}
        </div>
    );
}
 
export default InputString;