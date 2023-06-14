import { useState, useEffect } from "react";
import "../Locations/LocationCard.css";
import "./CurrentUserBookingCard.css";

function CurrentUserBookingCard({ booking }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setStartDate(new Date(booking.startDate).toString().slice(0, 15));
    setEndDate(new Date(booking.endDate).toString().slice(0, 15));
  }, [booking.endDate, booking.startDate]);

  const handleToolTip = (e) => {
    const tooltipRef = document.getElementById("tooltipspan");
    const tooltipWidth = tooltipRef?.offsetWidth || 0;
    setPosition({ x: e.clientX - tooltipWidth / 2 + 3, y: e.clientY + 32 });
  };

  return (
    <>
      <div
        className={`description-container item${booking.Spot.id} tooltip`}
        onMouseLeave={() => setPosition({ x: 0, y: 0 })}
        onMouseMove={handleToolTip}
      >
        {position.y !== 0 && position.x !== 0 && (
          <span
            style={{ left: position.x - 10, top: position.y - 10 }}
            className="tooltiptext"
            id="tooltipspan"
          >
            {booking.Spot.name}
          </span>
        )}

        <img
          src={booking.Spot.previewImage}
          alt={`${booking.Spot.name}`}
          className="landing-page-images"
        />
        <div className="description-wrapper">
          <span className="description-link">{`${booking.Spot.city}, ${booking.Spot.state}`}</span>
        </div>
        <p className="description-name">{booking.Spot.name}</p>
        <div>
          <span className="description-link">{`$${booking.Spot.price}.00 `}</span>
          <span>night</span>
        </div>
        <div>
          <p>Reserved for:</p>
          <p>Start Date: {startDate}</p>
          <p>End Date: {endDate}</p>
        </div>
      </div>
    </>
  );
}

export default CurrentUserBookingCard;
