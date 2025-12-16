import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate} from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";
import { CarritoContext } from "../context/CarritoContext";
import { Helmet } from 'react-helmet-async';


const ProductoDetalle = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const { productos, cargando, error } = useProductosContext();
    const { agregarProductoAlCarrito } = useContext(CarritoContext);
    const [cantidad, setCantidad] = useState(1);
    const [agregado, setAgregado] = useState(false);

    //const apiURL = 'https://68d5d328e29051d1c0afa9ab.mockapi.io/producto';
     
    // Busco el producto por ID
    const producto = productos.find(p => p.id === id);
    
    const handleAgregarAlCarrito = () => {
        for (let i = 0; i < cantidad; i++) {
        agregarProductoAlCarrito(producto);
        }
        setAgregado(true);
        setTimeout(() => setAgregado(false), 2000);
    };

    const incrementarCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const decrementarCantidad = () => {
        if (cantidad > 1) {
        setCantidad(cantidad - 1);
        }
    };

    if (cargando) {
        return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Cargando producto...</p>
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar</h2>
            <p className="text-gray-600 mb-6">Se ha producido un error al cargar el producto</p>
            <button 
                onClick={() => navigate('/')}
                className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200"
            >
                Volver al inicio
            </button>
            </div>
        </div>
        );
    }

    if (!producto) {
        return (
        <div className="d-flex align-items-center justify-content-center px-3" style={{ minHeight: '60vh' }}>
            <div className="text-center">

                <i className="bi bi-emoji-dizzy fs-1 text-secondary d-block mx-auto mb-3"></i>

                <h2 className="fw-bold fs-3 text-dark mb-2">
                Producto no encontrado
                </h2>

                <p className="text-muted mb-4">
                El producto solicitado no existe
                </p>

                <button
                onClick={() => navigate('/')}
                className="btn btn-dark px-4 py-2 fw-semibold"
                >
                Volver
                </button>

            </div>
        </div>
        );
    }

    return(
        <>
        <Helmet>
          <title>{producto.nombre} | React Tienda</title>
          <meta
            name="description"
            content={`Comprá ${producto.nombre} al mejor precio. ${producto.descripcion}`}
          />
        </Helmet>
        <div className="container py-4">
  
  {/* Contenido principal */}
  <div className="row g-4 g-lg-5 mb-5">

    {/* Columna izquierda – Imagen */}
    <div className="col-12 col-lg-6 d-flex justify-content-center align-items-start">
      <div className="w-100" style={{ maxWidth: '540px' }}>
        <div
          className="bg-light rounded overflow-hidden d-flex align-items-center justify-content-center"
          style={{ aspectRatio: '1 / 1' }}
        >
          <img
            src={
                producto.imagen &&
                (producto.imagen.startsWith('http://') || producto.imagen.startsWith('https://'))
                ? producto.imagen
                : '/react-tienda-logo.png'
            }
            alt={producto.nombre}
            className="img-fluid w-100 h-100 object-fit-cover"
            style={{ transition: 'transform .3s' }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>
      </div>
    </div>

    {/* Columna derecha – Info */}
    <div className="col-12 col-lg-6 d-flex flex-column">

      <div className="mb-4">
        <h1 className="fw-bold text-dark mb-3 display-6">
          {producto.nombre}
        </h1>

        <div className="my-4">
          <p className="fw-bold display-5 text-dark mb-0">
            ${producto.precio?.toLocaleString('es-AR')}
          </p>
        </div>

        <div className="mb-4">
          <h2 className="h5 fw-semibold text-dark mb-2">
            Descripción
          </h2>
          <p className="text-muted lh-lg">
            {producto.descripcion ||
              ''}
          </p>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-auto border-top pt-4">

        <div className="d-flex flex-column flex-sm-row gap-3">

          <button
            onClick={handleAgregarAlCarrito}
            className={`btn ${
              agregado ? 'btn-success' : 'btn-dark'
            } flex-fill py-3 fw-semibold`}
          >
            {agregado ? (
              <span className="d-flex align-items-center justify-content-center gap-2">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                ¡Agregado al carrito!
              </span>
            ) : (
              'Agregar al carrito'
            )}
          </button>

          <button
            onClick={() => navigate('/carrito')}
            className="btn btn-outline-dark py-3 fw-semibold"
          >
            Ver carrito
          </button>

        </div>
      </div>
    </div>
  </div>

</div>

        
        </>
    );
}

export default ProductoDetalle;