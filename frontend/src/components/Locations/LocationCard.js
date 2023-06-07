import { useState } from "react";
import "./LocationCard.css";

function LocationCard({ spot }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleToolTip = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className={`description-container item${spot.id} tooltip`}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      onMouseMove={handleToolTip}
    >
      {position.y !== 0 && position.x !== 0 && (
        <span
          style={{ left: position.x - 65, top: position.y - 33 }}
          className="tooltiptext"
        >
          {spot.name}
        </span>
      )}

      <img src={spot.previewImage} alt={`${spot.name}`} />
      <div className="description-wrapper">
        <span className="description-link">{`${spot.city}, ${spot.state}`}</span>
        <div>
          <span className="description-link">{"★"}</span>
          {/*this will use ternary to set avgstar to new if its new or to the avgrating */}
          {/* the nested ternary is to make sure a solid integer will also tturn to a decimal eg. 3 => 3.0 */}
          <span>
            {spot.avgRating
              ? String(spot.avgRating).length === 1
                ? Number(spot.avgRating).toFixed(1)
                : spot.avgRating
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

export default LocationCard;
