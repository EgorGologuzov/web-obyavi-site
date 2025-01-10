import React from 'react';
import Paragraf from './Paragraf';
import Header from './Header';
import Spliter from './Spliter';
import { useAppContext } from '../contexts/AppContext';

export default function NotificationList() {
    const appContext = useAppContext();

    return (
        <div className="popup-list">
            {appContext.notifications.map((notification) => (
                <div key={notification.key} className={`popup popup_${notification.level}`}>
                    <div className="popup__content">
                        <Header level="5">{notification.caption}</Header>
                        <Paragraf fontSize='small'>{notification.text}</Paragraf>
                        <Spliter height="5px"/>
                        {notification.buttons && notification.buttons.map((button, index) => 
                            <span key={index} className="popup__btn" 
                                onClick={() => {
                                    appContext.removeNotification(notification.key);
                                    button.onClick && button.onClick();
                                }}>
                                {button.text}
                            </span>
                        )}
                        <span 
                            className="popup__btn" 
                            onClick={() => appContext.removeNotification(notification.key)}>
                            Закрыть
                        </span>
                    </div>
                    <div className="popup__icon">
                        <span>{
                            notification.level == "common" ? "!" 
                            : notification.level == "important" ? "!!" 
                            : notification.level == "critical" ? "!!!"
                            : ""}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
