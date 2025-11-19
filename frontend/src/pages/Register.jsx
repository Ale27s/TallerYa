import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
        username,
        email,
        password,
      });
      setMensaje("✅ Registro exitoso. Ahora podés iniciar sesión.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMensaje("❌ Error al registrar usuario. Intente de nuevo.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light"
         data-bs-theme="auto">
      <div
        className="card shadow-lg p-4 col-11 col-md-5 animate__animated animate__fadeIn"
        style={{ borderTop: "4px solid #c70000", borderRadius: "12px" }}
      >
        <h2 className="text-center mb-3 text-danger">
          <i className="bi bi-person-plus-fill me-2"></i>Crear cuenta
        </h2>
        <p className="text-center text-muted mb-4">
          Completá tus datos para registrarte en TallerYa.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">
              <i className="bi bi-envelope-fill me-2 text-danger"></i>Correo electrónico
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              <i className="bi bi-person-fill me-2 text-danger"></i>Usuario (opcional)
            </label>
            <input
              className="form-control"
              placeholder="Ej: juanperez"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <small className="text-muted">Si lo dejas vacío, usaremos tu correo para crear uno.</small>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              <i className="bi bi-lock-fill me-2 text-danger"></i>Contraseña
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
            <i className="bi bi-check-circle me-2"></i>Registrarme
          </button>
        </form>

        {mensaje && (
          <div className="alert alert-info mt-3 text-center">{mensaje}</div>
        )}

        <div className="text-center mt-3">
          <small>
            ¿Ya tenés una cuenta?{" "}
            <span
              className="text-danger fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Register;
