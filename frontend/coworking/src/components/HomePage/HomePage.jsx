import React from 'react';
import {Link} from 'react-router-dom';

function HomePage() {
    return (
        <div className="home-page">
            <header>
                <h1>Коворкинг - ваше пространство для работы и общения</h1>
            </header>
            <main>
                <section className="welcome">
                    <h2>Добро пожаловать в наш коворкинг!</h2>
                    <p>Мы создали это пространство для тех, кто ищет комфортную и продуктивную среду для работы и
                        общения.</p>
                </section>
                <section className="auth">
                    <h2>Войти или зарегистрироваться</h2>
                    <div className="auth-buttons">
                        <Link to="/login" className="btn btn-primary">Войти</Link>
                        <Link to="/register" className="btn btn-secondary">Зарегистрироваться</Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;