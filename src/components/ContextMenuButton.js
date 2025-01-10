export default function ContextMenuButton({ text, onClick }) {
    const handleClick = (event) => {
        onClick && onClick(event);
        event.preventDefault();
    }

    return (
        <button className="context-menu__btn" onClick={handleClick}>{text}</button>
    )
}
