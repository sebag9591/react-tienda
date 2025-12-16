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
        if (login(user, password)) {
          
          navigate("/");
        } else {
          alert('Credenciales incorrectas');
        }
    };
    
    return (
        <div className="container mb-5 mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">

              <h1 className="text-center">Iniciar sesión</h1>

              <form onSubmit={handleSubmit}>

                {/* Usuario */}
                <div className="row mb-3 align-items-center">
                  <label htmlFor="user" className="col-sm-5 col-form-label text-end">
                    Usuario:
                  </label>
                  <div className="col-sm-4">
                    <input
                      id="user"
                      type="text"
                      className="form-control"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div className="row mb-3 align-items-center">
                  <label htmlFor="password" className="col-sm-5 col-form-label text-end">
                    Contraseña:
                  </label>
                  <div className="col-sm-4">
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Botón */}
                <div className="text-center">
                  <button type="submit" className="btn btn-dark px-4">
                    Iniciar sesión
                  </button>
                </div>

              </form>

          </div>
      </div>
    </div>



        
    );
}

export default Login;