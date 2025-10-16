import React, { useEffect, useState } from 'react';   
import Productos from '../components/Productos';
import Carrito from '../components/Carrito';
 
const Inicio = () => {   

    // Controlo estado/contenido del carrito - vacío para comenzar
    const [carrito, setCarrito] = useState([]);

    // Función para agregar producto al carrito
    // Se define acá para poder manejar el estado del carrito
    const agregarProductoAlCarrito = (producto) => {
        setCarrito([... carrito, producto]);
    }

    // Función para eliminar producto del carrito
    // Manejado a través del indice del producto a eliminar, donde filter utiliza la función
    // de filtrar mientras los indices de los productos sean diferentes al que debe eliminarse
    // También se define acá para manejar estado del carrito
    const eliminarProductoDelCarrito = (indiceProductoAEliminar) => {
        setCarrito(carrito.filter((_, indice) => indice !== indiceProductoAEliminar));
    }


    return (   
        <>
        <Productos agregarProducto={agregarProductoAlCarrito} />
        <hr />
        <Carrito productosEnCarrito={carrito} productosEliminados={eliminarProductoDelCarrito} />
        </>
    );   
}   

export default Inicio