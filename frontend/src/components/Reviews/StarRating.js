import React, { useState } from "react";

function StarRating({ stars, setStars }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            id="post-review-buttons"
            type="button"
            key={index}
            className={index <= (hover || stars) ? "on" : "off"}
            onClick={() => setStars(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(stars)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
