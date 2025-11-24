import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [identificador, setIdentificador] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("auth/login/", {
        identificador,
        password,
      });

      const user = res.data.user;

      // 👉 Guardamos el token JWT
      if (res.data.access) {
        localStorage.setItem("token", res.data.access);
      }

      // 👉 Guardamos los datos del usuario
      localStorage.setItem("user", JSON.stringify(user));

      // 👉 Redirección según rol
      if (user.rol === "JEFE") navigate("/personal");
      else if (user.rol === "MECANICO") navigate("/mecanico");
      else if (user.rol === "CLIENTE") navigate("/cliente");
      else navigate("/dashboard");

    } catch (err) {
      const errorMsg = err?.response?.data?.message;
      setMensaje(errorMsg || "❌ Credenciales inválidas o error de conexión");
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
              <i className="bi bi-person-fill text-danger me-2"></i>
              Usuario o correo
            </label>
            <input
              className="form-control"
              placeholder="Ej: admin_taller"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-bold">
              <i className="bi bi-lock-fill text-danger me-2"></i>Contraseña
            </label>
            <div className="input-group">
              <input
                type={mostrarPassword ? "text" : "password"}
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setMostrarPassword((prev) => !prev)}
                aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i className={`bi ${mostrarPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>
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
