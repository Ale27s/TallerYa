import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

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
      setMensaje(`Factura creada: #${res.data.id} por Gs. ${total}`);
    } catch (err) {
      setMensaje("Error al guardar la factura");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <div className="page-container animate__animated animate__fadeIn">
          <h2 className="page-title">
            <i className="bi bi-receipt-cutoff me-2 text-danger"></i>Gestión de
            Facturación
          </h2>
          <p className="page-subtitle">
            Registra nuevas facturas, calcula totales y administra cobros.
          </p>

          {/* Formulario de cabecera */}
          <div className="card p-4 shadow-sm border-0 mb-4">
            <h5 className="fw-bold text-danger mb-3">
              <i className="bi bi-person-lines-fill me-2"></i>Datos del Cliente y Mecánico
            </h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Cliente (ID o nombre):</label>
                <input
                  className="form-control"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Ej: Juan Pérez o 5"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Mecánico (ID o nombre):</label>
                <input
                  className="form-control"
                  value={mecanico}
                  onChange={(e) => setMecanico(e.target.value)}
                  placeholder="Ej: Pedro Gómez o 3"
                  required
                />
              </div>
            </div>
          </div>

          {/* Detalle de factura */}
          <div className="card p-4 shadow-sm border-0 mb-4">
            <h5 className="fw-bold text-danger mb-3">
              <i className="bi bi-cart-check-fill me-2"></i>Detalles de Servicios / Repuestos
            </h5>

            <table className="table align-middle table-hover table-bordered">
              <thead className="table-dark text-center">
                <tr>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario (Gs.)</th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((d, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        className="form-control"
                        value={d.descripcion}
                        onChange={(e) =>
                          handleDetalleChange(i, "descripcion", e.target.value)
                        }
                        placeholder="Ej: Cambio de aceite"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control text-center"
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
                        className="form-control text-end"
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

            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-outline-danger"
                onClick={agregarDetalle}
              >
                <i className="bi bi-plus-circle me-1"></i> Agregar Ítem
              </button>
              <h5 className="text-danger fw-bold">
                Total: Gs. {calcularTotal().toLocaleString()}
              </h5>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="text-center">
            <button className="btn btn-success px-5" onClick={guardarFactura}>
              <i className="bi bi-save2 me-2"></i>Guardar Factura
            </button>
          </div>

          {/* Mensaje */}
          {mensaje && (
            <div className="alert alert-info mt-4 text-center">{mensaje}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Facturacion;
