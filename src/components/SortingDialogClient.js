import { useState } from "react";
import Button from './Button';
import DropdownList from "./DropdownList";
import './SortingDialogClient.css';

const SortingDialogClient = () => {
    const [isAscending,setIsAscending]=useState(true);
    const dropdownSamples={'option_1':'ОЗУ','option_2':'ПЗУ','option_3':'Ядра','option_4':'Состояние','option_5':'Цена'};
    const [dropdownValue,setDropdownValue]=useState('');

    const handleDropdownChange=(oldValue,newValue)=>{
        setDropdownValue(newValue);
    }

    return ( 
        <div className='sort-dialog'>
                <DropdownList options={dropdownSamples} value={dropdownValue} onChange={handleDropdownChange} comment='' label=''/>
                <img 
                    className='sort-btn'
                    onClick={()=>setIsAscending(!isAscending)} 
                    style={{content:`${isAscending?'var(--icon-sort-asc)':'var(--icon-sort-desc)'}`}}
                />
                <Button onClick={()=>console.log({'value':dropdownValue,'method':isAscending?'asc':'desc'})}>Применить</Button>
        </div>
     );
}

export default SortingDialogClient;