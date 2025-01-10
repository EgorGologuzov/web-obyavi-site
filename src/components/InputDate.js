import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker';
import {ru} from 'date-fns/locale/ru';
import { InputMask } from '@react-input/mask';
import '../../src/react-datepicker.css'
import { useState } from 'react';

registerLocale('ru',ru);

const InputDate = ({label='Date',
    id,
    name,
    disabled=false,
    required=true,
    valid=true,
    min=new Date("01.01.1900"),
    max=new Date("01.01.2100"),
    value=new Date(),
    comment='Comment',
    onChange}) => {
    const handleChange=(oldValue,newValue)=>{
        onChange(oldValue,newValue);
        console.log(`min:${min},max:${max}`)
    }
    const [isFocused,setIsFocused]=useState(false);

    return ( 
        <div className="input-date" id={id} name={name}>
            <div className="input-date_header">
                <p className="input-date_header_content">{label}</p>
                {required&&(<p className="input-date_header_required">*</p>)}
            </div>
            <DatePicker selected={value}
            onChange={(date)=>handleChange(value,date)}
            onCalendarOpen={()=>setIsFocused(true)}
            onCalendarClose={()=>setIsFocused(false)}
            locale='ru'
            adjustDateOnChange='false'
            dateFormat="dd/MM/yyyy"
            startDate={min}
            showIcon
            name={name}
            icon="icon-calender"
            customInput={
                <InputMask mask='__/__/____' replacement={{_:/\d/}} className={`input-date_input${!valid?' error':isFocused?' focus':''}`} style={{padding:'0px',paddingBottom:'3px'}}/>
            }/>
            {comment&&(
                <p className={`input-date_comment${!valid?' error':isFocused?' focus':''}`}>{comment}</p>
            )}
            {disabled&&(
                <div className="input-string_filter"/>
            )}
        </div>
     );
}
 
export default InputDate;