import { useEffect, useState } from "react";
import axios from "axios";

function Personal() {
  const [personal, setPersonal] = useState([]);
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("MECANICO");
  const [mensaje, setMensaje] = useState("");

  const cargarPersonal = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/usuarios/");
      setPersonal(res.data);
    } catch {
      setMensaje("Error al cargar personal");
    }
  };

  const agregarPersonal = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/usuarios/", {
        username: nombre,
        rol,
      });
      setPersonal([...personal, res.data]);
      setNombre("");
      setRol("MECANICO");
      setMensaje("Empleado agregado correctamente");
    } catch {
      setMensaje("Error al agregar empleado");
    }
  };

  const eliminarPersonal = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/usuarios/${id}/`);
      setPersonal(personal.filter((p) => p.id !== id));
    } catch {
      setMensaje("Error al eliminar");
    }
  };

  useEffect(() => {
    cargarPersonal();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <div className="page-container animate__animated animate__fadeIn">
          <h2 className="page-title">
            <i className="bi bi-person-workspace me-2 text-danger"></i>Gestión del Personal
          </h2>
          <p className="page-subtitle">
            Agregá, visualizá y administrá el personal del taller.
          </p>

          <div className="card p-4 mb-4 shadow-sm border-0">
            <h5 className="text-danger mb-3">
              <i className="bi bi-person-plus-fill me-2"></i>Nuevo Empleado
            </h5>
            <form onSubmit={agregarPersonal}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    placeholder="Nombre de usuario"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <select
                    className="form-select"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value="JEFE">Jefe</option>
                    <option value="GERENTE">Gerente</option>
                    <option value="MECANICO">Mecánico</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-danger w-100">
                    <i className="bi bi-save2 me-2"></i>Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="card p-4 shadow-sm border-0">
            <h5 className="text-danger mb-3">
              <i className="bi bi-people-fill me-2"></i>Lista del Personal
            </h5>

            <table className="table align-middle table-hover table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personal.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.username}</td>
                    <td>{p.rol}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => eliminarPersonal(p.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {personal.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-muted">
                      No hay personal registrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {mensaje && (
            <div className="alert alert-info mt-3 text-center">{mensaje}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Personal;
