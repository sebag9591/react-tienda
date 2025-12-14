import FormProducto from "./FormProducto";
import AdminSidebar from "./AdminSidebar";

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
        
          <AdminSidebar />
        
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1>Gestión de Productos</h1>

          </div>
            <FormProducto onAgregar={agregarProducto} />
        </main>
      </div>
      
    </div>
    
    </>
  );
};


export default Admin;