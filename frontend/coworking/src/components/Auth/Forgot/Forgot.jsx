import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function ForgotPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleForgot = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://backend-coworking.onrender.com/api/auth/password-forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(email),
            });

            if (response.status === 202) {
                setError("Письмо с инструкциями отправлено на указанный адрес");
            } else {
                setError("Не удалось найти пользователя с указанным адресом")
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Восстановление пароля</h1>
                <form onSubmit={handleForgot}>

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

                    {error && <div className="login-error">{error}</div>}
                    <button type="submit" onClick={handleForgot} className="login-button">Получить письмо на почту
                    </button>
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

export default ForgotPage;