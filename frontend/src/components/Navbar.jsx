import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Nuevo: detecta cambios de ruta
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  const isLogged = Boolean(user);
  const isCliente = user?.rol === "CLIENTE";
  const homePath = isCliente ? "/cliente" : "/";

  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // 👇 NUEVO: cierra el menú colapsable cuando se cambia de página
  useEffect(() => {
    const navCollapse = document.querySelector(".navbar-collapse");
    if (navCollapse && navCollapse.classList.contains("show")) {
      navCollapse.classList.remove("show");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const serviceLinks = useMemo(() => {
    const baseLinks = [
      { label: "Agendar cita", to: "/citas" },
      { label: isCliente ? "Estado del vehículo" : "Vehículos", to: "/vehiculos" },
    ];

    if (!isCliente) {
      baseLinks.push({ label: "Facturación", to: "/facturacion" });
    }

    return baseLinks;
  }, [isCliente]);

  const gestionLinks = useMemo(() => {
    if (!isLogged || isCliente) return [];

    return [
      { label: "Panel de control", to: "/dashboard" },
      { label: "Personal", to: "/personal" },
      { label: "Clientes", to: "/clientes" },
      { label: "Mecánicos", to: "/mecanico" },
      { label: "Citas", to: "/citas" },
      { label: "Vehículos", to: "/vehiculos" },
      { label: "Facturación", to: "/facturacion" },
    ];
  }, [isCliente, isLogged]);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } shadow-sm`}
      style={{ borderBottom: "3px solid #c70000" }}
    >
      <div className="container-fluid">
        {/* LOGO */}
        <Link className="navbar-brand fw-bold text-danger" to={homePath}>
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
              <Link className="nav-link" to={homePath}>
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
                {serviceLinks.map((link) => (
                  <li key={link.to}>
                    <Link className="dropdown-item" to={link.to}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Gestión interna para staff */}
            {gestionLinks.length > 0 && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="gestionDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  GESTIÓN
                </Link>
                <ul className="dropdown-menu shadow border-0">
                  {gestionLinks.map((link) => (
                    <li key={link.to}>
                      <Link className="dropdown-item" to={link.to}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}

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

            {/* Ayuda */}
            <li className="nav-item">
              <Link className="nav-link" to="/ayuda">
                AYUDA
              </Link>
            </li>

            {/* Contacto */}
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

          {/* 🔹 Información de usuario y login/logout */}
          <div className="d-flex align-items-center">
            {user && (
              <div className="text-end me-3">
                <div className="small text-muted">Sesión activa</div>
                <div className="fw-bold text-uppercase">{user.username}</div>
                <span className="badge rounded-pill text-bg-light border border-danger text-danger">
                  {user.rol}
                </span>
              </div>
            )}

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
      </div>
    </nav>
  );
}

export default Navbar;
