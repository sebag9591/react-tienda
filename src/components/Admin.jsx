import FormProducto from "./FormProducto";

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
    <div>
      <h1>Gestión de Productos</h1>
      <FormProducto onAgregar={agregarProducto} />
    </div>
  );
};


export default Admin;