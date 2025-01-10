import ToolPanel from "./ToolPanel";
import ListView from "./ListView";
import ToolButton from "./ToolButton";
import { useListContext } from "../contexts/ListContext";
import { useState ,useEffect} from "react";

export default function ScrollingList({
    children,
    tools,
    toolsForSelectedMode,
    onBottomReached,
    maxHeight=null}){
    const listContext = useListContext();
    const [counter,setCounter]=useState(1);
    const handleScroll=(e)=>{
        const bottom=e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight+1;
        if (bottom&&counter===0){
            onBottomReached();
            setCounter(1);
        }
    }

    useEffect(()=>{
        let timeout=setTimeout(()=>{
            if(counter>0)
                setCounter(counter-1);
        },1000)
        return ()=>clearTimeout(timeout)
    },[counter])

    return ( 
        <div className="scrolling-list" style={{maxHeight:maxHeight?maxHeight:'auto'}}>
            <ToolPanel>
                {listContext.selectMode && (
                    <>
                    {toolsForSelectedMode}
                    <ToolButton text="Отмена" icon="icon-cross" onClick={() => {listContext.setSelectMode(false)}}/>
                    </>
                )}
                {!listContext.selectMode && (
                    <>
                    {tools}
                    </>
                )}
            </ToolPanel>
            <div className="scrolling-list__content" onScroll={handleScroll}>
                <ListView desktopColumns="2" mobileColumns="1" >
                    {children}
                </ListView>
            </div>
        </div>
    );
}