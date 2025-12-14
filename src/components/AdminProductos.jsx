import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import { useProductosContext } from "../context/ProductosContext";
//import styles from './GestionProducto.module.css';
//import CirclePlus from "../assets/CirclePlus";
//import SquarePen from "../assets/SquarePen";
//import TrashIcon from "../assets/TrashIcon";

const AdminProductos = () => {
  // Contexto de producto
  const { productos, eliminarProducto } = useProductosContext();

  // Estados 
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Abrir formulario para AGREGAR
  const abrirFormularioAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado(null); // Sin producto inicial
    setMostrarForm(true);
  };
  

  // Abrir formulario para EDITAR
  const abrirFormularioEditar = (producto) => {
    setModoFormulario("editar");
    setProductoSeleccionado(producto); // Pasar el producto a editar
    setMostrarForm(true);
  };

  // Cerrar formulario
  const cerrarFormulario = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  };

  


  return (
    <div className='container-fluid'>
        <div className='row mb-3'>
            <div className='col-sm-3'>
            <h2>Lista de Productos</h2>
            </div>
            <div className="col-auto">
                <button
                onClick={abrirFormularioAgregar}
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target="#formProductoModal"
                >
                <i className="bi bi-plus-circle  position-relative" /> Agregar Producto
                </button>
            </div>
        </div>
        {/* Lista de productos */}
        <div className="row mb-3">
          {productos.length === 0 ? (
            <p>No se ha cargado ningún producto</p>
          ) : (
            <div className="col-sm-6">
                
              {productos.map((producto) => (

                <div className="card m-b3" key={producto.id}>
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img src={producto.imagen} className="img-fluid rounded-start" alt={producto.nombre} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <p className="card-text"><small class="text-body-secondary">Precio: ${producto.precio}</small></p>
                                {/* Botones para editar y eliminar este producto */}
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end" >
                                    <button 
                                    className='btn  btn-outline-secondary' 
                                    onClick={() => abrirFormularioEditar(producto)}
                                    data-bs-toggle="modal" data-bs-target="#formProductoModal"
                                    >
                                    <i class="bi bi-pencil-square"></i>
                                    </button>
                                    <button 
                                        className='btn  btn-outline-danger'
                                        onClick={() => eliminarProducto(producto.id)}
                                    >
                                    <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
              ))}
            </div>
          )}
        </div>

        {/* Modal - Formulario condicional */}
        {mostrarForm && (
          <>
              {/* Pasar los props correctos según el modo */}
              <FormProducto
                productoInicial={productoSeleccionado || {}}
                modo={modoFormulario}
                onCerrar={cerrarFormulario}
              />
          </>
        )}
      </div>
    
  );
};

export default AdminProductos;