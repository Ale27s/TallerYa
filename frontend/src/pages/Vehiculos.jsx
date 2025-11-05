import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [busqueda, setBusqueda] = useState("");
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  // 🔹 Cargar vehículos desde el backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/vehiculos/listar/")
      .then((res) => setVehiculos(res.data))
      .catch(() => console.log("Error al cargar vehículos"));
  }, []);

  // 🔹 Filtros y búsqueda
  const vehiculosFiltrados = vehiculos.filter((v) => {
    const coincideEstado = filtroEstado === "TODOS" || v.estado === filtroEstado;
    const coincideBusqueda =
      v.cliente_nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.marca?.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.modelo?.toLowerCase().includes(busqueda.toLowerCase());
    return coincideEstado && coincideBusqueda;
  });

  // 🔹 Abrir modal con detalle
  const abrirDetalle = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    const modal = new window.bootstrap.Modal(document.getElementById("detalleModal"));
    modal.show();
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <div className="page-container animate__animated animate__fadeIn">
          <h2 className="page-title">
            <i className="bi bi-car-front-fill me-2 text-danger"></i>Gestión de Vehículos
          </h2>
          <p className="page-subtitle">
            Monitoreá el estado, tiempos y servicios de cada vehículo registrado.
          </p>

          {/* 🔹 Filtros */}
          <div className="card p-3 shadow-sm border-0 mb-4">
            <div className="row g-3 align-items-center">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 Buscar por cliente, marca o modelo..."
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

          {/* 🔹 Tabla */}
          <div className="card p-3 shadow-sm border-0">
            {vehiculosFiltrados.length === 0 ? (
              <p className="text-muted text-center mt-3">
                No hay vehículos que coincidan con el filtro.
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-hover text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Estado</th>
                      <th>Tiempo Mora</th>
                      <th>Hechos</th>
                      <th>Pendientes</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehiculosFiltrados.map((v) => (
                      <tr key={v.id}>
                        <td>{v.id}</td>
                        <td>{v.cliente_nombre || "—"}</td>
                        <td>{v.marca}</td>
                        <td>{v.modelo}</td>
                        <td>
                          <span
                            className={`badge ${
                              v.estado === "EN_TALLER"
                                ? "bg-warning text-dark"
                                : v.estado === "FINALIZADO"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {v.estado}
                          </span>
                        </td>
                        <td>{v.tiempo_mora || "0 días"}</td>
                        <td>{v.servicios_hechos || 0}</td>
                        <td>{v.servicios_pendientes || 0}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm"
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

        {/* 🔹 Modal Detalle */}
        <div
          className="modal fade"
          id="detalleModal"
          tabIndex="-1"
          aria-labelledby="detalleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <i className="bi bi-info-circle-fill me-2"></i>Detalle del Vehículo
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {vehiculoSeleccionado ? (
                  <>
                    <h5 className="fw-bold mb-2">
                      🚗 {vehiculoSeleccionado.marca} {vehiculoSeleccionado.modelo}{" "}
                      <span className="text-muted">({vehiculoSeleccionado.anho})</span>
                    </h5>
                    <p>
                      <strong>Cliente:</strong> {vehiculoSeleccionado.cliente_nombre}
                    </p>
                    <p>
                      <strong>Estado actual:</strong> {vehiculoSeleccionado.estado}
                    </p>
                    <p>
                      <strong>Servicios realizados:</strong>{" "}
                      {vehiculoSeleccionado.servicios_hechos || 0}
                    </p>
                    <p>
                      <strong>Servicios pendientes:</strong>{" "}
                      {vehiculoSeleccionado.servicios_pendientes || 0}
                    </p>
                    <p>
                      <strong>Tiempo de mora:</strong>{" "}
                      {vehiculoSeleccionado.tiempo_mora || "Sin retraso"}
                    </p>
                    <hr />
                    <p>
                      <strong>Observaciones:</strong>{" "}
                      {vehiculoSeleccionado.observaciones ||
                        "Sin observaciones registradas."}
                    </p>
                  </>
                ) : (
                  <p>Cargando información...</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    if (vehiculoSeleccionado) {
                      window.open(
                        `http://127.0.0.1:8000/api/vehiculos/pdf/${vehiculoSeleccionado.id}/`,
                        "_blank"
                      );
                    }
                  }}
                >
                  <i className="bi bi-file-earmark-pdf-fill me-1"></i> Generar PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehiculos;
