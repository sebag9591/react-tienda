import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

// creamos el contexto de Autenticación
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => { 
    // estado que maneja al usuario
    const [user, setUser] = useState(null); 
  
    const login = (username) => { 
        // Simulando la creación de un token (en una app real, esto sería generado por un servidor) 
        const token = `fake-token-${username}`; 
        localStorage.setItem('authToken', token); 
        setUser(username); 
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