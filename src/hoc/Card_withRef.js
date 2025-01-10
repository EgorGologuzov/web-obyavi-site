import Card from "../components/Card";
import { forwardRef } from "react";

export function Ref(Component){
    return forwardRef((props,ref)=>            
        <div ref={ref}>
            <Component {...props} />
        </div>
    )}

export const Card_withRef = Ref(Card);