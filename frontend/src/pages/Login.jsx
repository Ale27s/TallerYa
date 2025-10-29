import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        username,
        password,
      });
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      if (user.rol === "JEFE") navigate("/personal");
      else if (user.rol === "MECANICO") navigate("/mecanico");
      else if (user.rol === "CLIENTE") navigate("/cliente");
      else navigate("/dashboard");
    } catch (err) {
      alert("Credenciales inválidas o error de conexión");
    }
  };

  return (
    <div className="container mt-5 col-md-4 text-center">
      <h2 className="mb-3">Iniciar Sesión - TallerYa</h2>
      <form onSubmit={handleLogin}>
        <input className="form-control mb-2" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className="form-control mb-3" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
