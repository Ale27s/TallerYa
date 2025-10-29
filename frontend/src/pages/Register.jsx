import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
        username,
        password,
      });
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h2 className="text-center mb-3">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success w-100">Crear cuenta</button>
      </form>
    </div>
  );
}

export default Register;
