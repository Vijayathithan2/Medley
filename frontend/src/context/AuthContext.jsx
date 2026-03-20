import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false);
    }, [user]);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
        const { token, role, userId } = response.data;
        const userData = { token, role, userId };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return response.data;
    };

    const register = async (userData) => {
        const response = await axios.post('http://localhost:8080/api/auth/register', userData);
        const { token, role, userId } = response.data;
        const newUserData = { token, role, userId };
        localStorage.setItem('user', JSON.stringify(newUserData));
        setUser(newUserData);
        return response.data;
    };

    const demoLogin = () => {
        const mockToken = 'demo-token';
        const demoUser = { token: mockToken, role: 'USER', firstName: 'Demo', lastName: 'Patient' };
        localStorage.setItem('user', JSON.stringify(demoUser));
        setUser(demoUser);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, demoLogin, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
