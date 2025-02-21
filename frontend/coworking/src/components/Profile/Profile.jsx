import React, {useEffect, useState} from 'react';
import './profileStyles.css'
import {useNavigate} from "react-router-dom";

function Profile() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        try {
            localStorage.setItem("token", "");
            navigate('/auth/login')

        } catch (error) {
            console.error(error.message);
        }
    }

    const handleLeaveGroup = async () => {
        try {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch('https://proven-shortly-python.ngrok-free.app/api/group/leave', {
                    method: 'GET',
                    headers: {
                        "Authorization": `bearer ${token}`,
                        'ngrok-skip-browser-warning': '123'
                    },
                });

                navigate('/main')

            } catch (error) {
                console.error(error.message);
            }

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
                        <li><a href="/news">Новости</a></li>
                        <li><a href="/events">События группы</a></li>
                        <li><a href="/projects/my">Индивидуальный проект</a></li>
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
                    <button className="LeaveGroup" onClick={handleLeaveGroup}>Выйти из группы</button>
                </div>
            </main>
            <footer className="footer">
                <p>Copyright 2024 Цифровое коворкинговое пространство Лицей 373</p>
            </footer>
        </div>
    );
}

export default Profile;