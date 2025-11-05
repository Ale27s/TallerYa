import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

function HeroSection() {
  return (
    <section
      className="hero-section d-flex align-items-center justify-content-center text-center text-light position-relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
          url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "85vh",
      }}
    >
      {/* Fondo dinámico con overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      {/* Contenido */}
      <div className="container position-relative z-2 animate__animated animate__fadeInUp">
        <h1 className="fw-bold display-4 mb-3 text-shadow">
          Confía tu vehículo a los <span className="text-danger">mejores</span>
        </h1>
        <h4 className="fw-semibold mb-4 text-light opacity-75">
          TallerYa 🔧 — Mantenimiento y gestión integral para tu taller
        </h4>

        {/* Botones */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
          <a
            href="/citas"
            className="btn btn-danger btn-lg px-4 py-2 shadow-sm rounded-pill fw-semibold"
          >
            <i className="bi bi-calendar-check me-2"></i> Agendar cita
          </a>

          <a
            href="/vehiculos"
            className="btn btn-outline-light btn-lg px-4 py-2 rounded-pill fw-semibold"
          >
            <i className="bi bi-car-front me-2"></i> Ver mis vehículos
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
