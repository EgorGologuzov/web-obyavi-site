import React from 'react'
import { useNavigate } from 'react-router-dom';
import Card from "../../components/Card";
import Header from "../../components/Header";
import Button from "../../components/Button";
import "./Error.css"
import Paragraf from '../../components/Paragraf';
import Grid from '../../components/Grid';
import useTitle from '../../hook/useTitle';

const errors = {
    "403": { name: "Forbidden", message: "Вам не доступна эта страница" },
    "404": { name: "Not found", message: "Такой страницы нет" }
}

export default function Error({ code }) {
    const navigate = useNavigate();

    useTitle("Ошибка");

    return (
        <div className="error-page">
            <div className="error-page__content">
                <Header level="2" color="warning">Error: {` ${code} ${errors[code]?.name}`}</Header>
                <Paragraf>{errors[code]?.message}</Paragraf>
                <Grid desktopColumns="2" mobileColumns="1">
                    <Button onClick={() => navigate(-1)} color="primary">Назад</Button>
                    <Button onClick={() => navigate("/", { replace: true })} color="secondary">На главную</Button>
                </Grid>
            </div>
        </div>
    )
}
