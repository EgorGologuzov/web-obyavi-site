import Button from './Button';
import CollapseContainer from './CollapseContainer';
import Grid from './Grid';
import Header from './Header';
import PagedList from './PagedList';
import Spliter from './Spliter';
import Subcaption from './Subcaption';
import Paragraf from './Paragraf';
import ToolButton from './ToolButton';
import ToolPanel from './ToolPanel';
import Card from './Card';
import ContextMenu from './ContextMenu';
import ContextMenuButton from './ContextMenuButton';
import React, { useState } from 'react';
import ModalFooter from './ModalFooter';
import { useAppContext } from '../contexts/AppContext';
import { useNewListContext, ListContextProvider } from '../contexts/ListContext';
import Avatar from './Avatar';

const ContentInsideModalExample = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleClick = (event) => {
        event.preventDefault();
        console.log(inputs);
    }

    return (
        <>
            <form>
                <label>Enter your name:
                    <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} />
                </label>
                <label>Enter your age:
                    <input type="number" name="age" value={inputs.age || ""} onChange={handleChange} />
                </label>
            </form>
            <ModalFooter>
                <Button onClick={handleClick}>console.log</Button>
                <Button onClick={handleClick}>console.log</Button>
            </ModalFooter>
        </>
    )
}

const CardFakeContent = () => {
    return (
        <div style={{ width: "100%", height: "200px", backgroundColor: "transparent", borderRadius: "10px" }}>
            <a href='/img/left-arrow-l.png'>Ссылка на /img/left-arrow-l.png</a>
        </div>
    )
}

const cards = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]

export default function EgorsContainer() {
    const appContext = useAppContext();

    const listContext = useNewListContext();
    const listContext2 = useNewListContext();

    const handleChooseButtonClick = (event, cardId) => {
        listContext.setSelectMode(true);
        listContext.setSelectedCards(new Set([cardId]));
    }

    const handleChooseButtonClick2 = (event, cardId) => {
        listContext2.setSelectMode(true);
        listContext2.setSelectedCards(new Set([cardId]));
    }

    return (
        <CollapseContainer header="Блоки Егора">
            <Header level="1">Заголовок 1</Header>
            <Header level="2">Заголовок 2</Header>
            <Header level="3">Заголовок 3</Header>
            <Header level="4">Заголовок 4</Header>
            <Header level="5">Заголовок 5</Header>
            <Header level="5" color="warning">Заголовок 5</Header>
            <Header level="6">Заголовок 6</Header>

            <Spliter />

            <Subcaption>Подзаголовок 1</Subcaption>
            <Subcaption level="2">Подзаголовок 2</Subcaption>
            <Subcaption level="2" color="primary">Подзаголовок 2</Subcaption>

            <Spliter height="50px" />

            <Paragraf>Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст
                Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст
                Нормальный текст</Paragraf>
            <Spliter />
            <Paragraf fontSize="small">Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький
                текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст
                Маленький текст Маленький текст Маленький текст</Paragraf>
            <Spliter />
            <Paragraf fontSize="10px" color="accent">Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький
                текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст
                Маленький текст Маленький текст Маленький текст</Paragraf>

            <Spliter />

            <Grid desktopColumns="3" mobileColumns="1">
                <Button onClick={() => console.log(1)}>{"console.log(1)"}</Button>
                <Button color="secondary" onClick={() => console.log(1)}>{"console.log(1)"}</Button>
                <Button color="warning" onClick={() => console.log(1)}>{"console.log(1)"}</Button>
                <Button disabled>Текст</Button>
                <Button color="secondary" disabled>Текст</Button>
                <Button color="warning" disabled>Текст</Button>
            </Grid>

            <Spliter />
            <ToolPanel>
                <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)} />
                <ToolButton icon="icon-cross" text="console.log(1)" onClick={() => console.log(1)} />
                <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="icon-cross" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="icon-cross" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="icon-cross" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="img/left-arrow-l.png" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="none" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton onClick={() => console.log(1)} />
                <ToolButton onClick={() => console.log(1)} />
                <ToolButton onClick={() => console.log(1)} />
            </ToolPanel>

            <Spliter />

            <ListContextProvider value={listContext}>
                <PagedList
                    pageMax="10"
                    onPageValueChange={(event) => console.log(event)}
                    tools={
                        <ToolButton icon="icon-picture" text="console.log(2)" onClick={() => console.log(2)} />
                    }
                    toolsForSelectedMode={
                        <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)} />
                    }>
                    {cards.map((card, index) => 
                        <Card id={card.id} key={card.id}>
                            <CardFakeContent />
                            <ContextMenu>
                                <ContextMenuButton text="Выбрать" onClick={(event) => handleChooseButtonClick(event, card.id)} />
                                <ContextMenuButton text="Показать отмеченные" onClick={() => console.log(listContext.selectedCards)} />
                                <ContextMenuButton text="console.log(2)" onClick={() => console.log(2)} />
                            </ContextMenu>
                        </Card>
                    )}
                </PagedList>
            </ListContextProvider>

            <ListContextProvider value={listContext2}>
                <PagedList
                    pageMax="10"
                    onPageValueChange={(event) => console.log(event)}
                    tools={
                        <ToolButton icon="icon-picture" text="console.log(2)" onClick={() => console.log(2)} />
                    }
                    toolsForSelectedMode={
                        <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)} />
                    }>
                    {cards.map((card, index) => 
                        <Card id={card.id} key={card.id}>
                            <CardFakeContent />
                            <ContextMenu>
                                <ContextMenuButton text="Выбрать" onClick={(event) => handleChooseButtonClick2(event, card.id)} />
                                <ContextMenuButton text="Показать отмеченные" onClick={() => console.log(listContext2.selectedCards)} />
                                <ContextMenuButton text="console.log(2)" onClick={() => console.log(2)} />
                            </ContextMenu>
                        </Card>
                    )}
                </PagedList>
            </ListContextProvider>
            
            <Spliter />

            <Grid desktopColumns="2" mobileColumns="1">
                <Button
                    color="secondary"
                    onClick={() => appContext.showModal(
                        "Модальное окно",
                        (<ContentInsideModalExample />)
                    )}>
                    Модальное окно
                </Button>
                <Button
                    color="secondary"
                    onClick={() => appContext.showModal(
                        "Перегруженное модальное окно",
                        (<div style={{ width: "1000px", height: "1000px", backgroundColor: "transparent" }}></div>)
                    )}>
                    Перегруженное модальное окно
                </Button>
            </Grid>

            <Spliter />

            <Grid desktopColumns="3" mobileColumns="1">
                <Button color="secondary" onClick={() =>
                    appContext.showNotification(
                        'Заголовок уведомления',
                        'Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления',
                        'common',
                        [{ text: "console.log(1)", onClick: () => console.log(1) }]
                    )}>
                    Показать уведомление common
                </Button>
                <Button color="primary" onClick={() =>
                    appContext.showNotification(
                        'Заголовок уведомления',
                        'Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления',
                        'important',
                        [{ text: "console.log(2)", onClick: () => console.log(2) }]
                    )}>
                    Показать уведомление important
                </Button>
                <Button color="warning" onClick={() =>
                    appContext.showNotification(
                        'Заголовок уведомления',
                        'Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления',
                        'critical',
                        [{ text: "console.log(3)", onClick: () => console.log(3) }]
                    )}>
                    Показать уведомление warning
                </Button>
            </Grid>

            <Spliter />

            <div style={{height: "100px", display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Avatar src="https://i.ytimg.com/vi/BOp5lW5ncM4/maxresdefault.jpg" />
                <Avatar src="" />
                <Avatar />
            </div>

            <Spliter />

        </CollapseContainer>
    );
}