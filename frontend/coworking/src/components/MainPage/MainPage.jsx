import React from 'react';
import './mainStyles.css'

function MainPage() {
    return (
        <div className="container">
            <div className="header">
                <h1 className="header__title">ЛИЦЕЙ 373</h1>
                <nav className="header__nav">
                    <ul>
                        <li><a href="#">Главная</a></li>
                        <li><a href="#">Сервисы</a></li>
                        <li><a href="#">Индивидуальный проект</a></li>
                        <li><a href="#">О нас</a></li>
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
                            <button className="section__button">Вступить</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainPage;