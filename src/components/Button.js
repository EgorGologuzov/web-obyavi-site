import ErrorMessage from './ErrorMessage';

export default function Button({children, disabled = false, color = "primary", onClick}) {
    let className = color === "primary" ? "btn btn_primary" 
        : color === "secondary" ? "btn btn_secondary" 
        : color === "warning" ? "btn btn_warning"
        : undefined;

    if (className) {
        return (
            <button className={className} disabled={disabled ?? false} onClick={onClick}>{children}</button>
        )
    } else {
        return <ErrorMessage>Недопустимый цвет кнопки</ErrorMessage>
    }
}

