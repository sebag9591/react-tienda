import { createContext, useState, useContext } from "react";
// creamos el contexto de busqueda
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

  const [search, setSearch] = useState("");
  
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);