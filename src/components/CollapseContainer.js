export default function CollapseContainer({ children, header }) {
    return (
        <div className="collapse-container">
            <span>{header}</span>
            <input type="checkbox" className="collapse-container__switch" /><br />
            <div className="collapse-container__content">
            {children}
            </div>
        </div>
    );
}