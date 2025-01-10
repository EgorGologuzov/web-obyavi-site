import React from 'react';
import ReactDOM from 'react-dom/client';
import './artems-index.css';
import './egors-index.css';
import App from './App';
import { AppContextProvider } from './contexts/AppContext';
import NotificationList from './components/NotificationList';
import Modal from './components/Modal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppContextProvider>
            <App />
            <NotificationList />
            <Modal />
        </AppContextProvider>
    </React.StrictMode>
);
