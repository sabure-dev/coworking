import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './newsStyles.css'


function NewsPage() {
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
        getNews();
    }, []);

    const getNews = async () => {
        const response = await fetch('https://coworking-app.onrender.com/api/news', {
            method: 'GET', headers: {
                'Content-Type': 'application/x-www-form-urlencoded', "Authorization": `bearer ${token}`
            },
        });
        const news = await response.json();
        setProjects(news);
    }
    const getUser = async () => {
        try {

            const response = await fetch('https://coworking-app.onrender.com/api/note/user', {
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
            const response = await fetch(`https://coworking-app.onrender.com/api/news/${id}`, {
                method: 'DELETE', headers: {
                    "Authorization": `bearer ${token}`
                },
            });

        } catch (error) {
            console.error(error.message);
        }
    }

    const isAdmin = user.role === 'admin';

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

            <h1 className="pageTitle">Новости <br/>{isAdmin && (
                <button className="Logout" style={{backgroundColor: "yellowgreen"}}
                        onClick={() => navigate('/news/create')}>
                    Добавить новость
                </button>
            )}</h1>

            {projects.length === 0 ? (<p>Новостей еще нет</p>) : (<ul className="project-list">
                {projects.map(project => (<li key={project.id} className="project-item">
                    <div className="section__content">
                        <div className="row">
                            <div className="col">
                                <img className="news-image" src={`https://coworking-app.onrender.com/api/media/${project.image}`} alt={project.title}/>
                                <h2 className="project-title">{project.title}</h2>

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
                                {isAdmin && (
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

export default NewsPage;