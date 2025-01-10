import React from "react";
const Switch = ({id='switch_1',name='switch_name',checked,disabled=false,onChange}) => {
    return (
        <div className='switch' id={id} name={name}>
            <input type='checkbox' className='switch_checkbox' checked={checked} onChange={onChange}/>
            {disabled&&(<div className="input-phone_filter"></div>)}
        </div>
    );
}
 
export default Switch;