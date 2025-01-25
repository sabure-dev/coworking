import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";


function Events() {
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
        getNews();
    }, []);

    const getNews = async () => {
        const response = await fetch('https://proven-shortly-python.ngrok-free.app/api/note', {
            method: 'GET', headers: {
                'Content-Type': 'application/x-www-form-urlencoded', "Authorization": `bearer ${token}`
            },
        });
        const news = await response.json();
        setProjects(news);
    }
    const getUser = async () => {
        try {

            const response = await fetch('https://proven-shortly-python.ngrok-free.app/api/note/user', {
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
            const response = await fetch(`https://proven-shortly-python.ngrok-free.app/api/note/${id}`, {
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

    const isTeacher = user.role === 'teacher';

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

            <h1 className="pageTitle">События группы <br/>{isTeacher && (
                <button className="Logout" style={{backgroundColor: "#58a4d9"}}
                        onClick={() => navigate('/events/create')}>
                    Добавить событие
                </button>
            )}</h1>

            {projects.length === 0 ? (<p>Событий группы еще нет</p>) : (<ul className="project-list">
                {projects.map(project => (<li key={project.id} className="project-item">
                    <div className="section__content">
                        <div className="row">
                            <div className="col">
                                <h2 className="project-title">{project.title}</h2>
                                <h5 className="project-authors">Дата - {project.deadline
                                }</h5>
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

                                {isTeacher && (
                                    <button className="Logout" style={{backgroundColor: "indianred"}}
                                            onClick={() => handleDelete(project.id)}>
                                        Удалить новость
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </li>))}

            </ul>)}

        </main>
    </div>);
}

export default Events;