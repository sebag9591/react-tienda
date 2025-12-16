import FormProducto from "./FormProducto";
import AdminSidebar from "./AdminSidebar";
import AdminProductos from "./AdminProductos";

const Admin = () => {
  const API = 'https://68d5d328e29051d1c0afa9ab.mockapi.io/producto';

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto)
      });

      if (!respuesta.ok) 
        throw new Error("Error al agregar el producto.");

      const dato = await respuesta.json();
      console.log("Producto agregado: ", dato);
      alert("El producto ha sido agregado correctamente");

    } catch (error) {
        console.error(error.message);
        alert("Hubo un problema al agregar el producto.");
    }
  };

  return (
    <>
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