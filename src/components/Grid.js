export default function Grid({ children, desktopColumns = 2, mobileColumns = 1, gap = "10px" }) {
    let className = `grid-container grid-container_desktop_${desktopColumns} grid-container_mobile_${mobileColumns}`;
    let style = {gap: gap};

    return (
        <div className={className} style={style}>
            {children}
        </div>
    )
}
