import { useMemo, useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { initialServicios } from "../data/content";

function Prices() {
  const [categoria, setCategoria] = useState("TODOS");
  const [servicios, setServicios] = useState(initialServicios);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    precio: "",
    categoria: "MECANICA",
    descripcion: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  }, []);

  const puedeEditar = user?.rol === "JEFE" || user?.rol === "MECANICO";

  const categoriasDisponibles = useMemo(
    () => ["TODOS", ...new Set(servicios.map((s) => s.categoria))],
    [servicios]
  );

  const filtrados =
    categoria === "TODOS"
      ? servicios
      : servicios.filter((s) => s.categoria === categoria);

  const handleAddServicio = (e) => {
    e.preventDefault();
    if (!puedeEditar) return;
    if (!nuevoServicio.nombre.trim()) return;

    const servicioNuevo = {
      ...nuevoServicio,
      id: Date.now(),
      precio: Number(nuevoServicio.precio) || 0,
    };

    setServicios((prev) => [...prev, servicioNuevo]);
    setNuevoServicio({ nombre: "", precio: "", categoria: "MECANICA", descripcion: "" });
    setCategoria("TODOS");
  };

  return (
    <div className="content-wrapper-full">
      <div className="page-container-centered">

        {/* Título */}
        <h2 className="page-title text-center">
          <i className="bi bi-cash-stack me-2"></i>
          Lista de Servicios
        </h2>

        <p className="page-subtitle text-center">
          Consultá nuestros precios actualizados según categoría.
        </p>

        {/* Filtros */}
        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          {categoriasDisponibles.map((cat) => (
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

        <div className="row g-4">
          {/* Lista de Servicios */}
          <div className="col-12 col-xl-7">
            <div className="row justify-content-center">
              {filtrados.map((s) => (
                <div
                  key={s.id}
                  className="col-md-6 card p-3 m-2 d-flex justify-content-between align-items-start service-card"
                >
                  <div>
                    <span className="fw-semibold d-block">{s.nombre}</span>
                    {s.descripcion && (
                      <small className="text-muted d-block mt-1">{s.descripcion}</small>
                    )}
                    <span className="badge bg-danger-subtle text-danger mt-2">{s.categoria}</span>
                  </div>

                  <div className="text-end">
                    <strong className="text-danger d-block mb-2">
                      Gs. {s.precio.toLocaleString()}
                    </strong>

                    <a href="/citas" className="btn btn-outline-danger btn-sm">
                      <i className="bi bi-calendar-check me-1"></i> Agendar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario para agregar servicios */}
          <div className="col-12 col-xl-5">
            <div className="card h-100 p-4">
              <h5 className="fw-bold mb-3 text-danger">
                <i className="bi bi-plus-circle me-2"></i>Agregar servicio
              </h5>
              <p className="text-muted small">
                Usa este formulario para sumar nuevos servicios o promociones al catálogo.
              </p>

              {!puedeEditar && (
                <div className="alert alert-warning py-2">
                  Solo el jefe o un mecánico pueden modificar el listado de precios. El resto de roles tiene acceso de solo lectura.
                </div>
              )}

              <form className="d-flex flex-column gap-3" onSubmit={handleAddServicio}>
                <div>
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    value={nuevoServicio.nombre}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                    placeholder="Ej: Cambio de pastillas"
                    required
                    disabled={!puedeEditar}
                  />
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Precio (Gs.)</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      value={nuevoServicio.precio}
                      onChange={(e) => setNuevoServicio({ ...nuevoServicio, precio: e.target.value })}
                      placeholder="120000"
                      required
                      disabled={!puedeEditar}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Categoría</label>
                    <select
                      className="form-select"
                      value={nuevoServicio.categoria}
                      onChange={(e) => setNuevoServicio({ ...nuevoServicio, categoria: e.target.value })}
                      disabled={!puedeEditar}
                    >
                      {["MECANICA", "ELECTRICO", "LAVADO", "DETALLADO", "OTROS"].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">Descripción (opcional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={nuevoServicio.descripcion}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })}
                    placeholder="Incluye breve detalle o condiciones"
                    disabled={!puedeEditar}
                  />
                </div>

                <button className="btn btn-danger w-100 fw-semibold" type="submit" disabled={!puedeEditar}>
                  Guardar servicio
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Prices;
