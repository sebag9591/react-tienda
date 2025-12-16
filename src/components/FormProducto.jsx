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

        if (producto.imagen && 
            !producto.imagen.startsWith("http://") &&
            !producto.imagen.startsWith("https://")
            ) {
                nuevosErrores.imagen = "La imagen debe ser una URL válida (http o https).";
            }
        
        setErrores(nuevosErrores); 
        return Object.keys(nuevosErrores).length === 0; 
    }; 
 
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        if (!validarForm()) 
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
        <div className="modal show d-block" tabIndex="-1" role='dialog' id='formProductoModal' >
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
                                <div className='col-auto'>
                                    <label className='col-sm-5 col-form-label' htmlFor='imagen'>
                                        Imagen:
                                    </label>
                                </div>
                                <div className='col-auto'>
                                    <input 
                                        type="text" 
                                        name="imagen" 
                                        value={producto.imagen || ""} 
                                        className='form-control'
                                        placeholder='URL de la imagen'
                                        onChange={handleChange} 
                                    /> 
                                </div>
                                <div className='col-auto'>
                                    {errores.imagen && <p style={{ color: 'red' }} className='form-text'>{errores.imagen}</p>}                             
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
                                <button type="button" className="btn btn-secondary" onClick={onCerrar} >Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* Backdrop */}
        <div className="modal-backdrop fade show"></div>
        </>
  ); 
}

export default FormProducto;