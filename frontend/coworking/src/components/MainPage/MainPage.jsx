import React, {useEffect, useState} from 'react';
import './mainStyles.css'
import {useNavigate} from "react-router-dom";


function MainPage() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch('http://192.168.51.231:8000/api/note/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": `bearer ${token}`
                },
            });

            const user_res = await response.json();
            setUser(user_res);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="header__title">ЛИЦЕЙ 373</h1>
                <nav className="header__nav">
                    <ul>
                        <li><a href="/profile">{user["full_name"]}</a></li>
                        <li><a href="/main">Главная</a></li>
                        <li><a href="/services">Сервисы</a></li>
                        <li><a href="/project">Индивидуальный проект</a></li>
                        <li><a href="/about">О нас</a></li>
                    </ul>
                </nav>
            </div>

            <main className="main">
                <div className="section__content">
                    <div className="row">
                        <div className="col">
                            <h2>Посмотреть все работы</h2>
                            <p>Проекты всех участников</p>
                        </div>
                        <div className="col">
                            <button className="section__button">Посмотреть</button>
                        </div>
                    </div>
                </div>

                <div className="section__content">
                    <div className="row">
                        <div className="col">
                            <h2>Мои проекты</h2>
                            <p>Все мои проекты</p>
                        </div>
                        <div className="col">
                            <button className="section__button">Посмотреть</button>
                        </div>
                    </div>

                </div>

                <div className="section__content">
                    <div className="row">
                        <div className="col">
                            <h2>Создать новый проект</h2>
                            <p>Начать с чистого листа</p>
                        </div>
                        <div className="col">
                            <button className="section__button">Создать</button>
                        </div>
                    </div>
                </div>

                <div className="section__content">
                    <div className="row">
                        <div className="col">
                            <h2>Вступить в группу</h2>
                            <p>Найти куратора</p>
                        </div>
                        <div className="col">
                            <button className="section__button" onClick={() => {
                                navigate('/group/enter');
                            }}>Вступить
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="footer">
                <p>Copyright 2024 Цифровое коворкинговое пространство Лицей 373</p>
            </footer>
        </div>
    );
}

export default MainPage;