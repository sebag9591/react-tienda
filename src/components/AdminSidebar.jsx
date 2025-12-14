import React, { useContext } from 'react';   
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';

const AdminSidebar = () => {

    const { carrito } = useContext(CarritoContext);
        const {user, logout} = useAuthContext();
        const estaLogeado = !!user;
        const contadorEnCarrito = carrito.length;

  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">

      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        {/* Body */}
        <div className=" d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">

          {/* Menu principal */}
          <Link to={'/admin'} className='btn d-flex align-items-center gap-2'>
            <i className="bi bi-cart  position-relative">
            
            </i> 
             Productos
        </Link>

          

          <hr className="my-3" />

          {/* Settings / Sign out */}
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
                { estaLogeado ? 
                    <button onClick={logout} className='btn btn-link'>Cerrar Sesion </button> 
                    :
                    <Link to="/login">
                        <button className='btn btn-link'>Iniciar sesión</button>
                    </Link>
                }
            </li>
          </ul>

        </div>
      </div>

    </div>
  );
}

export default AdminSidebar;   