function LocationItem({ spot }) {
  return (
    <div className={`description-container item${spot.id}`}>
      <img src={spot.previewImage} alt={`${spot.name}`} />
      <div className="description-wrapper">
        <span className="description-link">{`${spot.city}, ${spot.state}`}</span>
        <div>
          <span className="description-link">{"★"}</span>
          {/*this will use ternary to set avgstar to new if its new or to the avgrating */}
          {/* the nested ternary is to make sure a solid integer will also tturn to a decimal eg. 3 => 3.0 */}
          <span>
            {spot.avgRating
              ? String(spot.avgRating).length === 1 ? `${spot.avgRating}.0` : spot.avgRating
              : "New"}
          </span>
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
