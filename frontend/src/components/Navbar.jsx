import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } shadow-sm`}
      style={{ borderBottom: "3px solid #c70000" }}
    >
      <div className="container-fluid">
        {/* LOGO */}
        <Link className="navbar-brand fw-bold text-danger" to="/">
          <i className="bi bi-wrench-adjustable me-2"></i> TallerYa
        </Link>

        {/* BOTÓN MÓVIL */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
        >
          <i className="bi bi-list text-danger fs-2"></i>
        </button>

        {/* ENLACES */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">

            {/* Inicio */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                INICIO
              </Link>
            </li>

            {/* Servicios */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="servicesDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                SERVICIOS
              </Link>
              <ul className="dropdown-menu shadow border-0">
                <li><Link className="dropdown-item" to="/citas">Agendar cita</Link></li>
                <li><Link className="dropdown-item" to="/vehiculos">Estado del vehículo</Link></li>
                <li><Link className="dropdown-item" to="/facturacion">Facturación</Link></li>
              </ul>
            </li>

            {/* Precios */}
            <li className="nav-item">
              <Link className="nav-link" to="/precios">
                PRECIOS
              </Link>
            </li>

            {/* Noticias */}
            <li className="nav-item">
              <Link className="nav-link" to="/noticias">
                NOTICIAS
              </Link>
            </li>

            {/* Páginas (submenú largo tipo ejemplo de tu imagen) */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="pagesDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                PÁGINAS
              </Link>
              <ul className="dropdown-menu shadow border-0">
                <li><Link className="dropdown-item" to="/clientes">Clientes</Link></li>
                <li><Link className="dropdown-item" to="/personal">Personal</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/login">Iniciar sesión</Link></li>
                <li><Link className="dropdown-item" to="/register">Registro</Link></li>
                <li><Link className="dropdown-item" to="/contacto">Contacto</Link></li>
                <li><Link className="dropdown-item" to="/ayuda">Ayuda y soporte</Link></li>
              </ul>
            </li>

            {/* Contactos */}
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                CONTACTO
              </Link>
            </li>
          </ul>

          {/* 🔹 SWITCH DE TEMA */}
          <div className="d-flex align-items-center me-3">
            <i
              className={`bi ${
                darkMode
                  ? "bi-moon-stars-fill text-warning"
                  : "bi-brightness-high-fill text-danger"
              } fs-4`}
              style={{ cursor: "pointer" }}
              onClick={() => setDarkMode(!darkMode)}
            ></i>
          </div>

          {/* 🔹 BOTÓN LOGIN / LOGOUT */}
          <div className="d-flex">
            {!user ? (
              <button
                className="btn btn-outline-danger"
                onClick={() => navigate("/login")}
              >
                Entrar
              </button>
            ) : (
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
