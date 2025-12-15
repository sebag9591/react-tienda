import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);

    // Si hay texto, navegar a la página de búsqueda
    if (search.trim()) {
      navigate("/busqueda");
    }
  };

  return (
    <>
    <form className="d-flex" role="search">
        <div className="position-relative">
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input className="form-control ps-5" type="search" placeholder="Buscar productos..." id="search" aria-label="Buscar" onChange={handleSearch} />
        </div>
    </form>
    </>
    
  );
};

export default SearchBar;