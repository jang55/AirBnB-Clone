function LocationItem({ spot }) {
    // console.log(String(spot.avgRating).length);

  return (
    <div className={`description-container item${spot.id}`}>
      <img src={spot.previewImage} alt={`${spot.name} image`} />
      <div className="description-wrapper">
        <span className="description-link">{`${spot.city}, ${spot.state}`}</span>
        <div>
          <span className="description-link">{"★"}</span>
          <span>{spot.avgRating ? (String(spot.avgRating).length === 1 ? `${spot.avgRating}.0` : spot.avgRating) : "New"}</span>
        </div>
      </div>
      <p className="description-name">{spot.name}</p>
      <div>
        <span className="description-link">{`$${spot.price}.00 `}</span>
        <span>night</span>
      </div>
    </div>
  );
}

export default LocationItem;
