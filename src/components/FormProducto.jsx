import React, { useState, useContext } from 'react'; 
import { useProductosContext } from '../context/ProductosContext'; 
//import X from "../assets/X"

const FormProducto = ({ productoInicial = {}, modo = "agregar", onCerrar }) => {

    const { agregarProducto, editarProducto } = useProductosContext();
    const [producto, setProducto] = useState(productoInicial);

    const [errores, setErrores] = useState({});

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
 
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        if (!validarForm) 
            return;
        
        if (modo === "agregar") {
            await agregarProducto(producto);
        } else {
            await editarProducto(producto);
        }
        onCerrar();
        
    }; 
 
    return ( 

        <>
        <div className="modal" tabIndex="-1" aria-modal="true" role='dialog' id='formProductoModal' aria-labelledby="formProductoLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {modo === "agregar" ? "Agregar Producto" : "Editar Producto"}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
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
                                        value={producto.nombre || ""} 
                                        className='form-control'
                                        placeholder='Nombre del producto'
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
                                        value={producto.precio || ""} 
                                        placeholder='0.00'
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
                            <div  className="modal-footer">
                                <button type="submit" className="btn btn-primary px-4">{modo === "agregar" ? <>Agregar</> : <>Actualizar</>}</button> 
                                <button type="button" className="btn btn-secondary" onClick={onCerrar} data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
  ); 
}

export default FormProducto;