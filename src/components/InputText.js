import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

const InputText = ({
    name='input-text_name',
    id='input-text_1',
    value='',
    label='Huge Text',
    required=false,
    comment='Comment',
    placeholder='Placeholder',
    max=9999,
    disabled=false,
    valid=true,
    onChange}) => {

    const [hasFocus,setFocus]=useState(false);

    return ( 
        <div className="input-text" id={id} name={name}>
            <div className="input-text_header">
                <p className="input-text_header_content">{label}</p>
                {required&&(<p className="input-text_header_required">*</p>)}
            </div>
            <TextareaAutosize type="text"
            className={`input-text_input ${!valid?'error':hasFocus?'focus':''}`}
            placeholder={placeholder}
            maxLength={max}
            value={value}
            onFocus={()=>setFocus(true)}
            onBlur={()=>setFocus(false)}
            onChange={onChange}
            name={name}
            />
            {comment&&(
                <p className={`input-text_comment${!valid?' error':hasFocus?' focus':''}`}>{comment}</p>
            )}
            {disabled&&(
                <div className='input-password_filter'/>
            )}
        </div>
    );
}
 
export default InputText;