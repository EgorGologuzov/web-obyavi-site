import { useEffect } from 'react'
import Paragraf from './Paragraf'
import ModalFooter from './ModalFooter'
import Button from './Button'
import { useAppContext } from '../contexts/AppContext'

export function useYesNoModal() {
    const appContext = useAppContext();
    return (text, onYes, onNo) => appContext.showModal("Подтвердите действие",
        <YesNoModal text={text}
            onYes={() => { appContext.hideModal(); onYes && onYes() }}
            onNo={() => { appContext.hideModal(); onNo && onNo() }} />);
}

export function YesNoModal({ text, onYes, onNo }) {
    useEffect(() => {
        document.querySelector(".modal__footer .btn_primary")?.focus();
    }, []);

    return (
        <div className="yes-no-modal">
            <Paragraf fontSize="16px">{text}</Paragraf>
            <ModalFooter>
                <Button color="primary" onClick={onNo}>Нет</Button>
                <Button color="secondary" onClick={onYes}>Да</Button>
            </ModalFooter>
        </div>
    )
}
