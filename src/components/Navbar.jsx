import React from 'react';   
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

// Utilizo NavLink en los enlaces del navbar para que sea más facil el control de navegación y saber cual está activo
 
function Navbar() {   
    const {user} = useAuthContext();

    const esAdmin = user === 'admin';

    return (   
        <>
            <nav>
                <ul className='nav justify-content-center'>   
                    <li className='nav-item'>
                        <NavLink to={'/'} className={({ isActive }) => 
                            "nav-link px-2 " + (isActive ? "link-body-emphasis fw-bold" : "link-body-emphasis")
                        }>Inicio</NavLink>                        
                    </li>  

                    <li className='nav-item'>
                        <NavLink to={'/nosotros'} className={({ isActive }) => 
                            "nav-link px-2 " + (isActive ? "link-body-emphasis fw-bold" : "link-body-emphasis")
                        }>Nosotros</NavLink>                        
                    </li> 

                    {esAdmin && 
                        <li className='nav-item'>
                        <NavLink to={'/admin'} className={({ isActive }) => 
                            "nav-link px-2 " + (isActive ? "link-body-emphasis fw-bold" : "link-body-emphasis")
                        }>Admin</NavLink>                        
                    </li> 
                    }
                    
                </ul> 
            </nav>
        </>
    );   
}   

export default Navbar