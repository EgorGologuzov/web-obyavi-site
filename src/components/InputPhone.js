import { useState } from "react";
import { InputMask ,useMask} from "@react-input/mask";

const InputPhone = ({
    id='input-phone-1',
    name='input-phone_name',
    value='',
    valid=true,
    required=false,
    disabled=false,
    label='Номер телефона',
    comment='',
    placeholder="+_ (___) ___ __-__",
    onChange})=>{

    const [hasFocus,setFocus]=useState(false);

    const handleFocus=()=>{
        setFocus(true);
    }
    const handleFocusOut=()=>{
        setFocus(false);
    }

    const inputRef = useMask({
        mask: '+_ (___) ___ __-__',
        replacement: { _: /\d/ },
    });

    return ( 
        <div className="input-phone" name={name} id={id}>
            <div className='input-phone_header'>
                <p className="input-phone_header_content">{label}</p>
                {required && (
                    <p className='input-phone_header_required'>*</p>
                )}
            </div>
            <input type='text'
                placeholder={placeholder}
                className={`input-phone_input ${!valid?'error':hasFocus?'focus':''}`}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleFocusOut}
                value={value}
                name={name}
                ref={inputRef}
            />

            {comment&&(
                <p className={`input-phone_comment${!valid?' error':hasFocus?' focus':''}`}>{comment}</p>
            )}
            {disabled&&(
                <div className='input-phone_filter'/>
            )}
        </div>
    );
}
 
export default InputPhone;