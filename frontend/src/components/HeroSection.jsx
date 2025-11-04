import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

function HeroSection() {
  return (
    <section className="hero-section parallax-bg d-flex align-items-center text-center text-light">
      <div className="container">
        <h1 className="fw-bold mb-3 animate__animated animate__fadeInDown">
          Confía tu vehículo a los mejores
        </h1>
        <h4 className="fw-semibold mb-4 animate__animated animate__fadeInUp">
          TallerYa 🔧 — Mantenimiento y gestión integral para tu taller
        </h4>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <a href="/citas" className="btn btn-danger btn-lg px-4 shadow">
            <i className="bi bi-calendar-check me-2"></i> Agendar cita
          </a>
          <a href="/vehiculos" className="btn btn-outline-light btn-lg px-4 shadow">
            <i className="bi bi-car-front me-2"></i> Ver mis vehículos
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
