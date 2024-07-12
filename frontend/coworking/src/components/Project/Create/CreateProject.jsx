import React, {useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";

function CreateProject() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch('http://localhost:8000/api/project/', {
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

            if (response.status === 200) {
                navigate('/projects/my');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="create-news-card">
                <h1 className="register-title">Создание проекта</h1>
                <form onSubmit={handleCreate}>
                    <div className="register-input-group">
                        <label>Введите название работы</label>
                        <input
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Введите название работы"
                            className="register-input"
                        />
                    </div>
                    <div className="register-input-group">
                        <label>Основное содержание работы:</label>
                        <textarea
                            className="news-input"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            rows={10}
                            cols={50}
                            placeholder="Основное содержание работы"
                        />
                    </div>
                    {error && <div className="register-error">{error}</div>}
                    <button type="submit" onClick={handleCreate} className="register-button">Опубликовать
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProject;