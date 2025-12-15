import { useSearch } from "../context/SearchContext";
import { useProductosContext } from "../context/ProductosContext";
import { Link } from "react-router-dom";

const SearchResults = () => {
  // usamos los contextos de busqueda y productos.
  const { search } = useSearch();
  const { productos } = useProductosContext();

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div className="container py-5">
        <h2 className="fw-bold mb-4">
            Productos
        </h2>

        <div className="row g-4">
            {productosFiltrados.length > 0 ? (
            <>
                {productosFiltrados.map((producto) => (
                <div
                    key={producto.id}
                    className="col-12 col-sm-6 col-lg-3"
                >
                    <div className="card h-100">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="card-img-top object-fit-cover"
                        style={{ height: "320px" }}
                    />

                    <div className="card-body d-flex justify-content-between align-items-start">
                        <h5 className="card-title fs-6 mb-0">
                        <Link
                            to={`/producto/${producto.id}`}
                            className="text-decoration-none text-dark"
                        >
                            {producto.nombre}
                        </Link>
                        </h5>

                        <span className="fw-semibold text-dark">
                        ${producto.precio}
                        </span>
                    </div>
                    </div>
                </div>
                ))}
            </>
            ) : (
            <p>No hay productos que coincidan con la búsqueda.</p>
            )}
        </div>
    </div>
    </>
  );
};

export default SearchResults;