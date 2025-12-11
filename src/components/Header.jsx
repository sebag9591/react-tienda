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
        <div className='container '>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom "> 
            <div className="col-md-3 mb-2 mb-md-0"> 
                <Link to={'/'} className='d-inline-flex link-body-emphasis text-decoration-none'>
                    <span className='fs-4'>react-tienda</span>
                </Link> 
            </div> 
                
                {/* Menú */}
                <Navbar />


                <div className="col-md-3 text-end"> 
                    { estaLogeado ? 
                        <button onClick={logout} className='btn btn-link'>Cerrar Sesion </button> 
                        :
                        <Link to="/login">
                            <button className='btn btn-link'>Iniciar sesión</button>
                        </Link>
                    }
                     <Link to={'/#carrito'} className='btn '><i className="bi bi-cart position-relative">
                        {contadorEnCarrito > 0 && (
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {contadorEnCarrito}
                                    <span class="visually-hidden">productos en carrito</span>
                                </span>
                        )}
                        </i></Link>
                </div> 
            </header>
        </div>
    );
}
 
export default Header;   