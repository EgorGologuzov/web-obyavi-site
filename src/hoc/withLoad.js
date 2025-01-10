import React from "react"
import Load from "../components/Load"
import PagedList from "../components/PagedList"
import ScrollingList from "../components/ScrollingList"
import { ListContextProvider } from "../contexts/ListContext"
import Fail from "../components/Fail"

export function withLoad(List) {
    return function({ isBusy, hasItems, listContext, children, ...otherProps }) {
        const hasChildren = !!React.Children.count(children);
        return (
            <ListContextProvider value={listContext}>
                <List {...otherProps}>
                    {hasChildren && children || isBusy && <Load /> || <Fail message="Нет элементов" />}
                </List>
            </ListContextProvider>
        )
    }
}

export const PagedList_withLoad = withLoad(PagedList);

export const ScrollingList_withLoad=withLoad(ScrollingList);