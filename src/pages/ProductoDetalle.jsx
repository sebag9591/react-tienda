import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';


const ProductoDetalle = () => {
    const {id} = useParams();
    const [producto, setProducto] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const apiURL = 'https://68d5d328e29051d1c0afa9ab.mockapi.io/producto';
     
    useEffect(() => {
        fetch(`${apiURL}/${id}`)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            setProducto(datos);
            setCargando(false);
        })
        .catch((error) => {
            setError('Error al cargar el producto')
            setCargando(false);
            console.error('Error:', error)
        });
        }, [id]);
    

    return(
        <>
        <div className="container">
                <div className="row">
                    

                    {/* Mensajes de carga o error */}
                    {cargando && <p>Cargando producto...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    {/* Mostrar productos solo si no hay carga ni error */}
                    {!cargando && !error && (
                        <>
                            {producto ? (
                                <>
                                <div className="col-12 col-md-6">
                                    <div className="border rounded p-3 text-center bg-light">
                                        <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        className="img-fluid"
                                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <h3 className="mb-3">{producto.nombre}</h3>
                                    <p className="text-muted">{producto.categoria}</p>
                                    <h4 className="mb-4 fw-bold">${producto.precio}</h4>
                                    <p>{producto.descripcion}</p>
                                </div>
                                </>
                            ) : (
                                <p>No hay productos disponibles.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        
        </>
    );
}

export default ProductoDetalle;