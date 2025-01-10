import React, { useState } from 'react'
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Spliter from '../../components/Spliter';
import Subcaption from '../../components/Subcaption';
import "./Recovery.css"
import useTitle from '../../hook/useTitle';
import { InputPhone_withRegExp, InputPassword_withRegExp, InputString_withRegExp } from '../../hoc/withRegExpValidation';
import AutoForm, { useNewFormState } from '../../components/AutoForm';
import { useUserService } from '../../data/UserService';

export default function Recovery() {
    // контекст приложения, предоставляет доступ к глобальным функциям приложения
    // например авторизации, вызова уведомлений и модальных окон
    const appContext = useAppContext();

    const userService = useUserService();

    // стандартные функции навигации React Router
    const location = useLocation();
    const navigate = useNavigate();

    const phoneFormState = useNewFormState();
    const codeFormState = useNewFormState();
    const passwordFormState = useNewFormState();

    // Указаывает находиться ли запрос авторизации в процессе выполнения
    const [isBusy, setIsBusy] = useState(false);

    const [sendButtoninTimeout, setSendButtoninTimeout] = useState(false);

    const [stage, setStage] = useState(1);

    const [accountEmail, setAccountEmail] = useState();

    // Получаю путь, с которого пришел пользователь, чтобы после успешной авторизации сразу отправить
    // его на нужную страницу
    const fromPage = location.state?.from?.pathname || "/";

    const handleSendClick = (event) => {
        if (phoneFormState.invalidFields.size !== 0) {
            appContext.showNotification("", "Заполните все обязательные поля правильными значениями", "common");
            return;
        }

        setIsBusy(true);

        userService.sendRecoveryRequest(phoneFormState.values)
            .then(({ email }) => {
                setSendButtoninTimeout(true);
                appContext.showNotification("", "Повторно отправить код можно через 60 секунд", "common");
                setTimeout(() => setSendButtoninTimeout(false), 60_000);
                setStage(2);
                setAccountEmail(email);
            })
            .catch((error) => appContext.showNotification("", error.message, "critical"))
            .finally(() => setIsBusy(false));
    }

    const handleCheckClick = (event) => {
        if (codeFormState.invalidFields.size !== 0) {
            appContext.showNotification("", "Заполните все обязательные поля правильными значениями", "common");
            return;
        }

        setIsBusy(true);

        userService.finishRecovery({ phone: phoneFormState.values.phone, recoveryCode: codeFormState.values.recoveryCode })
            .then(() => setStage(3))
            .catch((error) => appContext.showNotification("", error.message, "critical"))
            .finally(() => setIsBusy(false));
    }

    const handleFinishClick = (event) => {
        if (passwordFormState.invalidFields.size !== 0) {
            appContext.showNotification("", "Заполните все обязательные поля правильными значениями", "common");
            return;
        }

        if (passwordFormState.values.password !== passwordFormState.values.passwordRepeat) {
            appContext.showNotification("", "Пароли не совпадают", "common");
            return;
        }

        setIsBusy(true);

        userService.changePassword({ phone: phoneFormState.values.phone, newPassword: passwordFormState.values.password })
            .then(({ login }) => {
                userService.signIn({ login })
                .then((user) => {
                    appContext.setUser(user);
                    navigate(fromPage, { replace: true })
                })
            })
            .catch((error) => appContext.showNotification("", error.message, "critical"))
            .finally(() => setIsBusy(false));
    }

    useTitle("Восстановление");

    return (
        <div className="recovery-page">

            <header className="recovery-page__header">
                <Header level="3">Восстановление</Header>
                <img className="recovery-page__logo" />
            </header>

            {stage >= 1 && (
                <>
                    <Subcaption level={2}>
                        1. Введите Ваш номер телефона ниже. На e-mail, указанный в вашем профиле, придёт код восстановления.
                    </Subcaption>

                    <AutoForm formState={phoneFormState}>
                        <InputPhone_withRegExp name="phone" required disabled={stage > 2} />
                    </AutoForm>

                    <Button onClick={handleSendClick} disabled={isBusy || sendButtoninTimeout || stage > 2}>Отправить</Button>
                </>
            )}

            {stage >= 2 && (
                <>
                    <Spliter />

                    <Subcaption level={2}>
                        2. Проверьте {accountEmail} Введите код восстановления из письма.
                    </Subcaption>

                    <AutoForm formState={codeFormState}>
                        <InputString_withRegExp
                            name="recoveryCode"
                            label="Код восстановления"
                            placeholder="Код"
                            required
                            disabled={stage !== 2} />
                    </AutoForm>

                    <Button onClick={handleCheckClick} disabled={isBusy || stage !== 2}>Проверить</Button>
                </>
            )}

            {stage >= 3 && (
                <>
                    <Spliter />

                    <Subcaption level={2}>
                        3. Создайте новый, надёжный пароль. Затем нажмите кнопку ниже.
                    </Subcaption>

                    <AutoForm formState={passwordFormState}>
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
                            comment="Этот пароль должен повторять предыдущий"  />
                    </AutoForm>

                    <Button onClick={handleFinishClick} disabled={isBusy}>Завершить восстановление</Button>
                </>
            )}

        </div>
    )
}