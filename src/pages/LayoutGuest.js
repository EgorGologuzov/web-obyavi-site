import React from 'react'
import './LayoutGuest.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Subcaption from '../components/Subcaption'
import Button from '../components/Button'

export default function LayoutGuest() {
    const navigate = useNavigate();

    return (
        <div className="layout-guest">
            <header className="layout-guest__header">
                <div className="layout-guest__left">
                    <img className="layout-guest__logo" />
                </div>
                <div className="layout-guest__buttons">
                    <Button color="primary" onClick={() => navigate("/auth")}>Вход</Button>
                    <Button color="secondary" onClick={() => navigate("/reg")}>Регистрация</Button>
                </div>
            </header>
            <div className="layout-guest__page">
                <div className="layout-guest__content">
                    <Outlet />
                    <div style={{height: "300px", width: "100%", backgroundColor: "var(--light)"}}></div>
                    <div style={{height: "300px", width: "100%", backgroundColor: "var(--fg)"}}></div>
                    <div style={{height: "300px", width: "100%", backgroundColor: "var(--light)"}}></div>
                    <div style={{height: "300px", width: "100%", backgroundColor: "var(--fg)"}}></div>
                    <div style={{height: "300px", width: "100%", backgroundColor: "var(--light)"}}></div>
                    <div style={{height: "300px", width: "100%", backgroundColor: "var(--fg)"}}></div>
                </div>
            </div>
        </div>
    )
}
