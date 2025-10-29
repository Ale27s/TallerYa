import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import axios from "axios";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  // Cargar clientes desde el backend
  const cargarClientes = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/clientes/");
      setClientes(res.data);
    } catch (err) {
      console.error("Error al cargar clientes:", err);
    }
  };

  // Agregar cliente nuevo
  const agregarCliente = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/clientes/", {
        nombre,
        telefono,
        email,
      });
      setClientes([...clientes, res.data]);
      setNombre("");
      setTelefono("");
      setEmail("");
    } catch (err) {
      alert("Error al agregar cliente");
    }
  };

  // Eliminar cliente
  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/clientes/${id}/`);
      setClientes(clientes.filter((c) => c.id !== id));
    } catch {
      alert("No se pudo eliminar");
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
       

        <div className="container mt-4">
          <h3 className="mb-4">Gestión de Clientes</h3>

          {/* Formulario */}
          <form
            onSubmit={agregarCliente}
            className="border p-3 mb-4 bg-light rounded shadow-sm"
          >
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button className="btn btn-success mt-2 w-100">Agregar Cliente</button>
          </form>

          {/* Tabla */}
          <div className="table-responsive shadow-sm">
            <table className="table table-striped align-middle">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.nombre}</td>
                    <td>{c.telefono}</td>
                    <td>{c.email}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarCliente(c.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {clientes.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No hay clientes registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clientes;
