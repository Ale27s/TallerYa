import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [stats, setStats] = useState({
    clientes: 0,
    mecanicos: 0,
    citasHoy: 0,
    vehiculos: 0,
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
  axios.get("http://127.0.0.1:8000/api/auth/estadisticas/")
    .then((res) => setStats(res.data))
    .catch(() => console.log("Error al obtener estadísticas"));
}, []);

  return (
    <div className="dashboard-container mt-5">

      
      
      <div className="main-content d-flex">
       
        <div className="content-area p-4">
          <h3 className="mb-4">Panel General de TallerYa</h3>
          <p>Bienvenido, <strong>{user?.username}</strong> — Rol: <strong>{user?.rol}</strong></p>

          {/* 🔹 Sección de tarjetas */}
          <div className="row mt-4">
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 text-center stat-card">
                <div className="card-body">
                  <i className="bi bi-people-fill icon-stat text-primary"></i>
                  <h5 className="card-title">Clientes</h5>
                  <h2>{stats.clientes}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 text-center stat-card">
                <div className="card-body">
                  <i className="bi bi-person-workspace icon-stat text-success"></i>
                  <h5 className="card-title">Mecánicos</h5>
                  <h2>{stats.mecanicos}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 text-center stat-card">
                <div className="card-body">
                  <i className="bi bi-calendar-check-fill icon-stat text-warning"></i>
                  <h5 className="card-title">Citas de hoy</h5>
                  <h2>{stats.citasHoy}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 text-center stat-card">
                <div className="card-body">
                  <i className="bi bi-car-front-fill icon-stat text-danger"></i>
                  <h5 className="card-title">Vehículos en taller</h5>
                  <h2>{stats.vehiculos}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* 🔹 Área extra para contenido o gráficas futuras */}
          <div className="mt-5">
            <h5>Resumen</h5>
            <p>El sistema TallerYa centraliza las operaciones del taller: agendamiento, personal y vehículos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
