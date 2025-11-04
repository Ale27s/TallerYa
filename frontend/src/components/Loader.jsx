import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800); // 1.8 segundos
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="loader-container">
      <div className="loader-content text-center">
        <div className="loader-logo mb-3">
          <i className="bi bi-wrench-adjustable-circle text-danger"></i>
        </div>
        <h3 className="fw-bold text-danger">TallerYa</h3>
        <div className="spinner-border text-danger mt-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
