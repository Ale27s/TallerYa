import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ✅ Importaciones corregidas
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Loader from "./components/Loader.jsx";
import HeroSection from "./components/HeroSection.jsx";

// ✅ Páginas
import Dashboard from "./pages/Dashboard.jsx";
import Personal from "./pages/Personal.jsx";
import Clientes from "./pages/Clientes.jsx";
import Mecanico from "./pages/Mecanico.jsx";
import Citas from "./pages/Citas.jsx";
import Facturacion from "./pages/Facturacion.jsx";
import Vehiculos from "./pages/Vehiculos.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function Layout() {
  const location = useLocation();

  // 🔹 Ocultar Sidebar en login y register
  const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Loader /> {/* 👈 Loader al inicio */}
      <Navbar />
      {/* HERO a pantalla completa */}
      {location.pathname === "/" && (
        <div className="hero-wrapper">
          <HeroSection />
        </div>
      )}
      <div className="container-fluid mt-4">
        <div className="row">
          
          <main className={hideSidebar ? "col-12" : "col-md-9 ms-sm-auto col-lg-10 px-md-4"}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/mecanico" element={<Mecanico />} />
              <Route path="/citas" element={<Citas />} />
              <Route path="/facturacion" element={<Facturacion />} />
              <Route path="/vehiculos" element={<Vehiculos />} />
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
