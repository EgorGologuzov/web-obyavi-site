import { useEffect, useState } from "react";
import InputPhone from "../components/InputPhone";
import InputPassword from "../components/InputPassword";
import InputString from "../components/InputString";
import InputText from "../components/InputText";

// Рекомендую посмореть на ютубе или почитать что такое hoc в react
// Расширение (hoc) поверх любого инпута, для добавления логики валидации по рег. выражениям
export function withRegExpValidation(Input, regExpDefault, commentDefault, errorCommentDefault) {
    // Возвращаю расширенный компонент
    return function ({
        value, // значение инпута, если задано, то будет жестко ставиться, если не задано, то можно свободно редактировать поле
        onChange, // событие изменения значения
        regExp, // регулярное выражение, ИМЕННО ОБЪЕКТ, а не строка, напрмер заданный так /рег.выр./g или так new RegExp()
        required, // Обязательно ли заполнять поле, если false, то будет пропускать поля даже если это не соответсвует регуляру
        comment, // Коментарий под инпутом в нормальном режиме
        errorComment, // Коментарий в режиме ошибки
        showError = true, // Если false, то режим ошибки не активируется даже если значение не соотвествует регуляру
        onMontage, // событие вызвается при окночании монтирования и передает объект с резальтатами проверки начального значения
        defaultValue, // значение по умолчанию, устанавливается при первом монтировании, далее игнорируется
        ...otherProps }) { // любые другие пропсы, которые принимает расширяемый инпут, например label или id

        // Устанавливаю значения переданные в хок по умолчанию, если не были переданны напрямую
        regExp ??= regExpDefault;
        comment ??= commentDefault;
        errorComment ??= errorCommentDefault;
        defaultValue = typeof defaultValue == "number" ? defaultValue.toString() : defaultValue;
        value = typeof value == "number" ? value.toString() : value;

        // Создаю состояния для значения и результата проверки
        const [currentValue, setCurrentValue] = useState(defaultValue);
        const [isValid, setIsValid] = useState(true);

        // Функция валидации значения
        const validate = (newValue) => {
            if (!required && !newValue) {
                return true;
            }

            if (required && !newValue) {
                return false;
            }

            if (!regExp) {
                return true;
            }

            return !!newValue.match(regExp);
        }

        // обработчик изменения значения
        const handleChange = (event) => {
            // получаю значение и проверяю его
            const newValue = event.target.value;
            const isValid = validate(newValue);
            // устанавливаю результат валидации и новое значение
            setIsValid(isValid);
            setCurrentValue(newValue);
            // вызываю событие onChange, передаю новое значение и результат валидации
            onChange && onChange({ newValue: newValue, isValid: isValid });
        }

        // первоначальная валидация при монтировании компонента
        useEffect(() => {
            const realValue = value ?? currentValue;
            onMontage && onMontage({ value: realValue, isValid: validate(realValue) })
        })

        // возвращаю изначальный инпут, задавая нужные пропсы
        return (
            <Input
                {...otherProps} // сначала задаю не используемые в этом хуке пропсы, потом все остальные
                value={value ?? currentValue}
                valid={(!showError) || (showError && isValid)}
                comment={(!showError) || (showError && isValid) ? comment : errorComment}
                required={required}
                onChange={handleChange} />);
    }
}

// оборачиваю InputPhone в это расширение, задаю значения по умочанию для regExp, comment и errorComment
export const InputPhone_withRegExp = 
    withRegExpValidation(  
        InputPhone,
        /^\+7\s\(\d{3}\)\s\d{3}\s\d{2}\-\d{2}$/g,
        "Российский номер телефона",
        "Номер должен соотвествовать формату +7 (000) 000 00-00");

// оборачиваю InputPassword в это расширение, задаю значения по умочанию для regExp, comment и errorComment
export const InputPassword_withRegExp = 
    withRegExpValidation(  
        InputPassword,
        /^.{8,256}$/g,
        "Ваш пароль",
        "Пароль должен состоять минимум из 8 символов, максимум из 256");

// оборачиваю InputString в это расширение, regExp, comment и errorComment нужно будет передать пропсами при использовании
// <InputString_withRegExp regExp={/someRegExp/g} comment="some text" errorComment="error"/>
export const InputString_withRegExp = withRegExpValidation(InputString);

// создаю InputEmail_withRegExp на основе InputString оборачивая его в расширение и задавая значения по умолчанию
export const InputEmail_withRegExp = 
    withRegExpValidation(
        InputString,
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
        "",
        "Неверный формат почты");

export const InputText_withRegExp = withRegExpValidation(InputText);