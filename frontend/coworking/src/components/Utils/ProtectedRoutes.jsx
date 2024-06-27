import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function checkIfToken() {
    const token = localStorage.getItem('token');
    return fetch('https://coworking-i9uw.onrender.com/api/note/check', {
        method: 'GET', headers: {
            "Authorization": `Bearer ${token}`
        },
    }).then(response => {
        return response.json().then(data => ({
            status: response.status,
            data
        }));
    });
}

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        checkIfToken().then(response => {
            if (response.status === 200) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;