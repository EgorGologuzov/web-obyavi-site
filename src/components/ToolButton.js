export default function ToolButton({ text, icon = "icon-picture", disabled = false, onClick }) {
    let img;
    let label;

    if (typeof icon === "string" && icon.startsWith("icon")) {
        img = <img className={`tool-btn__icon`} style={{content: `var(--${icon})`}} alt=""/>
    } else {
        img = <img className="tool-btn__icon" src={icon} alt=""/>
    }

    if (text) {
        label = <label className="tool-btn__label">{text}</label>
    }

    return (
        <button className="tool-btn" onClick={onClick} disabled={disabled}>
            <div className="tool-btn__curtain"></div>
            {img}
            {label}
        </button>
    )
}
