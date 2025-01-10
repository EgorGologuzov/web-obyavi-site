import { Outlet, useNavigate } from "react-router-dom";
import ToolButton from "../components/ToolButton";
import "./LayoutModer.css"
import Subcaption from "../components/Subcaption";
import Header from "../components/Header";
import { useRef, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useYesNoModal } from "../components/YesNoModal";
import { useUserService } from "../data/UserService";

export default function LayoutModer() {
    const [menuOpened, setMenuOpened] = useState(false);
    const menuRef = useRef(null);
    const curtainRef = useRef(null);
    const navigate = useNavigate();
    const appContext = useAppContext();
    const showYesNo = useYesNoModal();
    const userService = useUserService();

    const changeMenuOpened = () => {
        menuRef.current.style = menuOpened ? "left: -350px" : "left: 0px";
        curtainRef.current.style = menuOpened ? "display: none" : "display: block";
        setMenuOpened(!menuOpened);
    }

    const navigateAndCloseMenu = (path) => {
        changeMenuOpened();
        navigate(path);
    }

    const signOut = () => {
        showYesNo("Вы уверенны, что хотите выйти?", () => {
            userService.signOut();
            appContext.unsetUser();
            navigate("/auth", {replace: true});
        })
    }

    return (
    <div className="layout-moder">
        <header className="layout-moder__header">
            <ToolButton icon="icon-menu" onClick={changeMenuOpened}/>
            <img className="layout-moder__logo" />
        </header>
        <div className="layout-moder__menu" ref={menuRef}>
            <div className="layout-moder__account-data">
                <Subcaption level={1}>Модератор: #{appContext.loginedUser.id}</Subcaption>
                <Header level={4}>{`${appContext.loginedUser.firstname} ${appContext.loginedUser.lastname}`}</Header>
            </div>
            <Subcaption level={2}>Опции:</Subcaption>
            <div className="layout-moder__options">
                <ToolButton icon="icon-ad" text="Объявления" onClick={() => navigateAndCloseMenu("/m/ads")} />
                <ToolButton icon="icon-human" text="Клиенты" onClick={() => navigateAndCloseMenu("/m/clients")} />
                <ToolButton icon="icon-complaint" text="Жалобы" onClick={() => navigateAndCloseMenu("/m/complaints")} />
                <ToolButton icon="icon-violation" text="Нарушения" onClick={() => navigateAndCloseMenu("/m/violations")} />
                <ToolButton icon="icon-message" text="Сообщения" onClick={() => navigateAndCloseMenu("/m/messages")} />
            </div>
            <Subcaption level={2}>Действия:</Subcaption>
            <div className="layout-moder__actions">
            <ToolButton icon="icon-sun" text={`Сменить тему (${appContext.theme === "light" ? "светлая" : "темная"})`} onClick={() => appContext.changeTheme()}/>
                <ToolButton icon="icon-exit" text="Выход" onClick={signOut} />
            </div>
        </div>
        <div className="layout-moder__curtain" ref={curtainRef} onClick={changeMenuOpened}></div>
        <div className="layout-moder__page">
            <div className="layout-moder__content">
                <Outlet />
                <div style={{height: "300px", width: "100%", backgroundColor: "var(--light)"}}></div>
                <div style={{height: "300px", width: "100%", backgroundColor: "var(--fg)"}}></div>
                <div style={{height: "300px", width: "100%", backgroundColor: "var(--light)"}}></div>
                <div style={{height: "300px", width: "100%", backgroundColor: "var(--fg)"}}></div>
                <div style={{height: "300px", width: "100%", backgroundColor: "var(--light)"}}></div>
                <div style={{height: "300px", width: "100%", backgroundColor: "var(--fg)"}}></div>
            </div>
        </div>
    </div>
    )
}
