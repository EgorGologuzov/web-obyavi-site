import UpDown from "./UpDown";
import ToolPanel from "./ToolPanel";
import ListView from "./ListView";
import ToolButton from "./ToolButton";
import { useListContext } from "../contexts/ListContext";

export default function PagedList({
        children,
        pageMin = 1,
        pageMax = 1,
        pageValue = 1,
        onPageValueChange,
        tools,
        toolsForSelectedMode
    }) {
    const listContext = useListContext();

    return (
        <div className="paged-list">
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
                <UpDown min={pageMin} max={pageMax} value={pageValue} onChange={onPageValueChange} />
            </ToolPanel>
            <div className="paged-list__content">
                <ListView desktopColumns="2" mobileColumns="1">
                    {children}
                </ListView>
            </div>
        </div>
    )
}
