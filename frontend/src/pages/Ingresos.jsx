import { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Ingresos.css";

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(Number(value) || 0);

const estadosIngreso = [
  { value: "COBRADO", label: "Cobrado" },
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "SENIADO", label: "Señado" },
];

const registroBase = {
  fecha: new Date().toISOString().slice(0, 10),
  cliente: "",
  contacto: "",
  vehiculo: "",
  placa: "",
  trabajo: "",
  costo: "",
  estado: "COBRADO",
  notas: "",
};

function Ingresos() {
  const [nuevoIngreso, setNuevoIngreso] = useState(registroBase);
  const [ingresos, setIngresos] = useState([
    {
      id: 1,
      fecha: new Date().toISOString().slice(0, 10),
      cliente: "Juan Pérez",
      contacto: "261-555-1234",
      vehiculo: "Ford Focus",
      placa: "AA123BB",
      trabajo: "Cambio de pastillas y rectificación de discos",
      costo: 85000,
      estado: "COBRADO",
      notas: "Pagó en efectivo",
    },
    {
      id: 2,
      fecha: new Date().toISOString().slice(0, 10),
      cliente: "Ana Gómez",
      contacto: "",
      vehiculo: "Toyota Corolla",
      placa: "AC987CD",
      trabajo: "Servicio completo + escaneo",
      costo: 120000,
      estado: "PENDIENTE",
      notas: "Retira mañana, pago transferencia",
    },
  ]);

  const totalCobrado = useMemo(
    () => ingresos.filter((i) => i.estado === "COBRADO").reduce((acc, i) => acc + Number(i.costo || 0), 0),
    [ingresos],
  );

  const totalPendiente = useMemo(
    () => ingresos.filter((i) => i.estado !== "COBRADO").reduce((acc, i) => acc + Number(i.costo || 0), 0),
    [ingresos],
  );

  const totalGeneral = useMemo(
    () => ingresos.reduce((acc, i) => acc + Number(i.costo || 0), 0),
    [ingresos],
  );

  const handleChange = (campo, valor) => {
    setNuevoIngreso((prev) => ({ ...prev, [campo]: valor }));
  };

  const registrarIngreso = (e) => {
    e.preventDefault();
    if (!nuevoIngreso.placa || !nuevoIngreso.trabajo || !nuevoIngreso.costo) {
      alert("Completá la patente, el trabajo realizado y el monto cobrado.");
      return;
    }

    const ingreso = {
      ...nuevoIngreso,
      id: Date.now(),
      costo: Number(nuevoIngreso.costo),
    };

    setIngresos((prev) => [ingreso, ...prev]);
    setNuevoIngreso(registroBase);
  };

  const ingresosRecientes = useMemo(() => ingresos.slice(0, 4), [ingresos]);

  return (
    <div className="content-wrapper ingresos-page">
      <div className="page-container">
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="icon-circle bg-danger-subtle text-danger">
            <i className="bi bi-clipboard2-check"></i>
          </span>
          <div>
            <h2 className="page-title mb-1">Registro de Ingresos</h2>
            <p className="mb-0 text-muted">
              Cargá lo que se realizó a cada vehículo y cuánto se cobró en el momento.
            </p>
          </div>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5">
            <div className="card shadow-sm h-100 border-0 ingreso-form-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 fw-semibold">Nuevo ingreso</h5>
                  <span className="badge bg-danger-subtle text-danger">Arreglos del día</span>
                </div>

                <form className="vstack gap-3" onSubmit={registrarIngreso}>
                  <div className="row g-3">
                    <div className="col-6">
                      <label className="form-label small text-muted">Fecha</label>
                      <input
                        type="date"
                        className="form-control"
                        value={nuevoIngreso.fecha}
                        onChange={(e) => handleChange("fecha", e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small text-muted">Estado</label>
                      <select
                        className="form-select"
                        value={nuevoIngreso.estado}
                        onChange={(e) => handleChange("estado", e.target.value)}
                      >
                        {estadosIngreso.map((estado) => (
                          <option key={estado.value} value={estado.value}>
                            {estado.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label small text-muted">Cliente</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre y apellido"
                      value={nuevoIngreso.cliente}
                      onChange={(e) => handleChange("cliente", e.target.value)}
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small text-muted">Contacto</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="WhatsApp o teléfono"
                        value={nuevoIngreso.contacto}
                        onChange={(e) => handleChange("contacto", e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted">Vehículo</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Marca y modelo"
                        value={nuevoIngreso.vehiculo}
                        onChange={(e) => handleChange("vehiculo", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small text-muted">Patente *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="AA123BB"
                        value={nuevoIngreso.placa}
                        onChange={(e) => handleChange("placa", e.target.value.toUpperCase())}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted">Monto cobrado *</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          placeholder="0.00"
                          value={nuevoIngreso.costo}
                          onChange={(e) => handleChange("costo", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="form-label small text-muted">Trabajo realizado *</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Ej: cambio de bujías, escaneo, limpieza de inyectores"
                      value={nuevoIngreso.trabajo}
                      onChange={(e) => handleChange("trabajo", e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="form-label small text-muted">Notas internas</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Garantía, repuestos usados, forma de pago..."
                      value={nuevoIngreso.notas}
                      onChange={(e) => handleChange("notas", e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-danger w-100 shadow-sm">
                    <i className="bi bi-plus-circle me-2"></i>Registrar ingreso
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <div className="stat-card bg-danger text-white shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="small text-white-50 mb-1">Total cobrado</p>
                      <h4 className="mb-0">{formatCurrency(totalCobrado)}</h4>
                    </div>
                    <span className="icon-circle bg-white text-danger">
                      <i className="bi bi-cash-coin"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-card shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="small text-muted mb-1">Pendiente</p>
                      <h5 className="mb-0">{formatCurrency(totalPendiente)}</h5>
                    </div>
                    <span className="icon-circle bg-danger-subtle text-danger">
                      <i className="bi bi-hourglass-split"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-card shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="small text-muted mb-1">Ingresos totales</p>
                      <h5 className="mb-0">{formatCurrency(totalGeneral)}</h5>
                    </div>
                    <span className="icon-circle bg-danger-subtle text-danger">
                      <i className="bi bi-graph-up"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">Ingresos cargados</h5>
                  <span className="badge bg-secondary-subtle text-secondary">
                    {ingresos.length} mov.
                  </span>
                </div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr className="text-muted small">
                        <th>Fecha</th>
                        <th>Patente</th>
                        <th>Trabajo</th>
                        <th>Monto</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingresos.map((item) => (
                        <tr key={item.id}>
                          <td className="text-nowrap">{item.fecha}</td>
                          <td className="fw-semibold">{item.placa || "-"}</td>
                          <td>
                            <div className="fw-semibold">{item.vehiculo || "Vehículo sin especificar"}</div>
                            <div className="text-muted small">{item.trabajo}</div>
                          </td>
                          <td className="fw-semibold">{formatCurrency(item.costo)}</td>
                          <td>
                            <span
                              className={`badge rounded-pill ${
                                item.estado === "COBRADO"
                                  ? "bg-success-subtle text-success"
                                  : item.estado === "PENDIENTE"
                                    ? "bg-warning-subtle text-warning"
                                    : "bg-info-subtle text-info"
                              }`}
                            >
                              {item.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-uppercase text-muted small">Resumen rápido</h6>
                  <span className="badge bg-danger text-white">Últimos ingresos</span>
                </div>
                <div className="row g-3">
                  {ingresosRecientes.map((item) => (
                    <div className="col-md-6" key={item.id}>
                      <div className="mini-card h-100">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="small text-muted mb-1">{item.fecha}</p>
                            <h6 className="mb-1">{item.placa}</h6>
                            <p className="mb-1 fw-semibold">{item.trabajo}</p>
                            <p className="text-muted small mb-0">
                              {item.cliente || "Cliente sin nombre"}
                              {item.vehiculo && ` • ${item.vehiculo}`}
                            </p>
                          </div>
                          <div className="text-end">
                            <p className="fw-bold mb-1">{formatCurrency(item.costo)}</p>
                            <span
                              className={`badge ${
                                item.estado === "COBRADO"
                                  ? "bg-success-subtle text-success"
                                  : item.estado === "PENDIENTE"
                                    ? "bg-warning-subtle text-warning"
                                    : "bg-info-subtle text-info"
                              }`}
                            >
                              {item.estado}
                            </span>
                          </div>
                        </div>
                        {item.notas && (
                          <p className="text-muted small mt-2 mb-0">
                            <i className="bi bi-journal-text me-1"></i>
                            {item.notas}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ingresos;
