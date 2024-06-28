import React, {useEffect, useState} from 'react';
import './profileStyles.css'

function Profile() {
    const [user, setUser] = useState({});

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

    const handleLogout = async () => {
        try {
            localStorage.setItem("token", "");


        } catch (error) {
            console.error(error.message);
        }
    }

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

            <main className="new_main">
                <div className="ssection__content">
                    <h1>{user["full_name"]}</h1>
                    <p>Электронная почта: {user["email"]}</p>
                    <p>Роль: {user["role"]}</p>
                    <p>Группа: {user["group"]}</p>
                    <button className="Logout" onClick={handleLogout}>Выйти из аккаунта</button>
                    <button className="LeaveGroup">Выйти из группы</button>
                </div>
            </main>
            <footer className="footer">
                <p>Copyright 2024 Цифровое коворкинговое пространство Лицей 373</p>
            </footer>
        </div>
    );
}

export default Profile;