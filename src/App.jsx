import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminHeader from './components/AdminHeader'
import AdminFooter from './components/AdminFooter'
import { Route, Routes, useLocation } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Nosotros from './pages/Nosotros'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './components/Carrito'
import RutaProtegida from "./components/RutaProtegida"
import Admin from "./components/Admin";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0)

  const location = useLocation(); // en qué ruta estoy


  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
        {isAdminRoute ? <AdminHeader /> : <Header />}
        <Routes>
            <Route path={'/'} element={<Inicio />} />
            <Route path={'/nosotros'} element={<Nosotros />} />
            <Route path="/login" element={<Login />} />
            <Route path={'/producto/:id'} element={<ProductoDetalle />} />
            <Route path={"/carrito"}  element={
                <RutaProtegida >
                  <Carrito />
                </RutaProtegida>
              }
            />
            <Route path={"/admin"} element={
                <RutaProtegida >
                  <Admin />
                </RutaProtegida>
              }
            />
        </Routes>
        {isAdminRoute ? '' : <Footer />}
    </>
  )
}

export default App
