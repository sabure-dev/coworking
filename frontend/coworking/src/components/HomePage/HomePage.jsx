import React from 'react';
import {useNavigate} from "react-router-dom";
import './homeStyles.css'

function HomePage() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/main', {replace: true});
    }

    const handleDownloadGuide = async () => {
        try {
            const response = await fetch(`https://backend-coworking.onrender.com/api/project/guide/`, {
                method: 'GET',
            });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "guide.docx";
            a.click();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="container">
            <header>
                <h1>Цифровое коворкинговое пространство Лицея 373</h1>
            </header>
            <section className="hero">
                <h1>Работайте где угодно, с кем угодно</h1>
                <div className='roww'>
                    <p>Присоединяйтесь к нашему сообществу и делитесь своими проектами!</p>
                    <button className='enter' onClick={handleClick}>Сделать шаг в счастливое будущее</button>
                    <br/>
                    <button className="downloadGuide" onClick={() => {
                        navigate('/guide', {replace: true});
                    }}>Посмотреть инструкцию
                    </button>
                    <button className="downloadGuide" onClick={handleDownloadGuide}>Скачать инструкцию</button>
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