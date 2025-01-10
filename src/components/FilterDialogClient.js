import { useEffect, useState } from "react";
import Button from "./Button";
import RadioButton from './RadioButton'
import './FilterDialogClient.css'

const FilterDialogClient = () => {
    const categories=[
        {
            name:'categorie 1',
            value:'c1',
            level:1,
            childCategories:[
                {
                    name:'categorie 21',
                    value:'c1>c1',
                    level:2,
                    childCategories:[
                        {
                            name:'categorie 211',
                            value:'c1>c1>c21',
                            level:3,
                            childCategories:[],
                        },
                        {
                            name:'categorie 212',
                            value:'c1>c1>c22',
                            level:3,
                            childCategories:[],
                        },
                    ],
                },
                {
                    name:'categorie 22',
                    value:'c1>c2',
                    level:2,
                    childCategories:[],
                },
            ],
        },
        
        {
            name:'categorie 2',
            value:'c2',
            level:1,
            childCategories:[
                {
                    name:'categorie 21',
                    value:'c2>c1',
                    level:2,
                    childCategories:[],
                },
            ],
        },
        {
            name:'categorie 3',
            value:'c3',
            level:1,
            childCategories:[],
        },
    ]

    const radioGroupKey='main_group'
    const [radioValues,setRadioValues]=useState({});
    const [activeBranch,setActiveBranch]=useState({});
    const radioValuesStatic={}

    const generateChildren=(categorie)=>{
        const hasCommonOrigin=categorie.value.split('>')[0]===activeBranch.parent
        const isDeeperThanActiveBranch=(categorie.level>activeBranch.level+1)
        const isVisible=hasCommonOrigin&&!isDeeperThanActiveBranch;
        return (
            <div className={`tree-node ${categorie.level===1?'father-group':''} ${isVisible?'visible':''}`}>
                <RadioButton 
                    value={categorie.value} 
                    label={categorie.name} 
                    group={radioGroupKey} 
                    checked={radioValues[radioGroupKey]==categorie.value}
                    onChange={()=>{
                        setRadioValues(values=>({...values,[radioGroupKey]:categorie.value}));
                        setActiveBranch({'parent':categorie.value.split('>')[0],'level':categorie.level,'value':categorie.value.split('>').at(-1)});
                    }}
                />
                {categorie.childCategories.length!=0&&(
                    <>
                        {categorie.childCategories.map(
                            (subcategorie)=>generateChildren(subcategorie,false))
                        }
                    </>
                )}
            </div>
        )
    }

    useEffect(()=>{
        setRadioValues(radioValuesStatic);
    },[])

    return ( 
        <div className="filter-dialog">
            <div className="filter-dialog__category-tree">
                <div>
                    {categories.map((categorie)=>generateChildren(categorie))}
                </div>
            </div>
            <Button onClick={()=>alert(activeBranch.value)}>OK</Button>
        </div>
    );
}
 
export default FilterDialogClient;