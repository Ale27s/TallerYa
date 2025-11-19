import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Nuevo: detecta cambios de ruta
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

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

  // Mantiene un relleno superior en el body para que el contenido no quede oculto tras el navbar fijo
  useEffect(() => {
    const updateBodyOffset = () => {
      if (navRef.current) {
        document.body.style.paddingTop = `${navRef.current.offsetHeight}px`;
      }
    };

    updateBodyOffset();
    window.addEventListener("resize", updateBodyOffset);

    return () => {
      window.removeEventListener("resize", updateBodyOffset);
      document.body.style.paddingTop = "";
    };
  }, []);

  useEffect(() => {
    if (navRef.current) {
      document.body.style.paddingTop = `${navRef.current.offsetHeight}px`;
    }
  }, [user, isCliente, darkMode]);

  // 👇 NUEVO: cierra el menú colapsable cuando se cambia de página
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

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
      ref={navRef}
      className={`navbar navbar-expand-lg fixed-top ${
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
          aria-controls="navbarNavDropdown"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <i className="bi bi-list text-danger fs-2"></i>
        </button>

        {/* ENLACES */}
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">

            {/* Inicio */}
            <li className="nav-item">
              <Link className="nav-link" to={homePath}>
                INICIO
              </Link>
            </li>

            {/* Servicios */}
            <li className={`nav-item dropdown ${openDropdown === "services" ? "show" : ""}`}>
              <button
                className="nav-link dropdown-toggle bg-transparent border-0"
                type="button"
                id="servicesDropdown"
                aria-expanded={openDropdown === "services"}
                onClick={() => toggleDropdown("services")}
              >
                SERVICIOS
              </button>
              <ul className={`dropdown-menu shadow border-0 ${openDropdown === "services" ? "show" : ""}`}>
                {serviceLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      className="dropdown-item"
                      to={link.to}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Gestión interna para staff */}
            {gestionLinks.length > 0 && (
              <li
                className={`nav-item dropdown ${openDropdown === "gestion" ? "show" : ""}`}
              >
                <button
                  className="nav-link dropdown-toggle bg-transparent border-0"
                  type="button"
                  id="gestionDropdown"
                  aria-expanded={openDropdown === "gestion"}
                  onClick={() => toggleDropdown("gestion")}
                >
                  GESTIÓN
                </button>
                <ul
                  className={`dropdown-menu shadow border-0 ${
                    openDropdown === "gestion" ? "show" : ""
                  }`}
                >
                  {gestionLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        className="dropdown-item"
                        to={link.to}
                        onClick={() => setOpenDropdown(null)}
                      >
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
