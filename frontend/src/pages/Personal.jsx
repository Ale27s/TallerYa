
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Personal() {
  const [personal, setPersonal] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchPersonal = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/auth/personal/", { withCredentials: true });
      setPersonal(res.data);
    } catch (err) {
      console.error("Error al obtener personal");
    }
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      await axios.delete(`http://127.0.0.1:8000/api/auth/personal/${id}/`, { withCredentials: true });
      fetchPersonal();
    }
  };

  useEffect(() => {
    fetchPersonal();
  }, []);

  return (
    <div className="dashboard-container">

      <div className="main-content d-flex">
        <Sidebar user={user} />
        <div className="content-area p-4">
          <h3 className="mb-4">Gestión de Personal</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {personal.map((p) => (
                <tr key={p.id}>
                  <td>{p.username}</td>
                  <td>{p.email}</td>
                  <td>{p.rol}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(p.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Personal;
