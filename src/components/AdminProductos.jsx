import { useState } from "react";
import FormProducto from "./FormProducto";
import { useProductosContext } from "../context/ProductosContext";

const AdminProductos = () => {
  const { productos, eliminarProducto } = useProductosContext();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  /* PAGINACIÓN */
  const productosPorPagina = 5;
  const [paginaActual, setPaginaActual] = useState(1);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productos.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const cambiarPagina = (pagina) => setPaginaActual(pagina);

  /* FORMULARIOS */
  const abrirFormularioAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado(null);
    setMostrarForm(true);
  };

  const abrirFormularioEditar = (producto) => {
    setModoFormulario("editar");
    setProductoSeleccionado(producto);
    setMostrarForm(true);
  };

  const cerrarFormulario = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  };

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Productos</h2>

        <button
          onClick={abrirFormularioAgregar}
          className="btn btn-dark"
          //data-bs-toggle="modal"
          //data-bs-target="#formProductoModal"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Agregar producto
        </button>
      </div>

      {/* LISTADO */}
      {productos.length === 0 ? (
        <p>No hay productos cargados</p>
      ) : (
        <ul className="list-group">

          {productosActuales.map((producto) => (
            <li
              key={producto.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              {/* INFO */}
              <div className="d-flex align-items-center gap-3">
                <img
                  src={
                    producto.imagen &&
                    (producto.imagen.startsWith("http://") ||
                      producto.imagen.startsWith("https://"))
                      ? producto.imagen
                      : "/react-tienda-logo.png"
                  }
                  alt={producto.nombre}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                  }}
                />

                <div>
                  <strong>{producto.nombre}</strong>
                  <div className="text-muted small">
                    ${producto.precio}
                  </div>
                </div>
              </div>

              <div className="btn-group">
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => abrirFormularioEditar(producto)}
                  //data-bs-toggle="modal"
                  //data-bs-target="#formProductoModal"
                >
                  <i className="bi bi-pencil"></i>
                </button>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </li>
          ))}

        </ul>
      )}

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
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
      )}

      {/* MODAL FORM */}
      {mostrarForm && (
        <FormProducto
          productoInicial={productoSeleccionado || {}}
          modo={modoFormulario}
          onCerrar={cerrarFormulario}
        />
      )}
    </div>
  );
};

export default AdminProductos;
