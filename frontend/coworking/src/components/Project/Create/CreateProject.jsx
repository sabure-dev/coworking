import React, {useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";

function CreateProject() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null)
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append('project', JSON.stringify({title, content}));
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await fetch('https://d768-92-222-100-46.ngrok-free.app/api/project/', {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${token}`
                },
                body: formData
            });

            if (response.status === 200) {
                navigate('/projects/my');
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
                    <div className="register-input-group">
                        <input className="register-input" name="projectFiles" type="file" onChange={handleFileChange}/>
                    </div>
                    {error && <div className="register-error">{error}</div>}
                    <button type="submit" className="register-button">Опубликовать</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProject;