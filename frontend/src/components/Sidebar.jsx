import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Sidebar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  const links = [
    { icon: "bi-speedometer2", label: "Panel", path: "/" },
    { icon: "bi-people-fill", label: "Clientes", path: "/clientes" },
    { icon: "bi-person-gear", label: "Personal", path: "/personal" },
    { icon: "bi-receipt", label: "Facturación", path: "/facturacion" },
    { icon: "bi-car-front", label: "Vehículos", path: "/vehiculos" },
  ];

  return (
    <div
      className={`sidebar p-3 bg-body-tertiary shadow-sm position-fixed top-0 start-0 vh-100 ${
        visible ? "slide-in" : "slide-out"
      }`}
      style={{
        width: "250px",
        transition: "all 0.4s ease-in-out",
        borderRight: "3px solid #c70000",
        zIndex: 1050,
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-danger fw-bold">
          <i className="bi bi-gear-fill me-1"></i> Menú
        </h5>
        <i
          className="bi bi-x-lg text-danger"
          style={{ cursor: "pointer" }}
          onClick={() => setVisible(false)}
        ></i>
      </div>

      <ul className="list-unstyled">
        {links.map((link, idx) => (
          <li
            key={idx}
            className="mb-3 nav-link text-dark d-flex align-items-center"
            style={{ cursor: "pointer", transition: "0.2s" }}
            onClick={() => navigate(link.path)}
          >
            <i className={`bi ${link.icon} me-2 text-danger`}></i>
            {link.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
