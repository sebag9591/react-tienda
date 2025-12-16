import React, { useContext } from 'react';   
import Navbar from './Navbar';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';

const AdminHeader = () => {
    const { carrito } = useContext(CarritoContext);
    const {user, logout} = useAuthContext();
    const estaLogeado = !!user;
    const contadorEnCarrito = carrito.length;
    

    return (
        <>
        <div>
            <header
                className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
                data-bs-theme="dark"
            >
                {/* Botón hamburguesa SOLO en mobile */}
                <button
                    className="navbar-toggler d-md-none ms-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#adminSidebarOffcanvas"
                    aria-controls="adminSidebarOffcanvas"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to={'/'} className='navbar-brand px-3 fs-5 text-white'>
                    <span className='fs-4'>react-tienda</span>
                </Link> 
            </header> 
            
        </div>
        
        </>
    );
}
 
export default AdminHeader;   