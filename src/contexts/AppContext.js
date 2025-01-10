import React, { createContext, useContext, useEffect, useState } from 'react';

// счетчик для идентификаторов уведомлений
let notificationId = 1;

// создаю контекст приложения стандартным реакт хуком
const AppContext = createContext();

// хук для получения контекста приложения
export function useAppContext() {
    return useContext(AppContext);
};

// функция чтения данных пользователя из локального хранилища
const readUserFromLocalStorage = () => {
    const user = localStorage.getItem("loginedUser");
    return user ? JSON.parse(user) : null;
}

// функция записи данных пользователя в локальное хранилища
const writeUserToLocalStorage = (user) => {
    localStorage.setItem("loginedUser", JSON.stringify(user));
}

// функция удаления данных пользователя из локального хранилища
const removeUserFromLocalStorage = () => {
    localStorage.removeItem("loginedUser");
}

// функция для установки чекбокса переключающего темы в нужное состояние
// true - темная тема, false - светлая
const setThemeSwitch = (value) => {
    document.getElementById("themeSwitch").checked = value;
}

// провайдер контекста приложения, оборачивает все приложение общим контекстом
export function AppContextProvider({ children }) {
    // список уведомлений, отображаемых в данный момент (до 3 штук)
    const [notifications, setNotifications] = useState([]);

    // текущий заголовок модального окна
    const [modalCaption, setModalCaption] = useState("");
    // текущее содержимое модального окна
    const [modalChildren, setModalChildren] = useState(<div></div>);
    // отображается ли модальное окно
    const [modalShow, setModalShow] = useState(false);

    // залогиненный на данный момент пользователь
    // пытаюсь подгрузить его из локального хранилища
    const [loginedUser, setLoginedUser] = useState(() => readUserFromLocalStorage());

    // тема приложения
    // пытаюсь получить ее из данных о пользователе в локальном хранилище
    const [theme, setTheme] = useState(() => readUserFromLocalStorage()?.theme ?? "light");

    // функция для добавления уведомления
    const showNotification = (caption, text, level, buttons) => {
        // генерирую уникальный ключ для уведомления
        const key = "notification-" + notificationId;
        notificationId++;

        setNotifications((prev) => {
            // собираю объект уведомления
            const newNotification = { key, caption, text, level, buttons };
            // добавляю уведомление в список уведомелний
            const updatedNotifications = [...prev, newNotification];

            // если уведомлений больше 3 - последнее удаляем
            if (updatedNotifications.length > 3) {
                updatedNotifications.shift();
            }

            return updatedNotifications;
        });

        // устнавливаю таймер для удаления уведомления через 10 секунд
        setTimeout(() => {
            removeNotification(key);
        }, 10000);
    };

    const removeNotification = (key) => {
        // удаляю уведомление из спсика по ключу
        setNotifications((prev) => prev.filter((notification) => notification.key !== key ));
    };

    const showModal = (captionText, children) => {
        // устанавливаю заголовок и контент
        setModalCaption(captionText);
        setModalChildren(children);
        // показываю окно
        setModalShow(true);
    }

    // скрываю окно, не очищая содержимое
    const hideModal = () => {
        setModalShow(false);
    }

    // устанавливаю значение loginedUser
    const setUser = (user) => {
        setLoginedUser(user);
        writeUserToLocalStorage(user);
        if(user.theme && user.theme !== theme) {
            changeTheme();
        }
    }

    // снимаю значение loginedUser
    const unsetUser = () => {
        setLoginedUser(undefined);
        removeUserFromLocalStorage();
    }

    const changeTheme = () => {
        // значение темы меняю на противоположное
        const newTheme = theme === "light" ? "dark" : "light";
        // устанавливаю значение темы
        setTheme(newTheme);
        // устанавливаю чекбокс темы
        setThemeSwitch(newTheme === "dark");
        // если есть залогиненный пользователей, записываю ему эту тему, как тему по умолчанию
        if (loginedUser) {
            loginedUser.theme = newTheme;
            writeUserToLocalStorage(loginedUser);
        }
    }

    useEffect(() => {
        // устанавливаю чекбокс темы в соответсвии со значением
        setThemeSwitch(theme === "dark");
    }, [theme]);

    // собираю все в один объект
    const contextValue = {
        notifications,
        showNotification,
        removeNotification,
        modalCaption,
        modalChildren,
        modalShow,
        showModal,
        hideModal,
        loginedUser,
        setUser,
        unsetUser,
        theme,
        changeTheme
    }

    // возвращаю провайдер контекста с установленным значением
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
