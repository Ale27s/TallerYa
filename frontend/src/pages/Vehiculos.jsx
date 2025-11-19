import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [busqueda, setBusqueda] = useState("");
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [nuevoVehiculo, setNuevoVehiculo] = useState({ marca: "", modelo: "", anio: "", placa: "" });
  const isCliente = user?.rol === "CLIENTE";

  // 🔹 Cargar vehículos desde el backend
  const cargarVehiculos = () => {
    axios
      .get("http://127.0.0.1:8000/api/vehiculos/listar/", { withCredentials: true })
      .then((res) => setVehiculos(res.data))
      .catch(() => console.log("Error al cargar vehículos"));
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
    cargarVehiculos();
  }, []);

  const handleCrearVehiculo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/vehiculos/listar/", nuevoVehiculo, { withCredentials: true });
      setNuevoVehiculo({ marca: "", modelo: "", anio: "", placa: "" });
      cargarVehiculos();
    } catch (error) {
      console.error("No se pudo registrar el vehículo", error);
    }
  };

  // 🔹 Filtros + búsqueda
  const vehiculosFiltrados = vehiculos.filter((v) => {
    const palabra = busqueda.toLowerCase();

    const coincideEstado = filtroEstado === "TODOS" || v.estado === filtroEstado;

    const coincideBusqueda =
      v.propietario_nombre?.toLowerCase().includes(palabra) ||
      v.marca?.toLowerCase().includes(palabra) ||
      v.modelo?.toLowerCase().includes(palabra) ||
      v.placa?.toLowerCase().includes(palabra);

    return coincideEstado && coincideBusqueda;
  });

  // 🔹 Mostrar modal detalle
  const abrirDetalle = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);

    const modal = new window.bootstrap.Modal(
      document.getElementById("detalleModal")
    );
    modal.show();
  };

  return (
    <div className="content-wrapper-full">
      <div className="page-container-centered">

        {/* Título */}
        <h2 className="page-title">
          <i className="bi bi-car-front-fill me-2"></i>
          Gestión de Vehículos
        </h2>

        <p className="page-subtitle">
          Monitoreá el estado, tiempos y servicios de cada vehículo registrado.
        </p>

        {/* Filtros */}
        <div className="card p-3 shadow-sm border-0 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Buscar por propietario, marca o modelo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="TODOS">Todos los estados</option>
                <option value="EN_TALLER">En taller</option>
                <option value="FINALIZADO">Finalizado</option>
                <option value="PENDIENTE">Pendiente</option>
              </select>
            </div>

            <div className="col-md-4 text-end">
              <span className="fw-bold text-danger">
                {vehiculosFiltrados.length} vehículos encontrados
              </span>
            </div>
          </div>
        </div>

        {isCliente && (
          <div className="card p-3 shadow-sm border-0 mb-4">
            <h5 className="text-danger fw-bold mb-3">
              <i className="bi bi-plus-circle me-2"></i>Registrar mi vehículo
            </h5>
            <form className="row g-3" onSubmit={handleCrearVehiculo}>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Marca"
                  value={nuevoVehiculo.marca}
                  onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, marca: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Modelo"
                  value={nuevoVehiculo.modelo}
                  onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, modelo: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  className="form-control"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  placeholder="Año"
                  value={nuevoVehiculo.anio}
                  onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, anio: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  className="form-control"
                  placeholder="Placa"
                  value={nuevoVehiculo.placa}
                  onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, placa: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-2 d-grid">
                <button className="btn btn-danger" type="submit">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabla */}
        <div className="card p-3 shadow-sm border-0">
          {vehiculosFiltrados.length === 0 ? (
            <p className="text-muted text-center mt-3">
              No hay vehículos que coincidan con el filtro.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover text-center align-middle">
                <thead className="table-danger">
                  <tr>
                    <th>ID</th>
                    <th>Propietario</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Año</th>
                    <th>Placa</th>
                    <th>Estado</th>
                    <th>Mora</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {vehiculosFiltrados.map((v) => (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td>{v.propietario_nombre || "—"}</td>
                      <td>{v.marca}</td>
                      <td>{v.modelo}</td>
                      <td>{v.anio}</td>
                      <td>{v.placa}</td>

                      <td>
                        <span
                          className={`badge rounded-pill ${
                            v.estado === "EN_TALLER"
                              ? "bg-danger"
                              : v.estado === "FINALIZADO"
                              ? "bg-success"
                              : v.estado === "EN_SERVICIO"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {v.estado}
                        </span>
                      </td>

                      <td>{v.dias_mora || 0} días</td>

                      <td>
                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => abrirDetalle(v)}
                        >
                          <i className="bi bi-eye-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* MODAL */}
      <div
        className="modal fade"
        id="detalleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="bi bi-info-circle-fill me-2"></i>
                Detalle del Vehículo
              </h5>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {vehiculoSeleccionado ? (
                <>
                  <h5 className="fw-bold mb-2">
                    🚗 {vehiculoSeleccionado.marca} {vehiculoSeleccionado.modelo}
                    <span className="text-muted">
                      ({vehiculoSeleccionado.anio})
                    </span>
                  </h5>

                  <p>
                    <strong>Propietario:</strong> {vehiculoSeleccionado.propietario_nombre || "—"}
                  </p>
                  <p>
                    <strong>Placa:</strong> {vehiculoSeleccionado.placa}
                  </p>
                  <p>
                    <strong>Estado:</strong> {vehiculoSeleccionado.estado}
                  </p>
                  <p>
                    <strong>Mora:</strong>{" "}
                    {(vehiculoSeleccionado.dias_mora || 0) + " días"}
                  </p>
                </>
              ) : (
                <p>Cargando...</p>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>

              <button
                className="btn btn-success"
                onClick={() =>
                  vehiculoSeleccionado &&
                  window.open(
                    `http://127.0.0.1:8000/api/vehiculos/pdf/${vehiculoSeleccionado.id}/`,
                    "_blank"
                  )
                }
              >
                <i className="bi bi-file-earmark-pdf-fill me-1"></i>
                Generar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Vehiculos;
