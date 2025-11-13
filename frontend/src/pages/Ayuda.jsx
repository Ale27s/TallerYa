import "../App.css";

const faqs = [
  {
    pregunta: "¿Cómo puedo agendar una cita?",
    respuesta:
      "Ingresá en la sección Citas desde el menú principal y completá el formulario con la fecha, hora y servicio que necesitás.",
  },
  {
    pregunta: "¿Ofrecen servicio de retiro del vehículo?",
    respuesta:
      "Sí, dentro del área metropolitana podemos retirar tu vehículo con una coordinación previa por WhatsApp o teléfono.",
  },
  {
    pregunta: "¿Qué medios de pago aceptan?",
    respuesta: "Trabajamos con efectivo, transferencias bancarias y tarjetas de crédito/débito.",
  },
];

function Ayuda() {
  return (
    <section className="content-wrapper-full">
      <div className="page-container-centered">
        <h2 className="page-title text-center">
          <i className="bi bi-life-preserver me-2"></i>
          Centro de ayuda
        </h2>
        <p className="page-subtitle text-center">
          Preguntas frecuentes y datos de contacto directo con el equipo de TallerYa.
        </p>

        <div className="row g-4">
          <div className="col-12 col-lg-7">
            {faqs.map((faq, index) => (
              <div key={faq.pregunta} className="card p-3 mb-3">
                <div className="d-flex align-items-start gap-3">
                  <span className="badge bg-danger fs-6">{index + 1}</span>
                  <div>
                    <h5 className="fw-semibold mb-2">{faq.pregunta}</h5>
                    <p className="mb-0 text-muted">{faq.respuesta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-12 col-lg-5">
            <div className="card h-100 p-4 d-flex flex-column gap-3">
              <h5 className="fw-bold text-danger">
                <i className="bi bi-whatsapp me-2"></i>Atención inmediata
              </h5>
              <p className="mb-1">WhatsApp / Llamadas</p>
              <a href="tel:+595214567890" className="fw-semibold text-decoration-none text-danger">
                +595 21 456 7890
              </a>
              <hr />
              <p className="mb-1">Correo de soporte</p>
              <a href="mailto:soporte@tallerya.com" className="fw-semibold text-decoration-none">
                soporte@tallerya.com
              </a>
              <hr />
              <p className="mb-0">
                Nuestro horario de atención es de lunes a sábado de 08:00 a 18:00 h. También podés usar el formulario de contacto para enviarnos detalles de tu consulta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ayuda;
