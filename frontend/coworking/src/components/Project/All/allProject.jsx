import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './allProjectStyles.css'


function AllProject() {
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
        getProjects();
    }, []);

    const getProjects = async () => {
        const response = await fetch('http://192.168.51.231:8000/api/project');
        const projects = await response.json();
        setProjects(projects);
    }
    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch('http://192.168.51.231:8000/api/note/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": `bearer ${token}`
                },
            });

            const user_res = await response.json();
            setUser(user_res);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="header__title">ЛИЦЕЙ 373</h1>
                <nav className="header__nav">
                    <ul>
                        <li><a href="/profile">{user["full_name"]}</a></li>
                        <li><a href="/main">Главная</a></li>
                        <li><a href="/services">Сервисы</a></li>
                        <li><a href="/project">Индивидуальный проект</a></li>
                        <li><a href="/about">О нас</a></li>
                    </ul>
                </nav>
            </div>

            <main className="projectMain">

                <h1 className="pageTitle">Проекты</h1>
                {projects.length === 0 ? (
                    <p>Проектов еще нет</p>
                ) : (
                    <ul>
                        {projects.map(project => (
                            <li key={project.id}>
                                <div className="section__content">
                                    <div className="row">
                                        <div className="col">
                                            <h2 className="projectTitle">{project.title}</h2>
                                            <h5>Авторы - {project.group} ({(() => {
                                                const date = new Date(project.created_at);
                                                const formattedDate = `${date.getMonth() + 1}-${date.getFullYear()}`;
                                                return formattedDate;
                                            })()})</h5>
                                            {project.showFullContent? (
                                                <span>{project.content}</span>
                                            ) : (
                                                <span>
                                                    {project.content.split(' ').slice(0, 7).join(' ') + '...'}
                                                    <span onClick={() => {
                                                        project.showFullContent = true;
                                                        setProjects([...projects]);
                                                    }}>
                                                        {' '}
                                                        [Показать полностью]
                                                    </span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}

                    </ul>
                )}

            </main>
        </div>
    );
}

export default AllProject;