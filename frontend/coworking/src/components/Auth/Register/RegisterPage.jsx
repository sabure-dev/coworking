import React, {useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import './registerStyles.css'

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [hashedPassword, setHashedPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://proven-shortly-python.ngrok-free.app/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "full_name": fullName,
                    "email": email,
                    "role": role,
                    "hashed_password": hashedPassword
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/auth/login');
                }, 3000);
            } else {
                const data = await response.json();
                setError(data.detail || 'Произошла ошибка при регистрации');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                {isSuccess ? (
                    <div className="success-message" style={{textAlign: 'center', padding: '20px'}}>
                        <h2 style={{color: '#4CAF50', marginBottom: '15px'}}>Регистрация успешна!</h2>
                        <p style={{fontSize: '16px', color: '#666'}}>
                            Письмо с подтверждением email отправлено на вашу почту.
                            <br/>
                            Сейчас вы будете перенаправлены на страницу входа.
                        </p>
                    </div>
                ) : (
                    <>
                        <h1 className="register-title">Создание аккаунта</h1>
                        <form onSubmit={handleRegister}>
                            <div className="register-input-group">
                                <label>Введите email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Введите email"
                                    className="register-input"
                                />
                            </div>
                            <div className="register-input-group">
                                <label>Придумайте пароль:</label>
                                <input
                                    type="password"
                                    value={hashedPassword}
                                    onChange={(event) => setHashedPassword(event.target.value)}
                                    placeholder="Придумайте пароль"
                                    className="register-input"
                                />
                            </div>
                            <div className="register-input-group">
                                <label>Введите имя и фамилию:</label>
                                <input
                                    value={fullName}
                                    onChange={(event) => setFullName(event.target.value)}
                                    placeholder="Введите имя и фамилию"
                                    className="register-input"
                                />
                            </div>
                            <div className="register-input-group">
                                <label>Выберите роль:</label>
                                <select value={role} onChange={(event) => setRole(event.target.value)}
                                        className="register-input">
                                    <option value="student">Ученик</option>
                                    <option value="teacher">Учитель</option>
                                </select>
                            </div>
                            {error && <div className="register-error">{error}</div>}
                            <button type="submit" className="register-button">Зарегистрироваться</button>
                            <div className="redirectLogin">
                                <a onClick={() => navigate('/auth/login')}>Уже есть аккаунт?</a>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default RegisterPage;