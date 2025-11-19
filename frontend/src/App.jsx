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
import ClienteHome from "./pages/ClienteHome.jsx";
import Home from "./pages/Home.jsx";

// ✅ Nuevas páginas
import Prices from "./pages/Prices.jsx";
import Contact from "./pages/Contact.jsx";
import Noticias from "./pages/Noticias.jsx";
import Ayuda from "./pages/Ayuda.jsx";

function Layout() {
  const location = useLocation();

  // 🔹 Rutas sin Sidebar (login, register)
  const fullWidthRoutes = ["/login", "/register"];
  const isFullWidth = fullWidthRoutes.includes(location.pathname);

  // 🔹 Mostrar Hero solo en inicio
  const showHero = location.pathname === "/";

  const routes = (
    <Routes>
      {/* Página de inicio y dashboard */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Módulos */}
      <Route path="/personal" element={<Personal />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/cliente" element={<ClienteHome />} />
      <Route path="/mecanico" element={<Mecanico />} />
      <Route path="/citas" element={<Citas />} />
      <Route path="/facturacion" element={<Facturacion />} />
      <Route path="/vehiculos" element={<Vehiculos />} />

      {/* Extras */}
      <Route path="/prices" element={<Prices />} />
      <Route path="/precios" element={<Prices />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/ayuda" element={<Ayuda />} />

      {/* Login y registro */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );

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

      {isFullWidth ? (
        <div className="page-full animate__animated animate__fadeIn">
          <div className="w-100">{routes}</div>
        </div>
      ) : (
        <main className="content-wrapper animate__animated animate__fadeIn">
          {routes}
        </main>
      )}

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
