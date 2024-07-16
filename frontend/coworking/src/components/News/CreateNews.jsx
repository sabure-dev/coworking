import React, {useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import './createNewsStyles.css'

function CreateNews() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch('https://coworking-app.onrender.com/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                body: JSON.stringify({
                    "title": title,
                    "content": content
                }),
            });

            if (response.status === 201) {
                navigate('/news');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="create-news-card">
                <h1 className="register-title">Создание новости</h1>
                <form onSubmit={handleCreate}>
                    <div className="register-input-group">
                        <label>Введите заголовок новости</label>
                        <input
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Введите заголовок новости"
                            className="register-input"
                        />
                    </div>
                    <div className="register-input-group">
                        <label>Основное содержание новости:</label>
                        <textarea
                            className="news-input"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            rows={10}
                            cols={50}
                            placeholder="Основное содержание новости"
                        />
                    </div>
                    {error && <div className="register-error">{error}</div>}
                    <button type="submit" onClick={handleCreate} className="register-button">Создать
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateNews;