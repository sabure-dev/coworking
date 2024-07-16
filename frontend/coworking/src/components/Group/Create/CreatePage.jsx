import React, {useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import './createStyles.css'

function CreatePage() {
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch('https://coworking-app.onrender.com/api/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                body: JSON.stringify({
                    "title": title,
                    "password": password
                }),
            });

            if (response.status === 201) {
                navigate('/profile');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">Создание группы</h1>
                <form onSubmit={handleCreate}>
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
                        <label>Придумайте пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Придумайте пароль"
                            className="register-input"
                        />
                    </div>
                    {error && <div className="register-error">{error}</div>}
                    <button type="submit" onClick={handleCreate} className="register-button">Создать
                    </button>
                    <div className="redirectLogin"><a onClick={() => {
                        navigate('/group/enter');

                    }}>Вступить в уже существующую группу
                    </a></div>
                </form>
            </div>
        </div>
    );
}

export default CreatePage;