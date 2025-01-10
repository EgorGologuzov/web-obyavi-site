import Button from "./Button";
import Header from "./Header";
import React, { useRef, useEffect } from 'react';
import { isPointInRect } from "../utils/utils";
import { useAppContext } from '../contexts/AppContext';

export default function Modal() {
    const modalFormRef = useRef(null);
    const appContext = useAppContext();

    const handleWindowClick = (event) => {
        if (!modalFormRef.current) {
            return;
        }

        if (!isPointInRect(event.clientX, event.clientY, modalFormRef.current.getBoundingClientRect())) {
            appContext.hideModal();
        }
    }

    return appContext.modalShow && (
        <div className="modal" onClick={handleWindowClick}>
            <div ref={modalFormRef} className="modal__form">
                <div className="modal__header">
                    <Header level="4">{appContext.modalCaption}</Header>
                    <img className="modal__cross" onClick={() => appContext.hideModal()} />
                </div>
                <div className="modal__content">
                    {appContext.modalChildren}
                </div>
            </div>
        </div>
    )
}
