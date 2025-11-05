import { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Prices() {
  const [categoria, setCategoria] = useState("TODOS");

  const servicios = [
    { id: 1, nombre: "Cambio de aceite y filtros", precio: 120000, categoria: "MECANICA" },
    { id: 2, nombre: "Alineación y balanceo", precio: 80000, categoria: "MECANICA" },
    { id: 3, nombre: "Revisión eléctrica", precio: 100000, categoria: "ELECTRICO" },
    { id: 4, nombre: "Reparación de frenos", precio: 150000, categoria: "MECANICA" },
    { id: 5, nombre: "Diagnóstico computarizado", precio: 180000, categoria: "ELECTRICO" },
    { id: 6, nombre: "Lavado completo", precio: 60000, categoria: "LAVADO" },
  ];

  const filtrados =
    categoria === "TODOS"
      ? servicios
      : servicios.filter((s) => s.categoria === categoria);

  return (
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-4 text-danger">Lista de Servicios</h2>

      {/* Filtros */}
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        {["TODOS", "MECANICA", "ELECTRICO", "LAVADO"].map((cat) => (
          <button
            key={cat}
            className={`btn ${
              categoria === cat
                ? "btn-danger text-white"
                : "btn-outline-light border-danger text-danger"
            } px-4 fw-semibold`}
            onClick={() => setCategoria(cat)}
          >
            {cat === "TODOS" ? "MOSTRAR TODOS" : cat}
          </button>
        ))}
      </div>

      {/* Tabla de servicios */}
      <div className="row justify-content-center">
        {filtrados.map((s) => (
          <div
            key={s.id}
            className="col-md-5 bg-dark text-light rounded-3 p-3 m-2 d-flex justify-content-between align-items-center shadow-sm service-card"
          >
            <span>{s.nombre}</span>
            <div className="text-end">
              <strong className="text-danger me-3">
                Gs. {s.precio.toLocaleString()}
              </strong>
              <a href="/citas" className="btn btn-outline-danger btn-sm">
                <i className="bi bi-calendar-check me-1"></i> Agendar
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Prices;
