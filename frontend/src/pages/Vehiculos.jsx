import { useEffect, useState } from "react";
import axios from "axios";
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
    <div className="container mt-4">
      <h3 className="mb-4">🚘 Gestión de Vehículos</h3>

      {/* 🔹 Filtros */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por cliente, marca o modelo..."
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
      </div>

      {/* 🔹 Tabla */}
      {vehiculosFiltrados.length === 0 ? (
        <p className="text-muted">No hay vehículos que coincidan con el filtro.</p>
      ) : (
        <table className="table table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Estado</th>
              <th>Tiempo de Mora</th>
              <th>Servicios Hechos</th>
              <th>Servicios Pendientes</th>
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
                    className="btn btn-sm btn-primary"
                    onClick={() => abrirDetalle(v)}
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔹 Modal de Detalle */}
      <div
        className="modal fade"
        id="detalleModal"
        tabIndex="-1"
        aria-labelledby="detalleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title" id="detalleModalLabel">
                Detalle del Vehículo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {vehiculoSeleccionado ? (
                <>
                  <h5 className="mb-3">
                    {vehiculoSeleccionado.marca} {vehiculoSeleccionado.modelo}{" "}
                    <span className="text-muted">({vehiculoSeleccionado.anho})</span>
                  </h5>
                  <p><strong>Cliente:</strong> {vehiculoSeleccionado.cliente_nombre}</p>
                  <p><strong>Estado actual:</strong> {vehiculoSeleccionado.estado}</p>
                  <p><strong>Servicios realizados:</strong> {vehiculoSeleccionado.servicios_hechos || 0}</p>
                  <p><strong>Servicios pendientes:</strong> {vehiculoSeleccionado.servicios_pendientes || 0}</p>
                  <p><strong>Tiempo de mora:</strong> {vehiculoSeleccionado.tiempo_mora || "Sin retraso"}</p>
                  <hr />
                  <p>
                    <strong>Observaciones:</strong>{" "}
                    {vehiculoSeleccionado.observaciones || "Sin observaciones registradas."}
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
                    window.open(`http://127.0.0.1:8000/api/vehiculos/pdf/${vehiculoSeleccionado.id}/`, "_blank");
                  }
                }}
              >
                <i className="bi bi-file-earmark-pdf-fill me-1"></i> Generar Reporte PDF
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehiculos;
