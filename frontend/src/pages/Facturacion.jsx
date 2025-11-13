import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Facturacion() {
  const [cliente, setCliente] = useState("");
  const [mecanico, setMecanico] = useState("");
  const [detalles, setDetalles] = useState([
    { descripcion: "", cantidad: 1, precio_unitario: 0 },
  ]);
  const [mensaje, setMensaje] = useState("");

  const agregarDetalle = () => {
    setDetalles([
      ...detalles,
      { descripcion: "", cantidad: 1, precio_unitario: 0 },
    ]);
  };

  const handleDetalleChange = (i, campo, valor) => {
    const nuevos = [...detalles];
    nuevos[i][campo] = valor;
    setDetalles(nuevos);
  };

  const calcularTotal = () =>
    detalles.reduce((acc, d) => acc + d.cantidad * d.precio_unitario, 0);

  const guardarFactura = async () => {
    const total = calcularTotal();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/facturacion/", {
        cliente,
        mecanico,
        total,
        estado: "PAGADO",
      });

      setMensaje(
        `✅ Factura creada: #${res.data.id} por Gs. ${total.toLocaleString()}`
      );
    } catch (err) {
      setMensaje("❌ Error al guardar la factura");
    }
  };

  return (
    <div className="content-wrapper-full">
      <div className="page-container-centered">
        
        {/* Título */}
        <h2 className="page-title">
          <i className="bi bi-file-earmark-text-fill me-2"></i>
          Gestión de Facturación
        </h2>

        <p className="page-subtitle">
          Registra nuevas facturas, calcula totales y administra cobros.
        </p>

        {/* Sección Cliente / Mecánico */}
        <div className="card mb-4">
          <div className="card-header fw-bold text-danger">
            <i className="bi bi-person-badge me-2"></i> Datos del Cliente y Mecánico
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Cliente (ID o nombre):</label>
                <input
                  className="form-control"
                  placeholder="Ej: Juan Pérez o 5"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Mecánico (ID o nombre):</label>
                <input
                  className="form-control"
                  placeholder="Ej: Pedro Gómez o 3"
                  value={mecanico}
                  onChange={(e) => setMecanico(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sección Detalles */}
        <div className="card mb-4">
          <div className="card-header fw-bold text-danger">
            <i className="bi bi-tools me-2"></i> Detalles de Servicios / Repuestos
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-dark table-striped align-middle">
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th style={{ width: "120px" }}>Cantidad</th>
                    <th style={{ width: "180px" }}>Precio Unitario (Gs.)</th>
                  </tr>
                </thead>

                <tbody>
                  {detalles.map((d, i) => (
                    <tr key={i}>
                      <td>
                        <input
                          className="form-control"
                          placeholder="Ej: Cambio de aceite"
                          value={d.descripcion}
                          onChange={(e) =>
                            handleDetalleChange(i, "descripcion", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={d.cantidad}
                          onChange={(e) =>
                            handleDetalleChange(
                              i,
                              "cantidad",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={d.precio_unitario}
                          onChange={(e) =>
                            handleDetalleChange(
                              i,
                              "precio_unitario",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <button className="btn btn-outline-danger" onClick={agregarDetalle}>
                <i className="bi bi-plus-circle me-2"></i> Agregar ítem
              </button>

              <h5 className="text-danger fw-bold">
                Total: Gs. {calcularTotal().toLocaleString()}
              </h5>
            </div>
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="text-center">
          <button
            className="btn btn-success px-4 fw-semibold shadow-sm"
            onClick={guardarFactura}
          >
            <i className="bi bi-save me-2"></i> Guardar Factura
          </button>
        </div>

        {/* Mensaje */}
        {mensaje && (
          <div className="alert alert-info mt-4 text-center shadow-sm">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}

export default Facturacion;
