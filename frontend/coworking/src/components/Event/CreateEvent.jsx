import React, {useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";

function CreateEvent() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch('https://d768-92-222-100-46.ngrok-free.app/api/note/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                body: JSON.stringify({
                    "title": title,
                    "content": content,
                    "deadline": deadline
                }),
            });

            if (response.status === 201) {
                navigate('/events');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="create-news-card">
                <h1 className="register-title">Создание события</h1>
                <form onSubmit={handleCreate}>
                    <div className="register-input-group">
                        <label>Введите заголовок события</label>
                        <input
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Введите заголовок события"
                            className="register-input"
                        />
                    </div>
                    <div className="register-input-group">
                        <label>Введите дату события (дедлайн)</label>
                        <input
                            value={deadline}
                            onChange={(event) => setDeadline(event.target.value)}
                            placeholder="Дата"
                            className="register-input"
                        />
                    </div>
                    <div className="register-input-group">
                        <label>Основное содержание события:</label>
                        <textarea
                            className="news-input"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            rows={10}
                            cols={50}
                            placeholder="Основное содержание события"
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

export default CreateEvent;