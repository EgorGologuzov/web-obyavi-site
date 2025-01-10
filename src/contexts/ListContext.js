import React, { createContext, useContext, useEffect, useState } from 'react';

const ListContext = createContext();

export function useListContext() {
    return useContext(ListContext);
};

export function useNewListContext() {
    const [selectMode, setSelectMode] = useState(false);
    const [selectedCards, setSelectedCards] = useState(new Set());

    const addSelectedCards = (cardId) => {
        let newSet = new Set(selectedCards);
        newSet.add(cardId);
        setSelectedCards(newSet);
    }

    const deleteSelectedCards = (cardId) => {
        let newSet = new Set(selectedCards);
        newSet.delete(cardId);
        setSelectedCards(newSet);
    }

    const contextValue = {
        selectMode,
        selectedCards,
        setSelectMode,
        addSelectedCards,
        deleteSelectedCards,
        setSelectedCards
    }

    return contextValue;
}

export function ListContextProvider({ children, value }) {
    return (<ListContext.Provider value={value}>{children}</ListContext.Provider>);
};

export const selectCards = (listContext, cardIdList) => {
    listContext.setSelectMode(true);
    listContext.setSelectedCards(new Set(cardIdList));
}
