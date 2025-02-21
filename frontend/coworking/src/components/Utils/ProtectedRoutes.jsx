import React, {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";

function checkIfToken() {
    const token = localStorage.getItem('token');
    return fetch('https://proven-shortly-python.ngrok-free.app/api/note/check/', {
        method: 'GET', headers: {
            "Authorization": `Bearer ${token}`,
            'ngrok-skip-browser-warning': '123'
        },
    }).then(response => {
        return response.json().then(data => ({
            status: response.status,
            data
        }));
    });
}

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        checkIfToken().then(response => {
            if (response.status === 200) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

    if (isAuthenticated === null) {
        return (
            <>
                <div className="header">
                    <h1 className="header__title">ЛИЦЕЙ 373</h1>
                    <nav className="header__nav">
                        <ul>
                            <li><a href="/profile">Профиль</a></li>
                            <li><a href="/main">Главная</a></li>
                            <li><a href="/services">Сервисы</a></li>
                            <li><a href="/project">Индивидуальный проект</a></li>
                            <li><a href="/about">О нас</a></li>
                        </ul>
                    </nav>
                </div>
                <main className="main">

                    <h1 className="login-title" style={{color: "white"}}>Загрузка...</h1>

                </main>
            </>
        )
            ;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/register"/>;
    }

    return <Outlet/>;
}

export default ProtectedRoutes;