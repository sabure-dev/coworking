import React from 'react';
import {useNavigate} from "react-router-dom";
import './homeStyles.css'

function HomePage() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/main', {replace: true});
    }

    return (
        <div className="container">
            <header>
                <h1>Цифровое коворкинговое пространство</h1>
            </header>
            <section className="hero">
                <h1>Работайте где угодно, с кем угодно</h1>
                <div className='roww'>
                    <p>Присоединяйтесь к нашему сообществу и делитесь своими проектами со всем миром!</p>
                    <button className='enter' onClick={handleClick}>Сделать шаг в счастливое будущее</button>
                </div>
            </section>
            <section className="features">
                <div className="feature">
                    <h2>Отзывчивый интерфейс</h2>
                    <p>Большое количество инструментов для удобной работы!</p>
                </div>
                <div className="feature">
                    <h2>Работайте в группах</h2>
                    <p>Присоединяйтесь к группам либо создавайте свои, чтобы вместе заниматься любимым делом!</p>
                </div>
                <div className="feature">
                    <h2>Планируйте мероприятия</h2>
                    <p>Добавляйте заметки для всей группы и планируйте свою деятельность!</p>
                </div>
            </section>
            <footer className="footer">
                <p>Copyright 2024 Цифровое коворкинговое пространство Лицей 373</p>
            </footer>
        </div>
    );
}

export default HomePage;