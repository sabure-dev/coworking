import React, {useState} from 'react';
import {Navigate} from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            let formBody = [];
            const credentials = {"username": email, "password": password}
            for (let property in credentials) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(credentials[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            const response = await fetch('https://clickat.onrender.com/api/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            });

            const token = await response.json();
            await localStorage.setItem('token', token['access_token']);

            if (response.status === 200) {
                return <Navigate to="/"/>;
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                />
                <br/>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                />
                <br/>
                {error && <div style={{color: 'ed'}}>{error}</div>}
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;