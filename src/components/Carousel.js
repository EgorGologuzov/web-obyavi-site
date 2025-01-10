import ToolPanel from "./ToolPanel";
import UpDown from "./UpDown";

export default function Carousel({
    children,
    pageMin = 1,
    pageMax = 1,
    pageValue = 1,
    onPageValueChange,
    tools}){

    return ( 
        <div className="carousel">
            <ToolPanel>
                {tools}
                <UpDown min={pageMin} max={pageMax} value={pageValue} onChange={onPageValueChange}/>
            </ToolPanel>
            <div className="carousel__content">
                {children}
            </div>
        </div>
     );
}