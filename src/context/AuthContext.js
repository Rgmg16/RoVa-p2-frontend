import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        // Fetch CSRF token when the component mounts
        const fetchCsrfToken = async () => {
            const response = await axios.get('http://localhost:8000/api/csrf/');
            setCsrfToken(response.data.csrfToken);
        };
        fetchCsrfToken();
        
        // Check if user is authenticated
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:8000/api/profile/', { withCredentials: true });
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        await axios.post('http://localhost:8000/api/login/', { email, password }, {
            headers: { 'X-CSRFToken': csrfToken },
            withCredentials: true,
        });
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await axios.post('http://localhost:8000/api/logout/', {}, {
            withCredentials: true, // Include cookies in the request
            headers: { 'X-CSRFToken': csrfToken }, // Include CSRF token in headers
        });
        setIsAuthenticated(false);
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, csrfToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

