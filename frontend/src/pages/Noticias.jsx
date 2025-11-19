import { useState } from "react";
import "../App.css";
import { initialNoticias } from "../data/content";

function Noticias() {
  const [listaNoticias, setListaNoticias] = useState(initialNoticias);
  const [nuevaNoticia, setNuevaNoticia] = useState({
    titulo: "",
    resumen: "",
    fecha: "",
    enlace: "",
  });

  const handleAddNoticia = (e) => {
    e.preventDefault();
    if (!nuevaNoticia.titulo.trim() || !nuevaNoticia.resumen.trim()) return;

    setListaNoticias((prev) => [
      { ...nuevaNoticia, id: Date.now(), fecha: nuevaNoticia.fecha || "Fecha pendiente" },
      ...prev,
    ]);

    setNuevaNoticia({ titulo: "", resumen: "", fecha: "", enlace: "" });
  };

  return (
    <section className="content-wrapper-full">
      <div className="page-container-centered">
        <h2 className="page-title text-center">
          <i className="bi bi-megaphone me-2"></i>
          Noticias del Taller
        </h2>
        <p className="page-subtitle text-center">
          Actualizaciones rápidas sobre mejoras, promociones y actividades del equipo.
        </p>

        <div className="row gy-4">
          <div className="col-12 col-xl-4">
            <div className="card h-100 p-4">
              <h5 className="fw-bold text-danger">
                <i className="bi bi-pencil-square me-2"></i>Publicar novedad
              </h5>
              <p className="text-muted small mb-3">
                Agrega comunicados, promociones o eventos para mantener actualizada la portada.
              </p>

              <form className="d-flex flex-column gap-3" onSubmit={handleAddNoticia}>
                <div>
                  <label className="form-label">Título</label>
                  <input
                    className="form-control"
                    value={nuevaNoticia.titulo}
                    onChange={(e) => setNuevaNoticia({ ...nuevaNoticia, titulo: e.target.value })}
                    placeholder="Ej: Nuevo horario de atención"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Resumen</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={nuevaNoticia.resumen}
                    onChange={(e) => setNuevaNoticia({ ...nuevaNoticia, resumen: e.target.value })}
                    placeholder="Describe brevemente la novedad"
                    required
                  />
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Fecha</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nuevaNoticia.fecha}
                      onChange={(e) => setNuevaNoticia({ ...nuevaNoticia, fecha: e.target.value })}
                      placeholder="Ej: 05 Abr 2024"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Enlace (opcional)</label>
                    <input
                      type="url"
                      className="form-control"
                      value={nuevaNoticia.enlace}
                      onChange={(e) => setNuevaNoticia({ ...nuevaNoticia, enlace: e.target.value })}
                      placeholder="https://"
                    />
                  </div>
                </div>

                <button className="btn btn-danger w-100 fw-semibold" type="submit">
                  Publicar
                </button>
              </form>
            </div>
          </div>

          <div className="col-12 col-xl-8">
            <div className="row gy-4">
              {listaNoticias.map((nota) => (
                <div key={nota.id} className="col-12 col-md-6">
                  <article className="card h-100 p-3 d-flex flex-column gap-2">
                    <span className="badge bg-danger-subtle text-danger fw-semibold align-self-start">
                      {nota.fecha}
                    </span>
                    <h5 className="fw-bold">{nota.titulo}</h5>
                    <p className="text-muted flex-grow-1">{nota.resumen}</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-danger btn-sm">
                        Leer más
                      </button>
                      {nota.enlace && (
                        <a
                          className="btn btn-link btn-sm text-decoration-none"
                          href={nota.enlace}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ver enlace externo
                        </a>
                      )}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Noticias;
