import React, {useEffect, useState} from 'react';
import './aboutStyles.css'


function AboutPage() {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch('https://proven-shortly-python.ngrok-free.app/api/note/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": `bearer ${token}`,
                    'ngrok-skip-browser-warning': '123'
                },
            });

            const user_res = await response.json();
            setUser(user_res);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="ab-container">
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

            <main className="ab-main">
                <div className="ab-section__content">
                    <div className="ab-row">
                        <h1>Информационная страничка</h1>
                        <div className="ab-col">
                            <font size="5">
                                <p>Уважаемые посетители сайта, Вы можете ознакомиться с полезными ссылками:</p>
                                <br/>

                                <a href="https://view.genially.com/67fa8b6090b99c4c1ef32583/interactive-content-komnata?clckid=7cb3ab16"><button className='ab-section__button'>Комната отдыха</button></a><br />
                                <a className="links"
                                   href="https://view.genial.ly/62e40211b152ab0011a1ed4c/interactive-content-tehnologii-cifrovoj-transformacii-v-obrazovanii">Технические
                                    составляющие проекта и контент проекта (на основе идей педагогического
                                    дизайна)</a><br/>

                                <a className="links"
                                   href="https://view.genial.ly/62e56687d596c900182809fc/guide-cifrovaya-transformaciya">Рабочая
                                    модель цифрового коворкингового пространства для совместной деятельности субъектов
                                    образования</a><br/>

                                <a className="links" href="https://лицей373.рф/prezentacia-23.pdf">Презентация
                                    для
                                    интерактивной коллективной экспозиции «Инновации в образовании: от замысла до
                                    результата»</a><br/>

                                <a className="links"
                                   href="https://xn--373-qddohl3g.xn--p1ai/polojenie-o-kovorkinge-ecp.pdf">Положение о
                                    работе в цифровом коворкинговом пространстве</a><br/>

                                <a className="links" href="https://clck.ru/3A9eoN">Информационная безопасность
                                    педагога</a><br/>
                            </font>

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

export default AboutPage;