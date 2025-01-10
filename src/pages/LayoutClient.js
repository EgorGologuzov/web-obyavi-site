import { Outlet, useNavigate } from "react-router-dom";
import ToolButton from "../components/ToolButton";
import "./LayoutClient.css"
import Subcaption from "../components/Subcaption";
import Header from "../components/Header";
import { useRef, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import SearchString from "../components/SearchString";
import Avatar from "../components/Avatar";
import { useYesNoModal } from "../components/YesNoModal";
import { useSearchService } from "../data/SearchService";
import { useUserService } from "../data/UserService";

let pastSearchRequestChangeTime;

export default function LayoutClient() {
    const [menuOpened, setMenuOpened] = useState(false);
    const menuRef = useRef(null);
    const curtainRef = useRef(null);
    const navigate = useNavigate();
    const appContext = useAppContext();
    const [searchRequest, setSearchRequest] = useState();
    const [searchHints, setSearchHints] = useState([]);
    const showYesNo = useYesNoModal();
    const searchService = useSearchService();
    const userService = useUserService();

    const changeMenuOpened = () => {
        menuRef.current.style = menuOpened ? "left: -350px" : "left: 0px";
        curtainRef.current.style = menuOpened ? "display: none" : "display: block";
        setMenuOpened(!menuOpened);
    }

    const navigateAndCloseMenu = (path) => {
        menuOpened && changeMenuOpened();
        navigate(path);
    }

    const signOut = () => {
        showYesNo("Вы уверенны, что хотите выйти?", () => {
            userService.signOut();
            appContext.unsetUser();
            navigate("/auth", {replace: true});
        })
    }

    const handleSearchRequestChanged = (oldValue, newValue) => {
        setSearchRequest(newValue);
        
        if (pastSearchRequestChangeTime && (new Date() - pastSearchRequestChangeTime) > 500) {
            searchService.getHints(newValue)
                .then((hints) => setSearchHints(hints));
        }

        pastSearchRequestChangeTime = new Date();
    }

    return (
    <div className="layout-client">
        <header className="layout-client__header">
            <ToolButton icon="icon-menu" onClick={changeMenuOpened}/>
            <img className="layout-client__logo" />
            <div className="layout-client__right">
                <SearchString
                    hints={searchHints}
                    inputValue={searchRequest ?? ""}
                    placeholder="Поиск по сайту"
                    onChange={handleSearchRequestChanged}
                    onSearch={() => 1}/>
                <Avatar src={appContext.loginedUser.avatar} onClick={() => navigateAndCloseMenu("/c/profile")} />
            </div>
        </header>
        <div className="layout-client__menu" ref={menuRef}>
            <div className="layout-client__account-data">
                <Avatar src={appContext.loginedUser.avatar} onClick={() => navigateAndCloseMenu("/c/profile")} />
                <div className="layout-client__name-id">
                    <Header level={4}>{`${appContext.loginedUser.firstname} ${appContext.loginedUser.lastname}`}</Header>
                    <Subcaption level={2}>Аккаунт: #{appContext.loginedUser.id}</Subcaption>
                </div>
            </div>
            <Subcaption level={2}>Опции:</Subcaption>
            <div className="layout-client__options">
                <ToolButton icon="icon-search" text="Поиск" onClick={() => navigateAndCloseMenu("/c/search")} />
                <ToolButton icon="icon-ad" text="Объявления" onClick={() => navigateAndCloseMenu("/c/ads")} />
                <ToolButton icon="icon-message" text="Сообщения" onClick={() => navigateAndCloseMenu("/c/chats")} />
                <ToolButton icon="icon-human" text="Профиль" onClick={() => navigateAndCloseMenu("/c/profile")} />
                <ToolButton icon="icon-heart-filled" text="Избранное" onClick={() => navigateAndCloseMenu("/c/favorite")} />
                <ToolButton icon="icon-settings" text="Настройки" onClick={() => navigateAndCloseMenu("/c/settings")} />
            </div>
            <Subcaption level={2}>Действия:</Subcaption>
            <div className="layout-client__actions">
                <ToolButton icon="icon-sun" text={`Сменить тему (${appContext.theme === "light" ? "светлая" : "темная"})`} onClick={() => appContext.changeTheme()}/>
                <ToolButton icon="icon-exit" text="Выход" onClick={signOut} />
            </div>
        </div>
        <div className="layout-client__curtain" ref={curtainRef} onClick={changeMenuOpened}></div>
        <div className="layout-client__page">
            <div className="layout-client__content">
                <Outlet />
            </div>
        </div>
    </div>
    )
}
