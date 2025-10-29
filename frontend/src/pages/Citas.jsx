import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Citas() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <Navbar user={JSON.parse(localStorage.getItem("user"))} />
        <div className="container mt-4">
          <h3>Gestión de Citas</h3>
          <p>Agenda y seguimiento de citas en el taller mecánico.</p>
        </div>
      </div>
    </div>
  );
}

export default Citas;
