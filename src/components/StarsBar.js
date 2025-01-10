import Star from './Star';

const StarsBar = ({input_mode=false,onChange,value=0}) => {
    const handleChange=(oldValue,newValue)=>{
        onChange(oldValue,newValue);
    }
    return (
        <div className={`stars-bar ${input_mode?'':'input-off'}`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} onClick={()=>handleChange(value,star)} className={`stars-bar_star${star<=value?' filled':''}`}/>
            ))}
        </div>
    );
};

export default StarsBar;