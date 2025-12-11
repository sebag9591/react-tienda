import { useState, createContext } from "react";

// Crear el contexto
export const ProductoContext = createContext();

// Proveedor del contexto
export function ProductoProvider( { children }) {
    

    
 
    return ( 
        <ProductoContext.Provider value={{ eliminarProductoDelCarrito, agregarProducto,  }}> 
            {children} 
        </ProductoContext.Provider> 
    ); 
}