import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Nosotros from './pages/Nosotros'
import ProductoDetalle from './pages/ProductoDetalle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header />
        <Routes>
            <Route path={'/'} element={<Inicio />} />
            <Route path={'/nosotros'} element={<Nosotros />} />
            <Route path={'/producto/:id'} element={<ProductoDetalle />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
