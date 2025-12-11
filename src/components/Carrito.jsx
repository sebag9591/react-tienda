import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';   

const Carrito = () => {   

    const {carrito, eliminarProductoDelCarrito} = useContext(CarritoContext);

    return (   
        <div className='container mb-5' style={{ paddingBottom: "30px" }}>
            <h1 id='carrito'>Carrito</h1>

            {carrito.length === 0 ? (
                <p>El carrito se encuentra vacío</p>
            ) : (
                carrito.map((producto, indice) => (
                    <div key={indice}>
                        <div className='card mb-3 p-3'>
                            <div className='row g-0'>
                                <div className='col-md-4 d-flex align-items-center justify-content-center'>
                                    <img
                                        src={producto.image}
                                        className="img-fluid rounded-start"
                                        alt={producto.title}
                                        style={{
                                            objectFit: 'contain',
                                            height: '100%',
                                            maxHeight: '42px',
                                        }}
                                    />
                                </div>
                                <div className='col-md-8'>
                                    <div className='row'>
                                        <div className='col-9'>
                                            {producto.title} : <span className='fw-bold'>${producto.price}</span>
                                        </div>
                                        <div className='col'>
                                            <button 
                                                onClick={() => eliminarProductoDelCarrito(indice)} 
                                                className="btn btn-danger">
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );   
};

export default Carrito;
