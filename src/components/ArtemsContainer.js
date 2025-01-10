import {useState} from 'react';

import CollapseContainer from './CollapseContainer';
import DropdownList from './DropdownList';
import InputString from './InputString';
import Logo from './Logo';
import ScrollingList from './ScrollingList';
import SearchString from './SearchString';
import Spliter from './Spliter';
import StarsBar from './StarsBar';
import Switch from './Switch';
import InputPassword from './InputPassword';
import InputPhone from './InputPhone';
import InputText from './InputText';
import InputDate from './InputDate';
import RadioButton from './RadioButton';
import ToolButton from './ToolButton'; 
import Card from './Card';
import ContextMenu from './ContextMenu';
import ContextMenuButton from './ContextMenuButton';
import { ListContextProvider,useNewListContext } from '../contexts/ListContext';
import Carousel from './Carousel';

const CardFakeContent = () => {
    return (
        <div style={{ width: "100%", height: "200px", backgroundColor: "transparent", borderRadius: "10px" }}>
            <a href='/img/left-arrow-l.png'>Ссылка на /img/left-arrow-l.png</a>
        </div>
    )
}

const FormExample=()=>{
    const [inputs,setInputs]=useState({'radio':'small','username':'','dateOfBirth':new Date(),'rating':0,'dropdown':'','switch':false});
    const dropdownSamples={'option_1':'White','option_2':'Red','option_3':'Green','option_4':'Blue','option_5':'Black'};

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(inputs);
    }

    const handleInputChange = (oldValue,newValue)=>{
        setInputs(values=>({...values,['username']:newValue}));
    }

    const handleInputDateChange=(oldValue,newValue)=>{
        setInputs(values=>({...values,['dateOfBirth']:newValue}));
    }

    const handleStarChange=(oldValue,newValue)=>{
        setInputs(values=>({...values,['rating']:newValue}));
    }

    const handleDropdownChange=(oldValue,newValue)=>{
        setInputs(values=>({...values,['dropdown']:newValue}));
    }

    const handleRadioBtnChange = (newValue) => {
        setInputs(values=>({...values,['radio']:newValue}));
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputString placeholder='Имя' label='Username' required comment='Введите ваше пользовательское имя' value={inputs.username||''} onChange={handleInputChange}/>
            <Spliter/>
            <InputPhone label='Номер телефона' required comment='Comment' value={inputs.phoneNumber} onChange={(e)=>setInputs(values=>({...values,['phoneNumber']:e.target.value}))}/>
            <Spliter/>
            <InputPassword label='Password' required={true} comment='Comment' value={inputs.password} onChange={(e)=>setInputs(values=>({...values,['password']:e.target.value}))}/>
            <Spliter/>
            <InputDate onChange={handleInputDateChange} value={inputs.dateOfBirth} required/>
            <Spliter/>
            <InputText required={true} value={inputs.description} onChange={(e)=>setInputs(values=>({...values,['description']:e.target.value}))}/>
            <Spliter/>
            <StarsBar input_mode value={inputs.rating} onChange={handleStarChange}/>
            <Spliter/>
            <Switch checked={inputs.switch} onChange={(e)=>setInputs(values=>({...values,['switch']:e.target.checked}))}/>
            <Spliter/>
            <DropdownList options={dropdownSamples} label='Цвет темы' placeholder='Выберите цвет' comment='Выберите цвет темы' value={inputs.dropdown} onChange={handleDropdownChange}/>
            <Spliter/>
            <div className="radio-btn__group">
                <RadioButton name='radio-btn_name' group={"radio-btn__group_1"} id='small' value='small' comment='Размер S' checked={inputs.radio==='small'} label='маленький' onChange={handleRadioBtnChange}/>
                <RadioButton name='radio-btn_name' group={"radio-btn__group_1"}  id='medium' value='medium' comment='Размер M' checked={inputs.radio==='medium'} label='средний' onChange={handleRadioBtnChange}/>
                <RadioButton name='radio-btn_name' group={"radio-btn__group_1"}  id='large' value='large' comment='Размер L' checked={inputs.radio==='large'} label='большой' onChange={handleRadioBtnChange}/>
            </div>
            <input type='submit'/>
        </form>
    )
}

const cardsInScrollingList = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6},{id: 7},{id: 8},{id: 9}];

export default function ArtemsContainer({ children, header }) {
    const listContext = useNewListContext();

    const handleChooseButtonClick = (event, cardId) => {
        listContext.setSelectMode(true);
        listContext.setSelectedCards(new Set([cardId]));
    }

    const searchSamples = ['best coffee shops near me', 'how to learn Python programming', 'top tourist attractions in Paris', 'healthy dinner recipes', 'latest smartphone reviews', 'how to start a blog', 'tips for improving public speaking', 'best books of 2024', 'how to meditate for beginners', 'DIY home improvement projects', 'fun activities for kids at home', 'best workout routines for weight loss', 'how to save money on groceries', 'upcoming movies in theaters', 'top 10 travel destinations in Asia', 'how to improve your credit score', 'best online courses for career development', 'easy gardening tips for beginners', 'how to create a budget plan', 'best practices for remote work', 'ways to boost your immune system', 'how to make homemade pizza', 'tips for effective time management']
    const [searchString,setSearchString]=useState('');

    const handleSearchChange=(oldValue,newValue)=>{
        setSearchString(newValue);
        console.log(`new Value:${newValue}, oldValue:${oldValue}`);
    }

    const handleOnSearch=(value)=>{
        console.log(`do something with:${value}`);
    }

    return (
        <CollapseContainer header="Блоки Артема">
            <Spliter/>
            <FormExample/>
            <Spliter/>
            <SearchString hints={searchSamples} inputValue={searchString} onChange={handleSearchChange} onSearch={()=>handleOnSearch(searchString)}/>
            <Spliter/>
            <Logo sizeFull={false} onClick={() => alert("Hello")}/>
            <Spliter/>
            <Logo onClick={() => alert("Hello")}/>
            <Spliter/>
            <ListContextProvider value={listContext}>
                <ScrollingList
                    tools={
                        <ToolButton icon="icon-picture" text="console.log(2)" onClick={() => console.log(2)} />
                    }
                    toolsForSelectedMode={
                        <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)} />
                    }
                    onBottomReached={()=>alert('Bottom Reached')}>
                    {cardsInScrollingList.map((card, index) => 
                        <Card id={card.id} key={card.id}>
                            <CardFakeContent />
                            <ContextMenu>
                                <ContextMenuButton text="Выбрать" onClick={(event) => handleChooseButtonClick(event, card.id)} />
                                <ContextMenuButton text="Показать отмеченные" onClick={() => console.log(listContext.selectedCards)} />
                                <ContextMenuButton text="console.log(2)" onClick={() => console.log(2)} />
                            </ContextMenu>
                        </Card>
                    )}
                </ScrollingList>
            </ListContextProvider>
            <Spliter/>
            <Carousel
            tools={
                <>
                    <ToolButton icon="icon-picture" text="console.log(2)" onClick={() => console.log(2)} />
                    <ToolButton icon="icon-picture" text="console.log(2)" onClick={() => console.log(50)} />
                </>
            }
            pageMax={10}
            pageMin={1}
            onPageValueChange={()=>console.log('Carousel')}> 
            <Card id={99}>
                <CardFakeContent />
            </Card>
            </Carousel>
        </CollapseContainer>
    );
}