import { useState } from "react";
import axios from "axios";

function Facturacion() {
  const [cliente, setCliente] = useState("");
  const [mecanico, setMecanico] = useState("");
  const [detalles, setDetalles] = useState([{ descripcion: "", cantidad: 1, precio_unitario: 0 }]);
  const [mensaje, setMensaje] = useState("");

  const agregarDetalle = () => {
    setDetalles([...detalles, { descripcion: "", cantidad: 1, precio_unitario: 0 }]);
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
    <div className="container mt-5 col-md-8">
      <h3 className="mb-3">💵 Nueva Factura</h3>
      <div className="mb-3">
        <label>Cliente (ID):</label>
        <input className="form-control" value={cliente} onChange={(e) => setCliente(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Mecánico (ID):</label>
        <input className="form-control" value={mecanico} onChange={(e) => setMecanico(e.target.value)} />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr><th>Descripción</th><th>Cant.</th><th>Precio</th></tr>
        </thead>
        <tbody>
          {detalles.map((d, i) => (
            <tr key={i}>
              <td><input className="form-control" value={d.descripcion} onChange={(e) => handleDetalleChange(i, "descripcion", e.target.value)} /></td>
              <td><input type="number" className="form-control" value={d.cantidad} onChange={(e) => handleDetalleChange(i, "cantidad", parseInt(e.target.value))} /></td>
              <td><input type="number" className="form-control" value={d.precio_unitario} onChange={(e) => handleDetalleChange(i, "precio_unitario", parseFloat(e.target.value))} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-secondary me-2" onClick={agregarDetalle}>+ Agregar ítem</button>
      <button className="btn btn-success" onClick={guardarFactura}>💾 Guardar Factura</button>

      <div className="alert alert-info mt-3">{mensaje}</div>
      <h4 className="mt-3">Total: Gs. {calcularTotal().toLocaleString()}</h4>
    </div>
  );
}

export default Facturacion;
