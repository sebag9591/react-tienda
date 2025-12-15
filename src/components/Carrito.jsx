import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';   

const Carrito = () => {   

    const {carrito, eliminarProductoDelCarrito} = useContext(CarritoContext);

     // Calcular subtotal
    const subtotal = carrito.reduce((acc, producto) => {
        const cantidad = producto.cantidad || 1;
        return acc + (producto.precio * cantidad);
    }, 0);

    const envio = 0;
    // Total
    const total = subtotal + envio;

    const handleCantidad = (indice, operacion) => {
        const producto = carrito[indice];
        const cantidadActual = producto.cantidad || 1;
        
        if (operacion === 'incrementar') {
            actualizarCantidad(indice, cantidadActual + 1);
        } else if (operacion === 'decrementar') {
        if (cantidadActual === 1) {
            eliminarProductoDelCarrito(indice);
        } else {
            actualizarCantidad(indice, cantidadActual - 1);
        }
        }
    };

    if (carrito.length === 0) {
        return (
            <div
            className="d-flex flex-column align-items-center justify-content-center px-3"
            style={{ minHeight: '60vh' }}
            >
                <div className="text-center">

                    <svg
                    width="96"
                    height="96"
                    className="d-block mx-auto mb-4 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                    </svg>

                    <h2 className="fw-bold fs-3 text-dark mb-2">
                    Tu carrito está vacío
                    </h2>

                    <p className="text-muted mb-4">
                    ¡Agregá productos para comenzar tu compra!
                    </p>

                    <a
                    href="/"
                    className="btn btn-dark px-4 py-2 fw-semibold"
                    >
                    Ir a comprar
                    </a>

                </div>
            </div>
        );
    }

    return (   
        <div className='container mb-5 mt-5 ' style={{ paddingBottom: "30px" }}>
            <h1 id='carrito' className='text-center'>Carrito</h1>

            {carrito.length === 0 ? (
                <p>El carrito se encuentra vacío</p>
            ) : (
                <div className="row g-4">

                    {/* Columna izquierda – Lista de productos */}
                    <div className="col-12 col-lg-8">

                    {carrito.map((producto, indice) => {
                        const cantidad = producto.cantidad || 1;
                        const precioTotal = producto.precio * cantidad;

                        return (
                        <div
                            key={indice}
                            className="bg-white border rounded p-4 p-sm-5 mb-3 shadow-sm"
                        >
                            <div className="d-flex flex-column flex-sm-row gap-3">

                            {/* Imagen */}
                            <div className="flex-shrink-0">
                                <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                className="img-fluid rounded"
                                style={{
                                    width: '128px',
                                    height: '128px',
                                    objectFit: 'cover'
                                }}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-grow-1 d-flex flex-column justify-content-between">

                                <div>
                                <h3 className="h5 fw-semibold text-dark mb-1">
                                    {producto.nombre}
                                </h3>
                                <p className="text-muted small mb-3">
                                    {producto.descripcion || 'Producto de alta calidad'}
                                </p>
                                </div>

                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">

                                {/* Cantidad */}
                                <div className="d-flex align-items-center gap-2">
                                    <span className="small fw-medium text-secondary">
                                    Cantidad:
                                    </span>

                                    <div className="d-flex align-items-center border rounded">
                                    <button
                                        onClick={() => handleCantidad(indice, 'decrementar')}
                                        className="btn btn-light btn-sm fw-bold"
                                    >
                                        −
                                    </button>

                                    <span className="px-3 fw-semibold text-dark">
                                        {cantidad}
                                    </span>

                                    <button
                                        onClick={() => handleCantidad(indice, 'incrementar')}
                                        className="btn btn-light btn-sm fw-bold"
                                    >
                                        +
                                    </button>
                                    </div>
                                </div>

                                {/* Precio + eliminar */}
                                <div className="d-flex align-items-center gap-3 justify-content-end">

                                    <div className="text-end">
                                    <div className="fw-bold text-dark">
                                        ${precioTotal.toLocaleString('es-AR')}
                                    </div>
                                    {cantidad > 1 && (
                                        <div className="text-muted small">
                                        ${producto.precio.toLocaleString('es-AR')} c/u
                                        </div>
                                    )}
                                    </div>

                                    <button
                                    onClick={() => eliminarProductoDelCarrito(indice)}
                                    className="btn btn-outline-danger btn-sm"
                                    aria-label="Eliminar producto"
                                    >
                                    <i className="bi bi-trash"></i>
                                    </button>

                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        );
                    })}
                    </div>

                    {/* Columna derecha – Resumen */}
                    <div className="col-12 col-lg-4">
                    <div className="border rounded p-4 sticky-top" style={{ top: '1rem' }}>

                        <h2 className="h5 fw-bold mb-4">
                        Resumen del Pedido
                        </h2>

                        <div className="mb-4">

                        <div className="d-flex justify-content-between mb-2 text-secondary">
                            <span>Subtotal</span>
                            <span className="fw-medium">
                            ${subtotal.toLocaleString('es-AR')}
                            </span>
                        </div>

                        <div className="d-flex justify-content-between mb-3 text-secondary">
                            <span>Envío</span>
                            <span className="fw-medium">
                            {envio === 0 ? (
                                <span className="text-success">¡Gratis!</span>
                            ) : (
                                `$${envio.toLocaleString('es-AR')}`
                            )}
                            </span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <span className="fw-bold fs-5">Total</span>
                            <span className="fw-bold fs-4">
                            ${total.toLocaleString('es-AR')}
                            </span>
                        </div>

                        </div>

                        <button className="btn btn-dark w-100 py-3 fw-semibold">
                        Proceder al Pago
                        </button>

                    </div>
                    </div>

                </div>
            )}
        </div>
    );   
};

export default Carrito;
