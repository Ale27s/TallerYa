import { useState } from "react";
import { initialNoticias, initialServicios } from "../data/content";

function Home() {
  const [mensaje, setMensaje] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const noticiasDestacadas = initialNoticias.slice(0, 3);
  const serviciosDestacados = initialServicios.slice(0, 4);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 2500);
    setMensaje({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div className="content-wrapper-full home-page">
      <div className="page-container-centered d-flex flex-column gap-5">
        <section className="landing-section text-center">
          <h2 className="fw-bold mb-3">
            Todo lo que pasa en el taller, desde el inicio
          </h2>
          <p className="text-muted lead mb-0">
            Noticias, precios actualizados y una forma rápida de contactarnos para agendar tu próxima visita.
          </p>
        </section>

        <section className="landing-section">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
            <div>
              <h3 className="section-title mb-1">Noticias rápidas</h3>
              <p className="text-muted mb-0">Novedades, promociones y mejoras del equipo.</p>
            </div>
            <a className="btn btn-outline-danger" href="/noticias">
              Ver todas las noticias
            </a>
          </div>

          <div className="row gy-4">
            {noticiasDestacadas.map((nota) => (
              <div key={nota.id} className="col-12 col-md-4">
                <article className="card h-100 p-3 d-flex flex-column gap-2">
                  <span className="badge bg-danger-subtle text-danger align-self-start">{nota.fecha}</span>
                  <h5 className="fw-bold">{nota.titulo}</h5>
                  <p className="text-muted flex-grow-1">{nota.resumen}</p>
                  <a className="btn btn-link text-decoration-none p-0" href="/noticias">
                    Leer más
                  </a>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
            <div>
              <h3 className="section-title mb-1">Precios destacados</h3>
              <p className="text-muted mb-0">Servicios más consultados, con agenda inmediata.</p>
            </div>
            <a className="btn btn-danger" href="/precios">
              Ver listado completo
            </a>
          </div>

          <div className="row gy-3">
            {serviciosDestacados.map((servicio) => (
              <div key={servicio.id} className="col-12 col-md-6 col-lg-3">
                <div className="card h-100 p-3">
                  <h6 className="fw-bold mb-1">{servicio.nombre}</h6>
                  <span className="badge bg-danger-subtle text-danger mb-2">{servicio.categoria}</span>
                  <p className="text-muted small flex-grow-1">
                    Precio base estimado, confirmación en el diagnóstico inicial.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong className="text-danger">Gs. {servicio.precio.toLocaleString()}</strong>
                    <a className="btn btn-outline-danger btn-sm" href="/citas">
                      Agendar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-footer" id="contacto">
          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-lg-5">
              <div className="card h-100 p-4 contact-card">
                <h4 className="fw-bold text-danger mb-3">Envíanos un mensaje</h4>
                <p className="text-muted small">Responderemos a la brevedad con disponibilidad y opciones.</p>

                <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
                  <input
                    className="form-control"
                    placeholder="Nombre y apellido"
                    value={mensaje.nombre}
                    onChange={(e) => setMensaje({ ...mensaje, nombre: e.target.value })}
                    required
                  />
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Correo de contacto"
                    value={mensaje.email}
                    onChange={(e) => setMensaje({ ...mensaje, email: e.target.value })}
                    required
                  />
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Cuéntanos qué necesitás"
                    value={mensaje.mensaje}
                    onChange={(e) => setMensaje({ ...mensaje, mensaje: e.target.value })}
                    required
                  />
                  <button className="btn btn-danger" type="submit">
                    Enviar consulta
                  </button>
                  {enviado && <div className="alert alert-success mb-0">Mensaje enviado ✅</div>}
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div className="card h-100 p-4 contact-card">
                <h5 className="fw-bold mb-3">Datos de contacto</h5>
                <ul className="list-unstyled mb-3">
                  <li className="mb-2">
                    <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                    Av. del Taller 123, San Lorenzo
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-telephone-fill text-danger me-2"></i>
                    (021) 456-7890
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-envelope-fill text-danger me-2"></i>
                    contacto@tallerya.com
                  </li>
                  <li className="mb-0">
                    <i className="bi bi-clock-fill text-danger me-2"></i>
                    Lun a Sáb — 08:00 a 18:00
                  </li>
                </ul>

                <div className="d-flex gap-3 fs-4">
                  <a href="https://www.facebook.com" className="text-danger" target="_blank" rel="noreferrer">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://www.instagram.com" className="text-danger" target="_blank" rel="noreferrer">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://wa.me/595987654321" className="text-danger" target="_blank" rel="noreferrer">
                    <i className="bi bi-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card h-100 p-0 overflow-hidden contact-card">
                <div className="p-3">
                  <h5 className="fw-bold mb-2">¿Dónde estamos?</h5>
                  <p className="text-muted small mb-0">Ubicación del taller en San Lorenzo.</p>
                </div>
                <iframe
                  title="Mapa TallerYa"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-57.676%2C-25.303%2C-57.660%2C-25.291&layer=mapnik&marker=-25.2969%2C-57.6681"
                  className="location-map"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
