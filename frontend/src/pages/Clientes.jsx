import { useEffect, useState } from "react";
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
        <div className="page-container animate__animated animate__fadeIn">
          <h2 className="page-title">
            <i className="bi bi-people-fill me-2 text-danger"></i>Gestión de Clientes
          </h2>
          <p className="page-subtitle">
            Administra los clientes registrados en el sistema TallerYa.
          </p>

          {/* Formulario */}
          <div className="card shadow-sm border-0 mb-4 p-4">
            <h5 className="text-danger fw-bold mb-3">
              <i className="bi bi-person-plus-fill me-2"></i>Nuevo Cliente
            </h5>
            <form onSubmit={agregarCliente}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button className="btn btn-danger w-100 mt-2">
                <i className="bi bi-save2-fill me-2"></i>Agregar Cliente
              </button>
            </form>
          </div>

          {/* Tabla */}
          <div className="card shadow-sm border-0 p-3">
            <h5 className="fw-bold text-danger mb-3">
              <i className="bi bi-list-ul me-2"></i>Listado de Clientes
            </h5>

            <div className="table-responsive">
              <table className="table align-middle table-hover">
                <thead className="table-dark text-center">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {clientes.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.nombre}</td>
                      <td>{c.telefono}</td>
                      <td>{c.email}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => eliminarCliente(c.id)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {clientes.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-muted">
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
    </div>
  );
}

export default Clientes;
