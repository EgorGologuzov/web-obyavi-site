import { useState } from "react";
import VisibilityIcon from "./VisibilityIcon";
const InputPassword = ({onChange,
    valid=true,
    name='input-password_name',
    id='input-password_1',
    value='',
    placeholder='Введите текст',
    required=false,
    disabled=false,
    label='Введите пароль',
    comment=''}) => {

    const [visibility,setVisibility]=useState(false);
    const [hasFocus,setFocus]=useState(false);

    const handleFocus=()=>{
        setFocus(true);
    }
    const handleFocusOut=()=>{
        setFocus(false);
    }

    return ( 
        <div className="input-password" id={id} name={name}>
            <div className='input-password_header'>
                <p className="input-password_header_content">{label}</p>
                {required && (
                    <p className='input-password_header_required'>*</p>
                )}
            </div>
            <div className={`input-password_input-box ${!valid?'error':hasFocus?'focus':''}`}>
                <input type={visibility?'text':'password'} 
                placeholder={placeholder} 
                className='input-password_input-box_input'
                onChange={onChange} 
                onFocus={handleFocus}
                name={name}
                onBlur={handleFocusOut}
                value={value}/>
                <VisibilityIcon value={visibility} onClick={()=>setVisibility(!visibility)}/>
            </div>
            {comment&&(
                <p className={`input-password_comment ${!valid?'error':hasFocus?' focus':''}`}>{comment}</p>
            )}
            {disabled&&(
                <div className='input-password_filter'/>
            )}
        </div>
    );
}
 
export default InputPassword;