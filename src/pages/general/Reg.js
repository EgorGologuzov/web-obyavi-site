import React, { useState } from 'react'
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Spliter from '../../components/Spliter';
import "./Reg.css"
import useTitle from '../../hook/useTitle';
import { InputEmail_withRegExp, InputPassword_withRegExp, InputPhone_withRegExp, InputString_withRegExp } from '../../hoc/withRegExpValidation';
import AutoForm, { useNewFormState } from '../../components/AutoForm';
import { useUserService } from '../../data/UserService';

export default function Reg() {
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
    const handleRegClick = (event) => {
        // Если в сете неправильно заполненных полей не пусто, то отмена авторизации и уведомление в лицо
        if (formState.invalidFields.size !== 0) {
            appContext.showNotification("", "Заполните все обязательные поля правильными значениями", "common");
            return;
        }

        // Проверяю совпадение паролей
        if (formState.values.password !== formState.values.passwordRepeat) {
            appContext.showNotification("", "Пароли не совпадают", "common");
            return;
        }

        // Устанавлияваю флаг занятости перед отправкой запроса
        setIsBusy(true);

        // Запрос на авторизацию
        userService.reg({ ...formState.values, phone: formState.values.login })
            // В случае успеха логиню пользователя и перенаправляю пользователя по заранее запрашиваему адресу
            .then(({ phone }) => {
                userService.signIn({ login: phone })
                    .then((user) => {
                        appContext.setUser(user);
                        navigate(fromPage, { replace: true })
                    })
            })
            // При неудаче показываю уведомление с сообщением ошибки
            .catch((error) => appContext.showNotification("", error.message, "critical"))
            // Снимаю флаг занятости вне зависимости от результата
            .finally(() => setIsBusy(false));
    }

    // устанавливаю загаловок страницы авторским хуком
    useTitle("Регистрация");

    return (
        <div className="reg-page">

            <header className="reg-page__header">
                <Header level="3">Регистрация</Header>
                <img className="reg-page__logo" style={{ content: "var(--logo-full)" }} />
            </header>

            {/* автоформа следит за изменениями значений внутренних валидируемых инпутов и их валидацией,
            результат отслеживания сохраняет в formState */}
            {/* обязательно нужно передать объект formState, инициализированный useNewFormState */}
            {/* подробнее в файле-источнике */}
            <AutoForm formState={formState}>
                {/* автовалидируемые по регулярному выражению инпуты, подробнее в файле-источнике */}
                {/* не забываем задавать уникальное имя каждому полю ввода */}
                <InputString_withRegExp
                    name="lastname"
                    label="Фамилия"
                    placeholder="Фамилия"
                    regExp={/^([А-Яа-яA-za-z]){1,50}$/g}
                    required
                    errorComment="Фамилия может содержать только буквенные символы и не должна быть длиннее 50 символов" />
                <InputString_withRegExp
                    name="firstname"
                    label="Имя"
                    placeholder="Имя"
                    regExp={/^([А-Яа-яA-za-z]){1,50}$/g}
                    required
                    errorComment="Имя может содержать только буквенные символы и не должно быть длиннее 50 символов" />
                <InputString_withRegExp
                    name="patronymic"
                    label="Отчество"
                    placeholder="Отчество"
                    regExp={/^([А-Яа-яA-za-z]){1,50}$/g}
                    errorComment="Отчество может содержать только буквенные символы и не должно быть длиннее 50 символов" />
                <Spliter />
                <InputPhone_withRegExp name="login" required />
                <InputEmail_withRegExp
                    name="email"
                    label="Электронная почта"
                    placeholder="E-mail"
                    required />
                <InputPassword_withRegExp
                    name="password"
                    required
                    placeholder="Введите пароль"
                    label="Введите пароль"
                    comment="Придумайет пароль не меньше чем из 8 символов" />
                <InputPassword_withRegExp
                    name="passwordRepeat"
                    required
                    placeholder="Повторите пароль"
                    label="Повторите пароль"
                    comment="Этот пароль должен повторять предыдущий" />
            </AutoForm>

            <Button onClick={handleRegClick} disabled={isBusy}>Зарегистрироваться</Button>
        </div>
    )
}