import React, {useEffect, useState} from 'react';
import '../About/aboutStyles.css'


function Public() {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch('https://backend-coworking.onrender.com/api/note/user', {
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
                        <li><a href="/news">Новости</a></li>
                        <li><a href="/events">События группы</a></li>
                        <li><a href="/projects/my">Индивидуальный проект</a></li>
                        <li><a href="/about">О нас</a></li>
                    </ul>
                </nav>
            </div>

            <main className="main">

                <div className="section__content">
                    <div className="row">
                        <div className="col">
                            <h2>Совет обучающихся</h2>
                        </div>
                        <div className="col">
                            <a href="https://xn--373-qddohl3g.xn--p1ai/uch-samoupravlenie.html">
                                <button className="section__button">Вступить
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="section__content">
                    <div className="row">
                        <div className="col">
                            <h2> Совет родителей</h2>
                        </div>
                        <div className="col">
                        <a href="https://xn--373-qddohl3g.xn--p1ai/sovet-roditelei.html">
                                <button className="section__button">Вступить
                                </button>
                            </a>
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

export default Public;