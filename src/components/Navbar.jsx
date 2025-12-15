import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import  SearchBar  from './SearchBar';

const Navbar = () => {
  const { user } = useAuthContext();
  const esAdmin = user === 'admin';

  return (
    <div className="collapse navbar-collapse order-lg-2 me-3" id="mainNavbar">
      <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0">

        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => 
                            "nav-link px-2 " + (isActive ? "link-body-emphasis fw-bold" : "link-body-emphasis")
                        }>
            Inicio
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/nosotros" className={({ isActive }) => 
                            "nav-link px-2 " + (isActive ? "link-body-emphasis fw-bold" : "link-body-emphasis")
                        }>
            Nosotros
          </NavLink>
        </li>

        {esAdmin && (
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </li>
        )}
      </ul>
      <SearchBar />
    </div>
  );
};

export default Navbar;