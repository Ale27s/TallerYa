import { useNavigate } from "react-router-dom";

function Sidebar({ user, visible }) {
  const navigate = useNavigate();

  // Si todavía no hay usuario, no renderizar nada
  if (!user) {
    return (
      <div className={`sidebar bg-light border-end ${visible ? "show" : "hide"}`}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-muted text-center">
            No hay usuario activo
          </li>
        </ul>
      </div>
    );
  }

  const opciones = [
    { rol: "JEFE", label: "Gestión Personal", route: "/personal", icon: "bi-people-fill" },
    { rol: "MECANICO", label: "Tareas", route: "/mecanico", icon: "bi-tools" },
    { rol: "CLIENTE", label: "Inicio", route: "/cliente", icon: "bi-car-front-fill" },
  ];

  const opcionesFiltradas = opciones.filter((op) => op.rol === user?.rol);

  return (
    <div className={`sidebar bg-light border-end ${visible ? "show" : "hide"}`}>
      <ul className="list-group list-group-flush">
        {opcionesFiltradas.length > 0 ? (
          opcionesFiltradas.map((op, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action sidebar-item"
              onClick={() => navigate(op.route)}
              style={{ cursor: "pointer" }}
            >
              <i className={`bi ${op.icon} me-2`}></i> {op.label}
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted text-center">
            Sin opciones para este rol
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
