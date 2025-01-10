import { Outlet } from "react-router-dom";
import "./LayoutCard.css"

export default function LayoutCard() {
    return (
        <div className="layout-card">
            <div className="layout-card__content">
                <Outlet />
            </div>
        </div>
    )
}
