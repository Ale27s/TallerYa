import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      // Redirecciones según rol
      if (user.rol === "JEFE") navigate("/personal");
      else if (user.rol === "MECANICO") navigate("/mecanico");
      else if (user.rol === "CLIENTE") navigate("/cliente");
      else navigate("/dashboard");
    } catch (err) {
      setMensaje("❌ Credenciales inválidas o error de conexión");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      data-bs-theme="auto"
    >
      <div
        className="card shadow-lg p-4 col-11 col-md-5 animate__animated animate__fadeIn"
        style={{ borderTop: "4px solid #c70000", borderRadius: "12px" }}
      >
        <h2 className="text-center mb-3 text-danger">
          <i className="bi bi-person-circle me-2"></i>Iniciar Sesión
        </h2>
        <p className="text-center text-muted mb-4">
          Accedé al sistema de gestión del taller.
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold">
              <i className="bi bi-person-fill text-danger me-2"></i>Usuario
            </label>
            <input
              className="form-control"
              placeholder="Ej: admin_taller"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-bold">
              <i className="bi bi-lock-fill text-danger me-2"></i>Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-danger w-100 mt-2">
            <i className="bi bi-box-arrow-in-right me-2"></i>Entrar
          </button>
        </form>

        {mensaje && (
          <div className="alert alert-danger mt-3 text-center">{mensaje}</div>
        )}

        <div className="text-center mt-3">
          <small>
            ¿No tenés una cuenta?{" "}
            <span
              className="text-danger fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Registrate aquí
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
