import React from 'react';
import Grid from "./Grid";
import { useListContext } from '../contexts/ListContext';
import Card from './Card';

export default function ListView({ children, desktopColumns = "2", mobileColumns = "1" }) {
    const listContext = useListContext();

    const handleCardClick = (cardId, event) => {
        if (!listContext.selectMode) {
            return;
        }

        event.preventDefault();

        if (listContext.selectedCards.has(cardId)) {
            listContext.deleteSelectedCards(cardId);
        } else {
            listContext.addSelectedCards(cardId);
        }
    };

    return (
        <div className={listContext.selectMode ? "list-view list-view_select-mode" : "list-view"}>
            <Grid desktopColumns={desktopColumns} mobileColumns={mobileColumns}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === Card) {
                        const cardId = child.props.id;
                        return React.cloneElement(child, {
                            onClick: (event) => {handleCardClick(cardId, event);},
                            isChecked: listContext.selectedCards.has(cardId)
                        });
                    }
                    return child;
                })}
            </Grid>
        </div>
    );
}
