import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function ResetPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get('token');

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://backend-coworking.onrender.com/api/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "token": resetToken,
                    "new_password": password
                }),
            });

            if (response.status === 200) {
                setError("Пароль успешно изменен");
            } else {
                setError("Ошибка при измении пароля")
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Изменение пароля</h1>
                <form onSubmit={handleReset}>
                    <div className="login-input-group">
                        <label>Введите новый пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Повторите пароль"
                            className="login-input"
                        />
                    </div>
                    {error && <div className="login-error">{error}</div>}
                    <button type="submit" onClick={handleReset} className="login-button">Сменить пароль</button>
                    <div className="redirectRegister"><a onClick={() => {
                        navigate('/auth/register');

                    }}>Зарегистрироваться
                    </a></div>
                    <div className="redirectRegister"><a onClick={() => {
                        navigate('/auth/login');

                    }}>Войти
                    </a></div>
                </form>
            </div>
        </div>
    );
}

export default ResetPage;