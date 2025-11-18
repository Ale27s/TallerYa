import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000/api/clientes";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");

  const cargarClientes = async () => {
    try {
      const res = await axios.get(`${API}/`);
      setClientes(res.data);
    } catch (err) {
      console.error("Error al cargar clientes:", err);
    }
  };

  const agregarCliente = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/`, {
        nombre,
        telefono,
        email,
        identificacion,
        direccion,
        ciudad,
      });
      setClientes([...clientes, res.data]);
      setNombre("");
      setTelefono("");
      setEmail("");
      setIdentificacion("");
      setDireccion("");
      setCiudad("");
    } catch {
      alert("Error al agregar cliente");
    }
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`${API}/${id}/`);
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
      <div className="main-content flex-grow-1">
        <div className="page-container">

          <h2 className="page-title">
            <i className="bi bi-people-fill me-2 text-danger"></i>
            Gestión de Clientes
          </h2>

          <div className="card mb-4 p-4">
            <form onSubmit={agregarCliente}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <input
                    className="form-control"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    className="form-control"
                    placeholder="Documento / NIT"
                    value={identificacion}
                    onChange={(e) => setIdentificacion(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    className="form-control"
                    placeholder="Correo electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <input
                    className="form-control"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    className="form-control"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    className="form-control"
                    placeholder="Ciudad"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="btn btn-danger w-100">
                <i className="bi bi-save2-fill me-2"></i>Agregar Cliente
              </button>
            </form>
          </div>

          <div className="card p-3">
            <h5 className="fw-bold text-danger mb-3">
              <i className="bi bi-list-ul me-2"></i>Listado de Clientes
            </h5>

            <table className="table text-center table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Documento / NIT</th>
                  <th>Ciudad</th>
                  <th>Dirección</th>
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
                    <td>{c.identificacion}</td>
                    <td>{c.ciudad}</td>
                    <td>{c.direccion}</td>
                    <td>{c.telefono}</td>
                    <td>{c.email}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => eliminarCliente(c.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}

                {clientes.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-muted">
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
