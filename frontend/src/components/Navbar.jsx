import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 🔹 Menús por rol
  const menuPorRol = {
    JEFE: [
      { path: "/", label: "Inicio" },
      { path: "/clientes", label: "Clientes" },
      { path: "/personal", label: "Personal" },
      { path: "/facturacion", label: "Facturación" },
      { path: "/vehiculos", label: "Vehículos" },
    ],
    MECANICO: [
      { path: "/", label: "Inicio" },
      { path: "/citas", label: "Mis Citas" },
      { path: "/vehiculos", label: "Vehículos" },
    ],
    CLIENTE: [
      { path: "/", label: "Inicio" },
      { path: "/vehiculos", label: "Mis Vehículos" },
      { path: "/facturacion", label: "Facturación" },
    ],
  };

  const rolActual = user?.rol || "PUBLICO";
  const menu = menuPorRol[rolActual] || [{ path: "/", label: "Inicio" }];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          TallerYa <i className="bi bi-wrench-adjustable"></i>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menu.map((item, index) => (
              <li key={index} className="nav-item">
                <Link className="nav-link" to={item.path}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center">
            {!user ? (
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => navigate("/login")}
              >
                Entrar
              </button>
            ) : (
              <>
                <span className="text-light me-3">
                  <i className="bi bi-person-circle me-1"></i>
                  {user.username} ({user.rol})
                </span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
