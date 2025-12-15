import React, { useContext } from 'react';   
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';

const Header = () => {
    const { carrito } = useContext(CarritoContext);
    const {user, logout} = useAuthContext();
    const estaLogeado = !!user;
    const contadorEnCarrito = carrito.length;
    

    return (
        <header className="border-bottom">
      <nav className="navbar navbar-expand-lg">
        <div className="container">

          {/* Menú hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* LOGO */}
          <Link to="/" className="navbar-brand mx-auto mx-lg-0">
            <span className='fs-4'>react-tienda</span>
          </Link>

          {/* DERECHA - LOGIN + CARRITO */}
          <div className="d-flex align-items-center gap-3 order-lg-3">

            {estaLogeado ? (
              <button onClick={logout} className="btn btn-link p-0 text-dark">
                Cerrar sesión
              </button>
            ) : (
              <Link to="/login" className="btn btn-link p-0 text-dark">
                Iniciar sesión
              </Link>
            )}

            <Link to="/carrito" className="btn position-relative p-0">
              <i className="bi bi-cart fs-5"></i>
              {contadorEnCarrito > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {contadorEnCarrito}
                </span>
              )}
            </Link>
          </div>

          {/* MENÚ */}
          <Navbar />

        </div>
      </nav>
    </header>
    );
}
 
export default Header;   