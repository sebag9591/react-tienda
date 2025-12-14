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
                className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow"
                data-bs-theme="dark"
            >
                <Link to={'/admin'} className='navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white'>
                    <span className='fs-4'>react-tienda</span>
                </Link> 
            </header> 
            
        </div>
        
        </>
    );
}
 
export default AdminHeader;   