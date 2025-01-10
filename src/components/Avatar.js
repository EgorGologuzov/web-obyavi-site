export default function Avatar({ src, onClick }) {
    const imgStyle = {};

    if (!src) {
        imgStyle.content = "var(--icon-avatar-placeholder)";
    }

    if (onClick) {
        imgStyle.cursor = "pointer";
    }

    return (
        <div className="avatar">
            {src && (
                <img className="avatar__img" style={imgStyle} src={src} onClick={onClick} />
            )}
            {!src && (
                <img className="avatar__img" style={imgStyle} onClick={onClick} />
            )}
        </div>
    )
}
