import ToolButton from "./ToolButton";
import { useState } from "react";

export default function UpDown({
    min = 1,
    max = 10,
    value = 1,
    needSetValueForce,
    disabled,
    canPrintValue = true,
    onChange
}) {
    min = +min;
    max = +max;
    value = +value;

    const [numValue, setNumValue] = useState(value);
    const [pastNumValue, setPastNumValue] = useState(value);

    const checkCorrectAndSetNumValue = (value) => {
        value = Number(value);

        const newValue = value < min ? min
            : value > max ? max
            : value;

        setNumValue(newValue);

        if (pastNumValue === newValue) {
            return;
        }

        const oldValue = pastNumValue;

        setPastNumValue(newValue);
        onChange && onChange({
            newValue,
            oldValue,
        });
    }

    const handleChange = (event) => {
        const value = Number(event.target.value);
        setNumValue(value);
    };

    const handleBlur = (event) => {
        checkCorrectAndSetNumValue(event.target.value);
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            checkCorrectAndSetNumValue(event.target.value);
        }
    };

    const realValue = needSetValueForce ? value : numValue;
    if (needSetValueForce && value != numValue) setTimeout(() => checkCorrectAndSetNumValue(value), 100);

    return (
        <div className="up-down">
            <ToolButton
                icon="icon-left-arrow"
                onClick={() => checkCorrectAndSetNumValue(realValue - 1)}
                disabled={realValue <= min || disabled} />
            <input
                className="up-down__input"
                type="number"
                value={realValue}
                disabled={disabled}
                readOnly={!canPrintValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyUp={handleKeyUp}/>
            <label className="up-down__label">/{max}</label>
            <ToolButton
                icon="icon-right-arrow"
                onClick={() => checkCorrectAndSetNumValue(realValue + 1)}
                disabled={realValue >= max || disabled} />
        </div>
    )
}
