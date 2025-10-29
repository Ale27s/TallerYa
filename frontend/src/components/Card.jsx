function Card({ title, value, icon, color }) {
  return (
    <div className="col-md-4 mb-4">
      <div className={`card text-white bg-${color} shadow`}>
        <div className="card-body text-center">
          <h4>{icon}</h4>
          <h5>{title}</h5>
          <p className="fs-4 fw-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
