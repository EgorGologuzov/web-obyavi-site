const RadioButton=({
  value,
  id,
  name,
  checked,
  label='label',
  comment='comment',
  group,
  onChange,
  disabled=false})=>{

    const handleChange=(value)=>{
      onChange(value);
    }

    return (
      <div
        className='radio-btn'
        name={name}
        group={group}
        id={id}
      >
        <input
          className='radio-btn_input'
          type="radio"
          value={value}
          checked={checked}
          onChange={(e)=>handleChange(e.currentTarget.value)}
        />
        <label className='radio-btn_label' htmlFor={id} onClick={()=>onChange(value)}>
          {label}
        </label>
        <p className="radio-btn_comment">{comment}</p>
        {disabled&&(<div className="input-string_filter"></div>)}
      </div>
    );
}

export default RadioButton;