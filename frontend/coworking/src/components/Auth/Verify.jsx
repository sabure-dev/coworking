import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './authStyles.css';

function Verify() {
    const [searchParams] = useSearchParams();
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');
            if (!token) {
                setVerificationStatus('error');
                setErrorMessage('Токен не найден');
                return;
            }

            try {
                const response = await fetch(`https://proven-shortly-python.ngrok-free.app/api/auth/verify-email?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': '123'
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setVerificationStatus('success');
                } else {
                    setVerificationStatus('error');
                    setErrorMessage(data.detail || 'Произошла ошибка при верификации');
                }
            } catch (error) {
                setVerificationStatus('error');
                setErrorMessage('Произошла ошибка при подключении к серверу');
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div className="container">
            <div className="header">
                <h1 className="header__title">ЛИЦЕЙ 373</h1>
            </div>

            <div className="auth-container">
                <div className="auth-box">
                    {verificationStatus === 'verifying' && (
                        <h2>Проверка email...</h2>
                    )}
                    
                    {verificationStatus === 'success' && (
                        <>
                            <h2 className="success-message">✓ Вы успешно подтвердили свой email!</h2>
                            <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                                Теперь вы можете использовать все функции сайта
                            </p>
                            <a href="/main" className="auth-button">Перейти на главную</a>
                        </>
                    )}
                    
                    {verificationStatus === 'error' && (
                        <>
                            <h2 className="error-message">✕ Ошибка верификации</h2>
                            <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                                {errorMessage}
                            </p>
                            <a href="/main" className="auth-button">Перейти на главную</a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Verify; 