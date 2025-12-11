import { useState, createContext } from "react";

// Crear el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export function CarritoProvider( { children }) {
    // Controlo estado/contenido del carrito - vacío para comenzar
    const [carrito, setCarrito] = useState([]); 
 
    // Función para agregar producto al carrito
    const agregarProductoAlCarrito = (producto) => { 
        setCarrito([...carrito, producto]); 
    }; 

    // Función para eliminar producto del carrito
    // Manejado a través del indice del producto a eliminar, donde filter utiliza la función
    // de filtrar mientras los indices de los productos sean diferentes al que debe eliminarse
    const eliminarProductoDelCarrito = (indiceProductoAEliminar) => {
        setCarrito(carrito.filter((_, indice) => indice !== indiceProductoAEliminar));
    }
 
    const vaciarCarrito = () => { 
        setCarrito([]); 
    }; 


 
    return ( 
        <CarritoContext.Provider value={{ carrito, agregarProductoAlCarrito, vaciarCarrito, eliminarProductoDelCarrito }}> 
            {children} 
        </CarritoContext.Provider> 
    ); 
}