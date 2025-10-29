import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Personal from "./pages/Personal";
import Clientes from "./pages/Clientes";
import Mecanico from "./pages/Mecanico";
import Citas from "./pages/Citas";
import Facturacion from "./pages/Facturacion";
import Vehiculos from "./pages/Vehiculos";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Layout() {
  const location = useLocation();

  // 🔹 Ocultar Sidebar en login y register
  const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="row">
          {!hideSidebar && (
            <div className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar">

            </div>
          )}

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
