import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';   
import { useProductosContext } from "../context/ProductosContext";
import { Helmet } from "react-helmet-async";


// 
const Productos = () => {
    // uso de los contextos
    const { productos, cargando, error } = useProductosContext();
    
    // Usar el contexto de carrito
    const {agregarProductoAlCarrito} = useContext(CarritoContext)

    const [agregados, setAgregados] = useState({});

    const handleAgregarAlCarrito = (producto) => {
        agregarProductoAlCarrito(producto);

        setAgregados((prev) => ({
            ...prev,
            [producto.id]: true,
        }));

        setTimeout(() => {
            setAgregados((prev) => ({
            ...prev,
            [producto.id]: false,
            }));
        }, 2000);
    };

    // paginación
    const productosPorPagina = 3; 
    const [paginaActual, setPaginaActual] = useState(1);

    //if (cargando) return "Cargando productos...";
    //if (error) return error;

    /// calculo del índice de los productos a mostrar
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

    // cambio de página
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    return (
        <>
            
            <div className="container mb-5 mt-5">

                {/* Título */}
                <div className="text-center mb-4">
                <h1>Productos</h1>
                </div>

                {/* Mensajes de carga o error */}
                {cargando && <p className="text-center">Cargando productos...</p>}
                {error && <p className="text-danger text-center">{error}</p>}

                {!cargando && !error && (
                <>
                    {productos.length > 0 ? (
                    <>
                        {/* Grilla de productos */}
                        <div className="row g-4">
                        {productosActuales.map((producto) => (
                            <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
                            <div className="card h-100 shadow-sm">

                                <img
                                src={
                                    producto.imagen &&
                                    (producto.imagen.startsWith("http://") ||
                                    producto.imagen.startsWith("https://"))
                                    ? producto.imagen
                                    : "/react-tienda-logo.png"
                                }
                                alt={producto.nombre}
                                className="card-img-top img-fluid"
                                style={{
                                    objectFit: "contain",
                                    height: "220px",
                                    backgroundColor: "#f8f9fa",
                                }}
                                />

                                <div className="card-body d-flex flex-column">
                                <h6 className="card-title text-center">
                                    <Link
                                    to={`/producto/${producto.id}`}
                                    className="text-decoration-none text-dark"
                                    >
                                    {producto.nombre}
                                    </Link>
                                </h6>

                                <p className="fw-semibold text-center mb-3">
                                    ${producto.precio}
                                </p>

                                <button
                                onClick={() => handleAgregarAlCarrito(producto)}
                                className={`btn mt-auto w-100 ${
                                    agregados[producto.id] ? "btn-success" : "btn-dark"
                                }`}
                                >
                                {agregados[producto.id] ? (
                                    <span className="d-flex align-items-center justify-content-center gap-2">
                                    <i className="bi bi-check-circle"></i>
                                    ¡Agregado al carrito!
                                    </span>
                                ) : (
                                    <>
                                    <i className="bi bi-cart-plus me-2"></i>
                                    Agregar al carrito
                                    </>
                                )}
                                </button>
                                </div>

                            </div>
                            </div>
                        ))}
                        </div>

                        {/* PAGINACIÓN */}
                        <div className="d-flex justify-content-center gap-2 mt-5 flex-wrap pb-5">
                        {Array.from({ length: totalPaginas }, (_, index) => (
                            <button
                            key={index + 1}
                            className={
                                paginaActual === index + 1
                                ? "btn btn-dark"
                                : "btn btn-outline-dark"
                            }
                            onClick={() => cambiarPagina(index + 1)}
                            >
                            {index + 1}
                            </button>
                        ))}


                        </div>
                    </>
                    ) : (
                    <p className="text-center">No hay productos disponibles.</p>
                    )}
                </>
                )}
            </div>
        </>
        );
};

export default Productos;
