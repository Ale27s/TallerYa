import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../App.css";

const tallerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [38, 38],
});

function Contact() {
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5 text-danger">Contáctanos</h2>

      <div className="row">
        {/* Mapa */}
        <div className="col-lg-6 mb-4">
          <MapContainer
            center={[-25.2969, -57.6681]} // ejemplo: San Lorenzo, Paraguay
            zoom={13}
            style={{ height: "400px", borderRadius: "10px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <Marker position={[-25.2969, -57.6681]} icon={tallerIcon}>
              <Popup>
                <strong>TallerYa</strong>
                <br />
                San Lorenzo, Paraguay
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Formulario */}
        <div className="col-lg-6">
          <form onSubmit={handleSubmit} className="p-4 bg-dark text-light rounded shadow-sm">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                className="form-control"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea
                rows="3"
                className="form-control"
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              />
            </div>
            <button className="btn btn-danger w-100 fw-semibold">
              <i className="bi bi-send me-2"></i> Enviar mensaje
            </button>
          </form>
          {enviado && (
            <div className="alert alert-success mt-3 text-center">
              ✅ Mensaje enviado correctamente.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
