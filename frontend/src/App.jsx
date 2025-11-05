import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ✅ Componentes
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
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

  // 🔹 Páginas sin Sidebar ni Hero
  const noSidebar = ["/login", "/register"];
  const hideSidebar = noSidebar.includes(location.pathname);

  return (
    <>
      {/* Loader animado */}
      <Loader />

      {/* Navbar superior */}
      <Navbar />

      {/* Hero principal solo en inicio */}
      {location.pathname === "/" && (
        <div className="hero-wrapper">
          <HeroSection />
        </div>
      )}

      {/* Contenido */}
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar visible excepto en login/register */}
          {!hideSidebar && (
            <div className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar">
              <Sidebar />
            </div>
          )}

          {/* Área principal */}
          <main className={hideSidebar ? "col-12" : "col-md-9 ms-sm-auto col-lg-10 px-md-4"}>
            <Routes>
              {/* Dashboard principal */}
              <Route path="/" element={<Dashboard />} />

              {/* Módulos internos */}
              <Route path="/personal" element={<Personal />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/mecanico" element={<Mecanico />} />
              <Route path="/citas" element={<Citas />} />
              <Route path="/facturacion" element={<Facturacion />} />
              <Route path="/vehiculos" element={<Vehiculos />} />

              {/* Nuevas páginas */}
              <Route path="/prices" element={<Prices />} />
              <Route path="/contact" element={<Contact />} />

              {/* Autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </div>
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
