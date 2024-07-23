import React, {useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import './createNewsStyles.css'

function CreateNews() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append('note', JSON.stringify({title, content}));
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await fetch('https://backend-coworking.onrender.com/api/news', {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${token}`
                },
                body: formData,
            });

            if (response.status === 201) {
                navigate('/news');
            } else {
                setError('Failed to create news');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
                    <div className="register-input-group">
                        <input className="register-input" name="files" type="file" onChange={handleFileChange}/>
                    </div>
                    {error && <div className="register-error">{error}</div>}
                    <button type="submit" className="register-button">Создать</button>
                </form>
            </div>
        </div>
    );
}

export default CreateNews;