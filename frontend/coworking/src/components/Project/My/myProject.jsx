import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './myProjectStyles.css'


function MyProjectPage() {
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
        getProjects();
    }, []);

    const getProjects = async () => {
        const response = await fetch('https://backend-coworking.onrender.com/api/project/my', {
            method: 'GET', headers: {
                "Authorization": `bearer ${token}`
            }
        });
        const projects = await response.json();
        setProjects(projects);
    }
    const getUser = async () => {
        try {

            const response = await fetch('https://backend-coworking.onrender.com/api/note/user', {
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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://backend-coworking.onrender.com/api/project/${id}`, {
                method: 'DELETE', headers: {
                    "Authorization": `bearer ${token}`
                },
            });

            if (response.status === 204) {
                window.location.reload()
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const getFile = async (id) => {
        try {
            const response = await fetch(`https://backend-coworking.onrender.com/api/project/${id}/files/`, {
                method: 'GET', headers: {
                    "Authorization": `bearer ${token}`
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', response.headers.get('Content-Disposition'));
            document.body.appendChild(link);
            link.click();

        } catch (error) {
            console.error(error.message);
        }
    }

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

            <h1 className="pageTitle">Мои проекты</h1>
            {projects.length === 0 ? (<p>Проектов еще нет</p>) : (<ul className="project-list">
                {projects.map(project => (<li key={project.id} className="project-item">
                    <div className="section__content">
                        <div className="row">
                            <div className="col">
                                <h2 className="project-title">{project.title}</h2>
                                <h3 className="project-title" onClick={() => getFile(project.id)}>{project.title}</h3>
                                <h5 className="project-authors">Авторы - {project.group} ({(() => {
                                    const date = new Date(project.created_at);
                                    const formattedDate = `${date.getMonth() + 1}-${date.getFullYear()}`;
                                    return formattedDate;
                                })()})</h5>
                                {project.content.split(' ').length > 7 ? (project.showFullContent ? (
                                    <span className="project-description">{project.content}</span>) : (
                                    <span className="project-description">
                  {project.content.split(' ').slice(0, 7).join(' ') + '...'}
                                        <span className="show-full" onClick={() => {
                                            project.showFullContent = true;
                                            setProjects([...projects]);
                                        }}>
                                                            {' '}
                                            [Показать полностью]
                                                            </span>
                                                            </span>)) : (
                                    <span className="project-description">{project.content}</span>)}
                                <br/>

                                <button className="LeaveGroup" style={{backgroundColor: "indianred"}}
                                        onClick={() => handleDelete(project.id)}>Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </li>))}

            </ul>)}

        </main>
    </div>);
}

export default MyProjectPage;