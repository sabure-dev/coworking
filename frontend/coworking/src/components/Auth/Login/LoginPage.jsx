import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./loginStyles.css"

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            let formBody = [];
            const credentials = {"username": email, "password": password}
            for (let property in credentials) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(credentials[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            const response = await fetch('https://proven-shortly-python.ngrok-free.app/api/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'ngrok-skip-browser-warning': '123'
                },
                body: formBody,
            });

            const token = await response.json();
            await localStorage.setItem('token', token['access_token']);

            if (response.status === 200) {
                navigate('/main');
            } else {
                setError("Не удалось войти")
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Вход</h1>
                <form onSubmit={handleLogin}>
                    <div className="login-input-group">
                        <label>Введите email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Введите email"
                            className="login-input"
                        />
                    </div>
                    <div className="login-input-group">
                        <label>Введите пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Введите пароль"
                            className="login-input"
                        />
                    </div>
                    {error && <div className="login-error">{error}</div>}
                    <button type="submit" onClick={handleLogin} className="login-button">Войти</button>
                    <div className="redirectRegister"><a onClick={() => {
                        navigate('/auth/register');

                    }}>Зарегистрироваться
                    </a></div>
                    <div className="redirectRegister"><a onClick={() => {
                        navigate('/auth/forgot');

                    }}>Забыли пароль?
                    </a></div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;