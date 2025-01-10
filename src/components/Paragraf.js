export default function Paragraf({ children, color, fontSize = "normal" }) {
    let className;
    let style = {color: color ? `var(--${color})` : undefined }

    if (fontSize === "normal") {
        className = "text text_normal";
    } else if (fontSize === "small") {
        className = "text text_small";
    } else {
        className = "text";
        style.fontSize = fontSize;
    }

    return (
        <p className={className} style={style}>{children}</p>
    );
}