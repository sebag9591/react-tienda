import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AdminSidebar = () => {
  const { user, logout } = useAuthContext();

  return (
    <div
      className="d-flex flex-column p-3 text-bg-dark"
      style={{ width: "280px", minHeight: "100vh" }}
    >
      {/* TÍTULO */}
      <Link
        to="/admin"
        className="d-flex align-items-center mb-3 text-white text-decoration-none"
      >
        <i className="bi bi-gear fs-4 me-2"></i>
        <span className="fs-4">Administración</span>
      </Link>

      <hr />

      {/* MENÚ */}
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active bg-secondary" : "text-white"}`
            }
          >
            <i className="bi bi-box-seam me-2"></i>
            Productos
          </NavLink>
        </li>
      </ul>

      {/* USUARIO (CERCA DEL MENÚ) */}
      <div className="dropdown mt-3">
        <button
          className="btn btn-dark dropdown-toggle d-flex align-items-center w-100"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="/react-tienda-logo.png"
            alt="admin"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong className="text-truncate">{user}</strong>
        </button>

        <ul className="dropdown-menu dropdown-menu-dark w-100 shadow">
          <li>
            <button
              className="dropdown-item"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
