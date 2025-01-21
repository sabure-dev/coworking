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

            const response = await fetch('https://e6fe3a5b-d159-474e-a49f-6cfa07975b67.tunnel4.com/api/note/user', {
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

                <div className="section__content" style={{margin: "1.7% 20%"}}>
                    <div className="row">
                        <div className="col">
                            <h2>Совет обучающихся</h2>
                            <a href="https://лицей373.рф/struktura-US-23.pdf">
                                <button className="section__button">Структура ученического самоуправления
                                </button>
                            </a><br/>
                            <a href="https://лицей373.рф/US-aktiv-24.pdf">
                                <button className="section__button">Органы ученического самоуправления и детские
                                    общественные объединения
                                </button>
                            </a><br/>
                            <a href="https://лицей373.рф/pol-o-sovete-US.pdf">
                                <button className="section__button">Положение о Совете обучающихся
                                </button>
                            </a><br/>
                            <a href="https://лицей373.рф/polojenie-o-sovete-starost.pdf">
                                <button className="section__button">Положение о Совете старост
                                </button>
                            </a><br/>
                            <a href="https://лицей373.рф/polojenie-o-sovete-fizorgov.pdf">
                                <button className="section__button">Положение о Совете физоргов
                                </button>
                            </a><br/>
                            <a href="https://лицей373.рф/polojenie-o-bibliotechnom-sovete.pdf">
                                <button className="section__button">Положение о Библиотечном Совете
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="section__content" style={{margin: "1.7% 20%"}}>
                    <div className="row">
                        <div className="col">
                            <h2>Совет родителей</h2>
                            <h3>Состав Президиума Совета родителей</h3>
                            <ul style={{listStyle: "none"}}>
                                <li>Председатель - Борисенко Ирина Валерьевна</li>
                                <li>Заместитель председателя по старшей школе - Егорова Екатерина Сергеевна</li>
                                <li>Заместитель председателя по начальной школе - Медведовская Мария Геннадьевна</li>
                                <li>Заместитель председателя по детскому саду - Малышева Мария Евгеньевна</li>
                            </ul>
                        </div>
                        <div className="col">
                            <a href="https://xn--373-qddohl3g.xn--p1ai/polojenie-o-sovete-roditelei-24.pdf">
                                <button className="section__button">Перейти
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