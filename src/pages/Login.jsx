import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
    
        e.preventDefault();
        // Simulación de autenticación
        if (user === 'admin' && password === '1234') {
            login(user);
            navigate('/');
        } else {
            alert('Credenciales incorrectas');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <div>
                <label>Usuario:</label>
                <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

export default Login;