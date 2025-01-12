import React, {useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import './enterStyles.css'

function EnterPage() {
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleEnter = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`https://proven-shortly-python.ngrok-free.app/api/group/${title}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                body: JSON.stringify(password),
            });

            if (response.status === 200) {
                navigate('/profile');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">Войти в группу</h1>
                <form onSubmit={handleEnter}>
                    <div className="register-input-group">
                        <label>Введите название группы</label>
                        <input
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Введите название группы"
                            className="register-input"
                        />
                    </div>
                    <div className="register-input-group">
                        <label>Введите пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Введите пароль"
                            className="register-input"
                        />
                    </div>
                    {error && <div className="register-error">{error}</div>}
                    <button type="submit" onClick={handleEnter} className="register-button">Войти
                    </button>
                    <div className="redirectLogin"><a onClick={() => {
                        navigate('/group/create');

                    }}>Создать новую группу
                    </a></div>
                </form>
            </div>
        </div>
    );
}

export default EnterPage;