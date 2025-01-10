export default function Card({ children, onClick, isChecked, id }) {
    return (
        <div id={id} className={isChecked ? 'card card_checked' : 'card'} onClick={onClick}>
            <img className="card__check-mark" />
            <div className="card__content">
                {children}
            </div>
        </div>
    );
}
