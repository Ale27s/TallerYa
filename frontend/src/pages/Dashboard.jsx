import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({
    clientes: 0,
    mecanicos: 0,
    citasHoy: 0,
    vehiculos: 0,
    ingresos: { semana: 0, mes: 0, anio: 0 },
    pagos: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get("http://127.0.0.1:8000/api/auth/estadisticas/", { headers })
      .then((res) => setStats(res.data))
      .catch(() => console.log("Error al obtener estadísticas"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 🔹 Datos del gráfico
  const chartData = [
    { name: "Clientes", cantidad: stats.clientes },
    { name: "Mecánicos", cantidad: stats.mecanicos },
    { name: "Citas de hoy", cantidad: stats.citasHoy },
    { name: "Vehículos", cantidad: stats.vehiculos },
  ];

  const ingresos = stats.ingresos || {};

  const formatCurrency = (valor) =>
    new Intl.NumberFormat("es-PY", {
      style: "currency",
      currency: "PYG",
      minimumFractionDigits: 0,
    }).format(valor || 0);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 🔹 Colores dinámicos según valor
  const getBarColor = (valor) => {
    if (valor >= 10) return "#28a745"; // Verde
    if (valor >= 5) return "#ffc107"; // Amarillo
    return "#c70000"; // Rojo
  };

  return (
    <div className="dashboard-container animate__animated animate__fadeIn">
      <div className="main-content p-4">
        {/* 🔹 Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-danger mb-0">
              <i className="bi bi-speedometer2 me-2"></i>Panel de Control
            </h2>
            <p className="text-muted mb-0">
              Bienvenido, <strong>{user?.username}</strong> — Rol:{" "}
              <strong className="text-uppercase">{user?.rol}</strong>
            </p>
          </div>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i>Salir
          </button>
        </div>

        {/* 🔹 Tarjetas de estadísticas */}
        <div className="row g-3">
          <div className="col-md-3">
            <div className="card stat-card text-center shadow border-0">
              <div className="card-body">
                <i className="bi bi-people-fill fs-1 text-primary mb-2"></i>
                <h5>Clientes</h5>
                <h3 className="fw-bold">{stats.clientes}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card stat-card text-center shadow border-0">
              <div className="card-body">
                <i className="bi bi-person-workspace fs-1 text-success mb-2"></i>
                <h5>Mecánicos</h5>
                <h3 className="fw-bold">{stats.mecanicos}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card stat-card text-center shadow border-0">
              <div className="card-body">
                <i className="bi bi-calendar-check-fill fs-1 text-warning mb-2"></i>
                <h5>Citas de hoy</h5>
                <h3 className="fw-bold">{stats.citasHoy}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card stat-card text-center shadow border-0">
              <div className="card-body">
                <i className="bi bi-car-front-fill fs-1 text-danger mb-2"></i>
                <h5>Vehículos</h5>
                <h3 className="fw-bold">{stats.vehiculos}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Ingresos de la semana/mes/año */}
        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <div className="card stat-card shadow border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-cash-stack fs-3 text-success me-2"></i>
                  <h6 className="mb-0">Ingresos de la semana</h6>
                </div>
                <p className="text-muted mb-1">Semana en curso</p>
                <h4 className="fw-bold mb-0">{formatCurrency(ingresos.semana)}</h4>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card stat-card shadow border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-calendar-event fs-3 text-info me-2"></i>
                  <h6 className="mb-0">Ingresos del mes</h6>
                </div>
                <p className="text-muted mb-1">Acumulado mensual</p>
                <h4 className="fw-bold mb-0">{formatCurrency(ingresos.mes)}</h4>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card stat-card shadow border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-calendar-check fs-3 text-danger me-2"></i>
                  <h6 className="mb-0">Ingresos del año</h6>
                </div>
                <p className="text-muted mb-1">Total anual</p>
                <h4 className="fw-bold mb-0">{formatCurrency(ingresos.anio)}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Resumen general */}
        <div className="mt-5">
          <h4 className="fw-bold text-danger mb-3">
            <i className="bi bi-clipboard-data me-2"></i>Resumen General
          </h4>
          <div className="card shadow-sm border-0 p-3 bg-light-subtle">
            <p className="mb-0">
              <strong>TallerYa</strong> centraliza todas las operaciones del taller:
              control de clientes, gestión de personal, citas y vehículos.
              Este panel muestra el desempeño general del taller en tiempo real.
            </p>
          </div>
        </div>

        {/* 🔹 Pagos recientes */}
        <div className="mt-5">
          <h4 className="fw-bold text-danger mb-3">
            <i className="bi bi-credit-card-2-front me-2"></i>Pagos registrados
          </h4>
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Cliente</th>
                    <th>Método de pago</th>
                    <th className="text-end">Total</th>
                    <th className="text-end">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.pagos?.length ? (
                    stats.pagos.map((pago) => (
                      <tr key={pago.id}>
                        <td className="fw-semibold">{pago.cliente}</td>
                        <td>
                          <span className="badge text-bg-secondary">
                            {pago.metodo_pago.replace("_", " ")}
                          </span>
                        </td>
                        <td className="text-end fw-bold">{formatCurrency(pago.total)}</td>
                        <td className="text-end text-muted">{formatDate(pago.fecha)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        Aún no hay pagos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 🔹 Gráfico de barras dinámico */}
        <div className="mt-5">
          <h4 className="fw-bold text-danger mb-4">
            <i className="bi bi-bar-chart-fill me-2"></i>Estadísticas visuales
          </h4>
          <div className="card shadow-lg border-0 p-4 bg-light-subtle">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "#444" }} />
                <YAxis tick={{ fill: "#444" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ccc",
                  }}
                />
                <Legend />
                <Bar dataKey="cantidad" barSize={60} radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.cantidad)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
