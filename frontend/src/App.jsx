import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ✅ Componentes
import Navbar from "./components/Navbar.jsx";
import Loader from "./components/Loader.jsx";
import HeroSection from "./components/HeroSection.jsx";

// ✅ Páginas principales
import Dashboard from "./pages/Dashboard.jsx";
import Personal from "./pages/Personal.jsx";
import Clientes from "./pages/Clientes.jsx";
import Mecanico from "./pages/Mecanico.jsx";
import Citas from "./pages/Citas.jsx";
import Facturacion from "./pages/Facturacion.jsx";
import Vehiculos from "./pages/Vehiculos.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// ✅ Nuevas páginas
import Prices from "./pages/Prices.jsx";
import Contact from "./pages/Contact.jsx";

function Layout() {
  const location = useLocation();

  // 🔹 Rutas sin Sidebar (login, register)
  const noSidebar = ["/login", "/register"];
  const hideSidebar = noSidebar.includes(location.pathname);

  // 🔹 Mostrar Hero solo en inicio
  const showHero = location.pathname === "/";

  return (
    <>
      {/* Loader inicial */}
      <Loader />

      {/* Navbar */}
      <Navbar />

      {/* Hero principal (solo en inicio) */}
      {showHero && (
        <div className="hero-wrapper">
          <HeroSection />
        </div>
      )}



        {/* Contenido principal */}
        <main className="content-wrapper p-4 animate__animated animate__fadeIn">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Módulos */}
            <Route path="/personal" element={<Personal />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/mecanico" element={<Mecanico />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/facturacion" element={<Facturacion />} />
            <Route path="/vehiculos" element={<Vehiculos />} />

            {/* Extras */}
            <Route path="/prices" element={<Prices />} />
            <Route path="/contact" element={<Contact />} />

            {/* Login y registro */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
    
    </>
  );
}


function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
