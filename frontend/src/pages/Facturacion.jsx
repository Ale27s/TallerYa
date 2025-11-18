import { useMemo, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Facturacion.css";

const formatDate = (date) => date.toISOString().split("T")[0];
const defaultDetail = { descripcion: "", cantidad: 1, precio_unitario: 0, descuento: 0 };

function Facturacion() {
  const today = useMemo(() => new Date(), []);
  const [invoiceMeta, setInvoiceMeta] = useState({
    creationDate: formatDate(today),
    rectificationNumber: "000001",
    invoiceToFix: "000001",
    invoiceNumber: "000005",
    billedDate: formatDate(today),
    ivaRate: 21,
    paymentMethod: "Transferencia",
    dueDate: formatDate(new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000)),
    rectificationReason: "",
    comments: "Prueba de sistema",
  });

  const [workshopData, setWorkshopData] = useState({
    brand: "Su logotipo aquí",
    taxId: "P9877658B",
    name: "TALLER DE EJEMPLO",
    address: "CALLE C/ LOCALIDAD",
    postalCode: "41008",
    city: "SEVILLA",
    province: "SEVILLA",
    phone: "111111111",
    fax: "111111112",
    mobile: "222222222",
    franchise: "Matriz SESALLECO TMCA FORD",
    mechanic: "",
  });

  const [clienteData, setClienteData] = useState({
    name: "",
    nif: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  const [vehiculoData, setVehiculoData] = useState({
    plate: "",
    model: "",
    km: "",
  });

  const [detalles, setDetalles] = useState([defaultDetail]);
  const [mensaje, setMensaje] = useState("");

  const handleInvoiceChange = (field, value) =>
    setInvoiceMeta((prev) => ({ ...prev, [field]: value }));

  const handleWorkshopChange = (field, value) =>
    setWorkshopData((prev) => ({ ...prev, [field]: value }));

  const handleClienteChange = (field, value) =>
    setClienteData((prev) => ({ ...prev, [field]: value }));

  const handleVehiculoChange = (field, value) =>
    setVehiculoData((prev) => ({ ...prev, [field]: value }));

  const agregarDetalle = () => {
    setDetalles((prev) => [...prev, { ...defaultDetail }]);
  };

  const handleDetalleChange = (i, campo, valor) => {
    const nuevos = [...detalles];
    nuevos[i][campo] = valor;
    setDetalles(nuevos);
  };

  const subtotal = useMemo(
    () =>
      detalles.reduce(
        (acc, d) =>
          acc + (Number(d.cantidad) || 0) * (Number(d.precio_unitario) || 0),
        0,
      ),
    [detalles],
  );

  const descuentoTotal = useMemo(
    () =>
      detalles.reduce(
        (acc, d) =>
          acc +
          (Number(d.cantidad) || 0) *
            (Number(d.precio_unitario) || 0) *
            ((Number(d.descuento) || 0) / 100),
        0,
      ),
    [detalles],
  );

  const baseImponible = subtotal - descuentoTotal;
  const ivaTotal = baseImponible * (invoiceMeta.ivaRate / 100);
  const totalFactura = baseImponible + ivaTotal;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(Number(value) || 0);

  const guardarFactura = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/facturacion/", {
        cliente: clienteData.name || "Cliente sin nombre",
        mecanico: workshopData.mechanic || "",
        total: totalFactura,
        estado: "PAGADO",
      });

      setMensaje(
        `✅ Factura creada: #${res.data.id} por ${formatCurrency(totalFactura)}`,
      );
    } catch (err) {
      console.error("Error al guardar la factura", err);
      setMensaje(
        "❌ No pudimos guardar la factura en el servidor, pero los datos quedaron listos",
      );
    }
  };

  return (
    <div className="content-wrapper-full">
      <div className="page-container-centered">
        <h2 className="page-title d-flex align-items-center gap-2">
          <i className="bi bi-receipt-cutoff"></i>
          Factura Rectificativa
        </h2>

        <p className="page-subtitle">
          Replica el formato del ejemplo, completa todos los datos del cliente y
          genera automáticamente los totales e impuestos.
        </p>

        <div className="invoice-layout">
          <div className="invoice-main">
            <div className="card invoice-card shadow-sm">
              <div className="card-body">
                <div className="invoice-header-row">
                  <div className="invoice-brand">
                    <div className="text-uppercase small text-muted">Su logotipo</div>
                    <input
                      className="form-control form-control-sm fw-bold text-uppercase"
                      value={workshopData.brand}
                      onChange={(e) => handleWorkshopChange("brand", e.target.value)}
                    />
                    <div className="mt-3">
                      <label className="text-uppercase small text-muted mb-1">
                        N° identificación fiscal
                      </label>
                      <input
                        className="form-control form-control-sm"
                        value={workshopData.taxId}
                        onChange={(e) => handleWorkshopChange("taxId", e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <input
                        className="form-control form-control-sm fw-semibold text-uppercase mb-2"
                        value={workshopData.name}
                        onChange={(e) => handleWorkshopChange("name", e.target.value)}
                      />
                      <input
                        className="form-control form-control-sm mb-2"
                        placeholder="Dirección"
                        value={workshopData.address}
                        onChange={(e) => handleWorkshopChange("address", e.target.value)}
                      />
                      <div className="row g-2">
                        <div className="col-6">
                          <input
                            className="form-control form-control-sm"
                            placeholder="CP"
                            value={workshopData.postalCode}
                            onChange={(e) =>
                              handleWorkshopChange("postalCode", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-6">
                          <input
                            className="form-control form-control-sm"
                            placeholder="Ciudad"
                            value={workshopData.city}
                            onChange={(e) => handleWorkshopChange("city", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row g-2 mt-2">
                        <div className="col-6">
                          <input
                            className="form-control form-control-sm"
                            placeholder="Provincia"
                            value={workshopData.province}
                            onChange={(e) =>
                              handleWorkshopChange("province", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-6">
                          <input
                            className="form-control form-control-sm"
                            placeholder="Mecánico responsable"
                            value={workshopData.mechanic}
                            onChange={(e) =>
                              handleWorkshopChange("mechanic", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="small text-muted mt-2">{workshopData.franchise}</div>
                    </div>
                  </div>

                  <div className="invoice-meta">
                    <div className="meta-title text-center">Factura Rectificativa</div>
                    <div className="meta-grid">
                      <div>
                        <label className="form-label">Fecha creación</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={invoiceMeta.creationDate}
                          onChange={(e) =>
                            handleInvoiceChange("creationDate", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="form-label">N° factura a rectificar</label>
                        <input
                          className="form-control form-control-sm"
                          value={invoiceMeta.invoiceToFix}
                          onChange={(e) =>
                            handleInvoiceChange("invoiceToFix", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="form-label">N° factura rectificativa</label>
                        <input
                          className="form-control form-control-sm"
                          value={invoiceMeta.rectificationNumber}
                          onChange={(e) =>
                            handleInvoiceChange("rectificationNumber", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="form-label">N° factura</label>
                        <input
                          className="form-control form-control-sm"
                          value={invoiceMeta.invoiceNumber}
                          onChange={(e) =>
                            handleInvoiceChange("invoiceNumber", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="form-label">Fecha facturada</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={invoiceMeta.billedDate}
                          onChange={(e) =>
                            handleInvoiceChange("billedDate", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="invoice-client-block">
                  <div className="card compact-card">
                    <div className="card-header text-bg-danger fw-semibold">
                      Datos del cliente
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-md-6">
                          <label className="form-label">Nombre o razón social</label>
                          <input
                            className="form-control form-control-sm"
                            value={clienteData.name}
                            onChange={(e) => handleClienteChange("name", e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">NIF/CIF</label>
                          <input
                            className="form-control form-control-sm"
                            value={clienteData.nif}
                            onChange={(e) => handleClienteChange("nif", e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Teléfono</label>
                          <input
                            className="form-control form-control-sm"
                            value={clienteData.phone}
                            onChange={(e) => handleClienteChange("phone", e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Correo electrónico</label>
                          <input
                            type="email"
                            className="form-control form-control-sm"
                            value={clienteData.email}
                            onChange={(e) => handleClienteChange("email", e.target.value)}
                          />
                        </div>
                        <div className="col-md-8">
                          <label className="form-label">Dirección</label>
                          <input
                            className="form-control form-control-sm"
                            value={clienteData.address}
                            onChange={(e) =>
                              handleClienteChange("address", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Código postal</label>
                          <input
                            className="form-control form-control-sm"
                            value={clienteData.postalCode}
                            onChange={(e) =>
                              handleClienteChange("postalCode", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Ciudad</label>
                          <input
                            className="form-control form-control-sm"
                            value={clienteData.city}
                            onChange={(e) => handleClienteChange("city", e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Provincia</label>
                          <input
                            className="form-control form-control-sm"
                            value={clienteData.province}
                            onChange={(e) => handleClienteChange("province", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card compact-card">
                    <div className="card-header text-bg-secondary fw-semibold">
                      Datos del vehículo
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-md-6">
                          <label className="form-label">Matrícula</label>
                          <input
                            className="form-control form-control-sm"
                            value={vehiculoData.plate}
                            onChange={(e) => handleVehiculoChange("plate", e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Kilometraje</label>
                          <input
                            className="form-control form-control-sm"
                            value={vehiculoData.km}
                            onChange={(e) => handleVehiculoChange("km", e.target.value)}
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Marca / Modelo</label>
                          <input
                            className="form-control form-control-sm"
                            value={vehiculoData.model}
                            onChange={(e) => handleVehiculoChange("model", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="invoice-table-wrapper mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="table-title">Detalle de línea</div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={agregarDetalle}
                    >
                      <i className="bi bi-plus-circle me-1"></i>
                      Agregar concepto
                    </button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped align-middle invoice-table">
                      <thead>
                        <tr>
                          <th style={{ width: "90px" }}>Cantidad</th>
                          <th>Concepto / Descripción</th>
                          <th style={{ width: "140px" }}>Precio base</th>
                          <th style={{ width: "120px" }}>Descuento (%)</th>
                          <th style={{ width: "140px" }}>Importe línea</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detalles.map((d, i) => {
                          const lineaBruta =
                            (Number(d.cantidad) || 0) *
                            (Number(d.precio_unitario) || 0);
                          const lineaDescuento =
                            lineaBruta * ((Number(d.descuento) || 0) / 100);
                          const lineaNeta = lineaBruta - lineaDescuento;

                          return (
                            <tr key={i}>
                              <td>
                                <input
                                  type="number"
                                  min="0"
                                  className="form-control form-control-sm"
                                  value={d.cantidad}
                                  onChange={(e) =>
                                    handleDetalleChange(
                                      i,
                                      "cantidad",
                                      Number(e.target.value),
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control form-control-sm"
                                  placeholder="Cambio de aceite, disco de freno, etc."
                                  value={d.descripcion}
                                  onChange={(e) =>
                                    handleDetalleChange(
                                      i,
                                      "descripcion",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  min="0"
                                  className="form-control form-control-sm"
                                  value={d.precio_unitario}
                                  onChange={(e) =>
                                    handleDetalleChange(
                                      i,
                                      "precio_unitario",
                                      Number(e.target.value),
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  min="0"
                                  className="form-control form-control-sm"
                                  value={d.descuento}
                                  onChange={(e) =>
                                    handleDetalleChange(
                                      i,
                                      "descuento",
                                      Number(e.target.value),
                                    )
                                  }
                                />
                              </td>
                              <td className="fw-semibold">{formatCurrency(lineaNeta)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row g-3 align-items-stretch mt-3">
                  <div className="col-lg-8">
                    <div className="card bg-light border-0 h-100 invoice-remarks">
                      <div className="card-body">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">
                              Motivos de la rectificación
                            </label>
                            <textarea
                              rows="3"
                              className="form-control"
                              placeholder="Describe el motivo de la rectificación"
                              value={invoiceMeta.rectificationReason}
                              onChange={(e) =>
                                handleInvoiceChange(
                                  "rectificationReason",
                                  e.target.value,
                                )
                              }
                            ></textarea>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Observaciones</label>
                            <textarea
                              rows="3"
                              className="form-control"
                              placeholder="Incluye cualquier nota relevante"
                              value={invoiceMeta.comments}
                              onChange={(e) =>
                                handleInvoiceChange("comments", e.target.value)
                              }
                            ></textarea>
                            <div className="small text-muted mt-2">
                              Estos textos se mostrarán en la factura final, tal como
                              en el ejemplo.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="card h-100 invoice-summary">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-semibold">Base imponible</span>
                          <span className="fw-bold">{formatCurrency(baseImponible)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-semibold">Descuento aplicado</span>
                          <span>{formatCurrency(descuentoTotal)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-semibold">IVA {invoiceMeta.ivaRate}%</span>
                          <span>{formatCurrency(ivaTotal)}</span>
                        </div>
                        <div className="separator my-3"></div>
                        <div className="d-flex justify-content-between align-items-center total-box">
                          <span>Total factura</span>
                          <span className="fs-5 fw-bold text-danger">
                            {formatCurrency(totalFactura)}
                          </span>
                        </div>
                        <div className="mt-3">
                          <label className="form-label">Forma de pago</label>
                          <input
                            className="form-control form-control-sm"
                            value={invoiceMeta.paymentMethod}
                            onChange={(e) =>
                              handleInvoiceChange("paymentMethod", e.target.value)
                            }
                          />
                          <label className="form-label mt-2">Fecha de vencimiento</label>
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            value={invoiceMeta.dueDate}
                            onChange={(e) =>
                              handleInvoiceChange("dueDate", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-3 mt-4">
                  <button className="btn btn-danger" onClick={guardarFactura}>
                    <i className="bi bi-save me-2"></i>Guardar factura con estos datos
                  </button>
                  <div className="alert alert-secondary mb-0">
                    El botón guarda la factura en el backend si está disponible. Si no,
                    los datos quedan listos para descargarlos o imprimirlos siguiendo
                    el diseño mostrado.
                  </div>
                </div>

                {mensaje && (
                  <div className="alert alert-info mt-3 text-center shadow-sm">
                    {mensaje}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facturacion;
