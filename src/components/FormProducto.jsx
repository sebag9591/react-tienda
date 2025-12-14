import React, { useState } from 'react'; 

const FormProducto = ({onAgregar}) => {

    const [errores, setErrores] = useState({});

    // Estado inicial - objeto producto vacío
    const [producto, setProducto] = useState({ 
        nombre: '', 
        precio: '', 
        descripcion: '', 
        imagen: '', 
    }); 
 

    // maneja cambio de los campos y los setea en el objeto
    const handleChange = (e) => { 
        const { name, value } = e.target; 
        setProducto({ ...producto, [name]: value }); 
    }; 

    const validarForm = () => { 
        const nuevosErrores = {}; 
        
        if (!producto.nombre.trim()) { 
            nuevosErrores.nombre = 'El nombre es obligatorio.'; 
        } 
        if (!producto.precio || producto.precio <= 0) { 
            nuevosErrores.precio = 'El precio debe ser mayor a 0.'; 
        } 
        if (!producto.descripcion.trim() || producto.descripcion.length < 10) 
        { 
            nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres.'; 
        } 
        
        setErrores(nuevosErrores); 
        return Object.keys(nuevosErrores).length === 0; 
    }; 
 
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        if (!validarForm) 
            return;
        
        const productoAEnviar = {
            ...producto, 
            precio: parseFloat(producto.precio)
        }
                
        onAgregar(productoAEnviar); // Llamada a la función para agregar el   producto 

        // Limpieza del form
        setProducto({ nombre: '', precio: '', descripcion: '' }); 
        setErrores({});
        
    }; 
 
    return ( 

        <>
        <div className='container mb-5'>
            <div className='row'>
                <div className='col'>
                    <h2 className='mb-4'>Agregar Producto</h2> 
                    <form onSubmit={handleSubmit}> 
                        <div className='row mb-3 g-3'> 
                            <div className='col-auto'>
                                <label className='col-sm-5 col-form-label' htmlFor='nombre'>
                                    Nombre:
                                </label>
                            </div>
                            <div className='col-auto'>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    value={producto.nombre} 
                                    className='form-control'
                                    onChange={handleChange} 
                                    required 
                                /> 
                            </div>
                            <div className='col-auto'>
                                {errores.nombre && <p style={{ color: 'red' }} className='form-text'>{errores.nombre}</p>}                             
                            </div>
                        </div> 
                        <div className='row mb-3 g-3'> 
                            <div className='col-auto'>
                                <label className='col-sm-5 col-form-label' htmlFor='precio'>
                                    Precio:
                                </label>
                            </div> 
                            <div className='col-auto'>
                                <input 
                                    type="number" 
                                    name="precio" 
                                    className='form-control'
                                    value={producto.precio} 
                                    onChange={handleChange}  
                                    required 
                                    min="0"
                                    step="any" 
                                /> 
                            </div>
                            <div className='col-auto'>
                                {errores.precio && <p style={{ color: 'red' }} className='form-text'>{errores.precio}</p>} 
                            </div>
                        </div> 
                        <div className='row mb-3 g-3'> 
                            <div>
                                <label className='col-sm-5 col-form-label' htmlFor='descripcion'>
                                    Descripción:
                                </label> 
                            </div>
                            <div className='col-auto'>
                                <textarea 
                                name="descripcion" 
                                className='form-control'
                                rows="6"
                                cols="80"
                                value={producto.descripcion} 
                                onChange={handleChange} 
                                required 
                                /> 
                            </div>
                            <div className='col-auto'>
                                {errores.descripcion && <p style={{ color: 'red' }} className='form-text'>{errores.descripcion}</p>} 
                            </div>
                        </div> 
                        <div>
                            <button type="submit" className="btn btn-primary px-4">Agregar Producto</button> 
                        </div>
                    </form> 
                </div>
            </div>
        </div>
        </>
  ); 
}

export default FormProducto;