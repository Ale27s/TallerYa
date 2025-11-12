import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Citas() {
  const [citas, setCitas] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODAS");
  const [mensaje, setMensaje] = useState("");
  const [modalData, setModalData] = useState({
    id: null,
    cliente: "",
    servicio: "",
    fecha: "",
    hora: "",
    estado: "PENDIENTE",
  });

  // 🔹 Cargar citas desde backend
  const cargarCitas = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/citas/");
      const eventos = res.data.map((cita) => ({
        id: cita.id,
        title: `${cita.cliente_nombre} - ${cita.servicio}`,
        start: cita.fecha,
        end: cita.hora_fin || cita.fecha,
        estado: cita.estado,
        backgroundColor:
          cita.estado === "CONFIRMADA"
            ? "#28a745"
            : cita.estado === "CANCELADA"
            ? "#6c757d"
            : "#ffc107",
        borderColor: "#c70000",
        textColor: "#fff",
      }));
      setCitas(eventos);
    } catch (err) {
      console.error("Error al cargar citas:", err);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  // 🔹 Filtro de citas
  const citasFiltradas = citas.filter((c) => {
    const coincideCliente =
      !filtroCliente ||
      c.title.toLowerCase().includes(filtroCliente.toLowerCase());
    const coincideEstado =
      filtroEstado === "TODAS" || c.estado === filtroEstado;
    return coincideCliente && coincideEstado;
  });

  // 🔹 Nueva cita
  const abrirModalNueva = (info) => {
    setModalData({
      id: null,
      cliente: "",
      servicio: "",
      fecha: info.dateStr,
      hora: "",
      estado: "PENDIENTE",
    });
    const modal = new window.bootstrap.Modal(
      document.getElementById("modalCita")
    );
    modal.show();
  };

  // 🔹 Editar cita
  const abrirModalEditar = (clickInfo) => {
    const evento = clickInfo.event;
    setModalData({
      id: evento.id,
      cliente: evento.title.split(" - ")[0],
      servicio: evento.title.split(" - ")[1],
      fecha: evento.startStr.split("T")[0],
      hora: evento.startStr.split("T")[1]?.substring(0, 5) || "",
      estado: evento.extendedProps.estado || "PENDIENTE",
    });
    const modal = new window.bootstrap.Modal(
      document.getElementById("modalCita")
    );
    modal.show();
  };

  // 🔹 Guardar cita
  const guardarCita = async (e) => {
    e.preventDefault();
    try {
      if (modalData.id) {
        await axios.put(
          `http://127.0.0.1:8000/api/citas/${modalData.id}/`,
          modalData
        );
        setMensaje("✅ Cita actualizada correctamente");
      } else {
        await axios.post("http://127.0.0.1:8000/api/citas/", modalData);
        setMensaje("✅ Cita creada correctamente");
      }
      cargarCitas();
      window.bootstrap.Modal.getInstance(
        document.getElementById("modalCita")
      ).hide();
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al guardar la cita");
    }
  };

  // 🔹 Eliminar cita
  const eliminarCita = async () => {
    if (window.confirm("¿Deseas eliminar esta cita?")) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/citas/${modalData.id}/`
        );
        setMensaje("🗑️ Cita eliminada correctamente");
        cargarCitas();
        window.bootstrap.Modal.getInstance(
          document.getElementById("modalCita")
        ).hide();
      } catch {
        setMensaje("❌ No se pudo eliminar la cita");
      }
    }
  };

  return (
    <div className="calendar-fullscreen">
      {/* Barra superior sticky */}
      <div className="calendar-toolbar sticky-top shadow-sm p-3 mb-3">
        <h4 className="fw-bold text-danger mb-0">
          <i className="bi bi-calendar3 me-2"></i>Gestión de Citas
        </h4>

        <div className="toolbar-filters mt-3 d-flex flex-wrap gap-3">
          <input
            type="text"
            className="form-control flex-grow-1"
            placeholder="Buscar por cliente o servicio..."
            value={filtroCliente}
            onChange={(e) => setFiltroCliente(e.target.value)}
          />
          <select
            className="form-select w-auto"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="TODAS">Todas las citas</option>
            <option value="PENDIENTE">Pendientes</option>
            <option value="CONFIRMADA">Confirmadas</option>
            <option value="CANCELADA">Canceladas</option>
          </select>
          <button
            className="btn btn-danger"
            onClick={() =>
              abrirModalNueva({ dateStr: new Date().toISOString().split("T")[0] })
            }
          >
            <i className="bi bi-plus-circle me-1"></i> Nueva Cita
          </button>
        </div>
      </div>

      {/* Calendario principal */}
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="es"
          selectable={true}
          dateClick={abrirModalNueva}
          eventClick={abrirModalEditar}
          events={citasFiltradas}
          height="calc(100vh - 220px)"
          expandRows={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
        />
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="modalCita"
        tabIndex="-1"
        aria-labelledby="modalCitaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title" id="modalCitaLabel">
                {modalData.id ? "Editar Cita" : "Nueva Cita"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={guardarCita}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    value={modalData.cliente}
                    onChange={(e) =>
                      setModalData({ ...modalData, cliente: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Servicio</label>
                  <input
                    type="text"
                    className="form-control"
                    value={modalData.servicio}
                    onChange={(e) =>
                      setModalData({ ...modalData, servicio: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      value={modalData.fecha}
                      onChange={(e) =>
                        setModalData({ ...modalData, fecha: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Hora</label>
                    <input
                      type="time"
                      className="form-control"
                      value={modalData.hora}
                      onChange={(e) =>
                        setModalData({ ...modalData, hora: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select
                    className="form-select"
                    value={modalData.estado}
                    onChange={(e) =>
                      setModalData({ ...modalData, estado: e.target.value })
                    }
                  >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="CONFIRMADA">Confirmada</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                {modalData.id && (
                  <button
                    type="button"
                    className="btn btn-outline-danger me-auto"
                    onClick={eliminarCita}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-success">
                  💾 Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Citas;
