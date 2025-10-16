import React from 'react';   
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
 
const Header = () => {
    
    

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
                    <a className="btn " href="#carrito" role="button"><i className="bi bi-cart"></i> </a>
                </div> 
            </header>
        </div>
    );
}
 
export default Header;   