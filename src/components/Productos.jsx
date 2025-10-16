import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Le paso como parámetro la función que permite manejar estado del carrito
const Productos = ({ agregarProducto }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const apiURL = 'https://fakestoreapi.com/products';

    useEffect(() => {
        fetch(apiURL)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setProductos(datos);
                setCargando(false);
            })
            .catch((error) => {
                setError('Error al cargar tus productos');
                setCargando(false);
                console.error('Error:', error);
            });
    }, []);

    return (
        <>
            <div className="container mb-5">
                <div className="text-center">
                    <h1>Productos</h1>

                    {/* Mensajes de carga o error */}
                    {cargando && <p>Cargando productos...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    {/* Mostrar productos solo si no hay carga ni error */}
                    {!cargando && !error && (
                        <>
                            {productos.length > 0 ? (
                                <div className="row row-cols-1 row-cols-md-3 mb-5 g-4 text-center">
                                    {productos.map((producto) => (
                                        <div className="col" key={producto.id}>
                                            <div className="card mb-3 h-100 p-3">
                                                <div className="row g-2 h-100">
                                                    <div className="col-md-4 d-flex align-items-center">
                                                        <img
                                                            src={producto.image}
                                                            className="img-fluid rounded-start"
                                                            alt={producto.title}
                                                            style={{
                                                                objectFit: 'contain',
                                                                height: '100%',
                                                                maxHeight: '200px',
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-8 d-flex flex-column justify-content-between">
                                                        <div className="card-body">
                                                            <Link to={`/producto/${producto.id}`} className='card-text px-2 link-body-emphasis link-offset-2 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-50-hover'>{producto.title}</Link> 
                                                            <h3 className="card-text">${producto.price}</h3>
                                                            <button
                                                                className="w-100 btn btn-primary mt-auto"
                                                                onClick={() => agregarProducto(producto)}
                                                            >
                                                                <i className="bi bi-cart-plus" /> Agregar al carrito
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No hay productos disponibles.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Productos;
