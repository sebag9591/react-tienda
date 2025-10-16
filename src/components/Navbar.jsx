import React from 'react';   
import { Link } from 'react-router-dom';
 
function Navbar() {   
    return (   
        <>
            <nav>
                <ul className='nav justify-content-center'>   
                    <li className='nav-item'>
                        <Link to={'/'} className='nav-link px-2 link-body-emphasis'>Inicio</Link>                        
                    </li>  

                    <li className='nav-item'>
                        <Link to={'/nosotros'} className='nav-link px-2 link-body-emphasis'>Nosotros</Link>                        
                    </li> 
                </ul> 
            </nav>
        </>
    );   
}   

export default Navbar