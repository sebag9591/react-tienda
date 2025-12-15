import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

const FAKE_USERS = [
  { 
    id: 1, 
    username: 'admin', 
    password: '1234', 
    rol: 'admin',
    name: 'Admin'
  },
  { 
    id: 2, 
    username: 'gizmo', 
    password: '1234', 
    rol: 'user',
    name: 'Giz'
  }
];

// creamos el contexto de Autenticación
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => { 
    // estado que maneja al usuario
    const [user, setUser] = useState(null); 

    // si el usuario ya está logueado cuando la página se recarga
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setUser(storedUser);
        }
    }, []);
  
    const login = (username, password) => { 

        const userLogin = FAKE_USERS.find(
            u => u.username === username && u.password === password
        );

        // Simulando la creación de un token (en una app real, esto sería generado por un servidor) 
        if (userLogin) {
            const token = `fake-token-${username}`;
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', username)
            setUser(username);
            return true;
        }
        return false;
         
    }; 

    const logout = () => { 
        localStorage.removeItem('authToken'); 
        setUser(null); 
    }; 

    return ( 
            <AuthContext.Provider value={{ user, login, logout }}> 
                {children} 
            </AuthContext.Provider> 
    ); 
} 

// para poder utilizar el context y que llamen a esta función
export const useAuthContext = () => useContext(AuthContext); 