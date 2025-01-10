import React, { useState } from 'react'
import { useAppContext } from '../../contexts/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import "./Auth.css"
import useTitle from '../../hook/useTitle';
import { InputPassword_withRegExp, InputPhone_withRegExp } from '../../hoc/withRegExpValidation';
import AutoForm, { useNewFormState } from '../../components/AutoForm';
import { useUserService } from '../../data/UserService';

export default function Auth() {
    // контекст приложения, предоставляет доступ к глобальным функциям приложения
    // например авторизации, вызова уведомлений и модальных окон
    const appContext = useAppContext();

    // Возвращяет объект, содержайщий методы для получения информации о пользователях от сервера
    const userService = useUserService();

    // стандартные функции навигации React Router
    const location = useLocation();
    const navigate = useNavigate();

    // состояние формы, предоставляет доступ к values и invalidFields
    // values - объект {имяИнпута: значениеИнпута}, имяПоля задается в пропсах инпута как name=""
    // invalidFields - Set, содержит имена неправильно заполненных полей
    const formState = useNewFormState();

    // Указаывает находиться ли запрос авторизации в процессе выполнения
    const [isBusy, setIsBusy] = useState(false);

    // Получаю путь, с которого пришел пользователь, чтобы после успешной авторизации сразу отправить
    // его на нужную страницу
    const fromPage = location.state?.from?.pathname || "/";

    // Обрабатываю нажатие на кнопку входа
    const handleSignInClick = (event) => {
        // Если в сете неправильно заполненных полей не пусто, то отмена авторизации и уведомление в лицо
        if (formState.invalidFields.size !== 0) {
            appContext.showNotification("", "Заполните все обязательные поля правильными значениями", "common");
            return;
        }

        // Устанавлияваю флаг занятости перед отправкой запроса
        setIsBusy(true);

        // Запрос на авторизацию
        userService.signIn({ login: formState.values.login })
            // В случае успеха устанавливаю значение пользователя в контекст приложения и
            // перенаправляю пользователя по заранее запрашиваему адресу
            .then((user) => {
                appContext.setUser(user);
                navigate(fromPage, { replace: true });
            })
            // При неудаче показываю уведомление с сообщением ошибки
            .catch((error) => appContext.showNotification("", error.message, "critical"))
            // Снимаю флаг занятости вне зависимости от результата
            .finally(() => setIsBusy(false));
    }

    // устанавливаю загаловок страницы авторским хуком
    useTitle("Авторизация");

    return (
        <div className="auth-page">

            <header className="auth-page__header">
                <Header level="2">Вход</Header>
                <img className="auth-page__logo" style={{ content: "var(--logo-full)" }} />
            </header>

            {/* автоформа следит за изменениями значений внутренних валидируемых инпутов и их валидацией,
            результат отслеживания сохраняет в formState */}
            {/* обязательно нужно передать объект formState, инициализированный useNewFormState */}
            {/* подробнее в файле-источнике */}
            <AutoForm formState={formState}>
                {/* автовалидируемые по регулярному выражению инпуты, подробнее в файле-источнике */}
                {/* не забываем задавать уникальное имя каждому полю ввода */}
                <InputPhone_withRegExp name="login" required />
                <InputPassword_withRegExp name="password" required placeholder="Введите пароль" />
            </AutoForm>

            <div className="auth-page__links">
                <Link to="/recovery">Забыли пароль?</Link>
                <Link to="/reg">Зарегистрироваться</Link>
            </div>

            <Button onClick={handleSignInClick} disabled={isBusy}>Войти</Button>
        </div>
    )
}