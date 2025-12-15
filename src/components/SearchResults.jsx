import { useSearch } from "../context/SearchContext";
import { useProductosContext } from "../context/ProductosContext";
import { CarritoContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const SearchResults = () => {
  const { search } = useSearch();
  const { productos } = useProductosContext();
  const { agregarProductoAlCarrito } = useContext(CarritoContext);

  // paginación
  const productosPorPagina = 3;
  const [paginaActual, setPaginaActual] = useState(1);

  // filtrar productos
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // resetear página cuando cambia la búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [search]);

  // cálculo de productos actuales
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;

  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  return (
    <div className="container mb-5 mt-5">

      {/* Título */}
      <div className="text-center mb-4">
        <h1>Resultados de búsqueda</h1>
        
      </div>

      {productosFiltrados.length > 0 ? (
        <>
          {/* Grilla de productos */}
          <div className="row g-4">
            {productosActuales.map((producto) => (
              <div
                className="col-12 col-sm-6 col-lg-4"
                key={producto.id}
              >
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
                      className="btn btn-dark mt-auto w-100"
                      onClick={() =>
                        agregarProductoAlCarrito(producto)
                      }
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Agregar al carrito
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* PAGINACIÓN */}
          {totalPaginas > 1 && (
            <div className="d-flex justify-content-center gap-2 mt-5 flex-wrap">
              {Array.from({ length: totalPaginas }, (_, index) => (
                <button
                  key={index + 1}
                  className={
                    paginaActual === index + 1
                      ? "btn btn-dark"
                      : "btn btn-outline-dark"
                  }
                  onClick={() => setPaginaActual(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center">
          No hay productos que coincidan con la búsqueda.
        </p>
      )}
    </div>
  );
};

export default SearchResults;
