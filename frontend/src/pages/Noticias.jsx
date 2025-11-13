import "../App.css";

const noticias = [
  {
    id: 1,
    titulo: "Nuevo banco de diagnóstico electrónico",
    resumen: "Incorporamos un escáner de última generación que reduce en 40% el tiempo de detección de fallas electrónicas.",
    fecha: "15 Feb 2024",
  },
  {
    id: 2,
    titulo: "Promoción de mantenimiento preventivo",
    resumen: "Durante todo marzo los clientes obtienen un 15% de descuento en el combo de filtros, aceite y revisión de frenos.",
    fecha: "02 Mar 2024",
  },
  {
    id: 3,
    titulo: "Capacitación certificada para el equipo",
    resumen: "Nuestro personal técnico completó la certificación de inyección electrónica Bosch Service 2024.",
    fecha: "20 Mar 2024",
  },
];

function Noticias() {
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
          {noticias.map((nota) => (
            <div key={nota.id} className="col-12 col-md-6 col-lg-4">
              <article className="card h-100 p-3 d-flex flex-column gap-2">
                <span className="badge bg-danger-subtle text-danger fw-semibold align-self-start">
                  {nota.fecha}
                </span>
                <h5 className="fw-bold">{nota.titulo}</h5>
                <p className="text-muted flex-grow-1">{nota.resumen}</p>
                <button className="btn btn-outline-danger btn-sm align-self-start">
                  Leer más
                </button>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Noticias;
