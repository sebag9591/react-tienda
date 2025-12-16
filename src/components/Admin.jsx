import FormProducto from "./FormProducto";
import AdminSidebar from "./AdminSidebar";
import AdminProductos from "./AdminProductos";
import { Helmet } from "react-helmet-async";

const Admin = () => {
  
  return (
    <>
    <Helmet>
      <title>Panel Admin | Gestión de Productos</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className='container-fluid'>
      <div className='row'>
        
        {/* SIDEBAR DESKTOP */}
        <div className="col-md-3 col-lg-2 d-none d-md-block p-0">
          <AdminSidebar />
        </div>

        {/* SIDEBAR MOBILE (OFFCANVAS) */}
        <div
          className="offcanvas offcanvas-start text-bg-dark"
          tabIndex="-1"
          id="adminSidebarOffcanvas"
          aria-labelledby="adminSidebarOffcanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 id="adminSidebarOffcanvasLabel">Administración</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <AdminSidebar />
          </div>
        </div>
        
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <h1 className="mt-3">Gestión de Productos</h1>
          <AdminProductos />
        </main>
      </div>
      
    </div>
    
    </>
  );
};


export default Admin;