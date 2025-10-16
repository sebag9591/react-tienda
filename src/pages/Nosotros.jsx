import React, { useEffect, useState } from 'react';

// Le paso como parámetro la función que permite manejar estado del carrito
const Nosotros = () => {
    
    return (
        <>
            <div className="container mb-5">
                <div className="text-center">
                    <h1>Nosotros</h1> 
                    <p>¡Bienvenido a <strong>react-tienda</strong>!</p>

                    <p>Esta es una tienda online ficticia creada con fines prácticos para aprender y practicar desarrollo web con <strong>React</strong>.</p>
                    <p>Por el momento, <strong>no vendemos productos reales</strong> —los datos provienen de la <em>Fake Store API</em>—, pero la idea es simular cómo funciona una tienda online: podés ver los productos, agregarlos o eliminarlos del carrito, y experimentar la dinámica de un e-commerce moderno.</p>

                    <p>El proyecto está hecho con <strong>React</strong>, <strong>Vite</strong> y <strong>Bootstrap</strong>.</p>                   
                </div>
            </div>
        </>
    );
};

export default Nosotros;
