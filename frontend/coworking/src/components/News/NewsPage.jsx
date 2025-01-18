import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './newsStyles.css'


function NewsPage() {
    const [user, setUser] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const response = await fetch('https://1pw05fwj-8000.euw.devtunnels.ms/api/note/user', {
                method: 'GET', headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', "Authorization": `bearer ${token}`
                },
            });

            const user_res = await response.json();
            setUser(user_res);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (<div className="container">
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

        <main className="projectMain">
            <h1 className="pageTitle">Новости школы</h1>
            <div className="school-news">
                <iframe 
                    src="https://backend-coworking.onrender.com/api/news/school"
                    style={{
                        width: '100%',
                        height: '800px',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        marginTop: '20px'
                    }}
                    title="Школьные новости"
                />
            </div>
        </main>
    </div>);
}

export default NewsPage;