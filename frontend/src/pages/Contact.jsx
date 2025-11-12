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
    <section className="contact-page py-5">
      <div className="container">
        <div className="row contact-page__titles text-uppercase fw-bold mb-4">
          <div className="col-12 col-lg-6 text-center text-lg-start">Contact Form</div>
          <div className="col-12 col-lg-6 text-center text-lg-start">Contact Info</div>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-6">
            <div className="contact-card contact-card--info h-100">
              <div className="contact-map mb-4">
                <MapContainer
                  center={[-25.2969, -57.6681]}
                  zoom={13}
                  className="contact-map__canvas"
                  scrollWheelZoom={false}
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
 <div className="contact-info">
                <h5 className="text-uppercase fw-bold mb-3 text-danger">TallerYa Garage</h5>
                <p className="mb-4">
                  8901 Marmora Road, Glasgow, D04 89GR
                  <br />
                  San Lorenzo, Paraguay
</p>
                <ul className="contact-info__list list-unstyled mb-0">
                  <li>
                    <i className="bi bi-telephone-fill me-2"></i>
                    <span>(021) 456-7890</span>
                  </li>
                  <li>
                    <i className="bi bi-envelope-fill me-2"></i>
                    <span>contacto@tallerya.com</span>
                  </li>
                  <li>
                    <i className="bi bi-clock-fill me-2"></i>
                    <span>Lun - Sáb: 08:00 - 18:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
 <div className="col-12 col-lg-6">
            <form onSubmit={handleSubmit} className="contact-card contact-card--form h-100">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
 value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Ingresa tu nombre"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
className="form-control contact-input"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  placeholder="Número de contacto"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
className="form-control contact-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@email.com"
                  required
                />
              </div>
<div className="mb-4">
                <label className="form-label">Mensaje</label>
                <textarea
rows="4"
                  className="form-control contact-input"
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  placeholder="Cuéntanos cómo podemos ayudarte"
                  required
                />
              </div>
<div className="contact-recaptcha mb-4">
                <div className="contact-recaptcha__checkbox">
                  <input type="checkbox" id="robotCheck" />
                  <label htmlFor="robotCheck">No soy un robot</label>
                </div>
                <div className="contact-recaptcha__brand">reCAPTCHA</div>
              </div>

              <button className="btn btn-danger w-100 fw-semibold py-2">
                <i className="bi bi-send me-2"></i>Enviar mensaje
              </button>

              {enviado && (
                <div className="alert alert-success mt-4 text-center">
                  ✅ Mensaje enviado correctamente.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
</section>
  );
}

export default Contact;


