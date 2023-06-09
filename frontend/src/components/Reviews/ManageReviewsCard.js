import DeleteReviewModal from "./DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function ManageReviewsCard({ review, pageType }) {
  const [starsCountArr, setStarsCountArr] = useState([]);

  useEffect(() => {
    const starsArr = [];
    for (let i = 0; i < review.stars; i++) {
      starsArr.push(i + 1);
    }
    setStarsCountArr(starsArr);
  }, [review, setStarsCountArr]);

  const createdDate = (() => {
    return (
      new Date(review?.createdAt).toString().slice(4, 8) +
      new Date(review?.createdAt).toString().slice(11, 15)
    );
  })();

  return (
    <>
      <div className="reviews-name-stars-container">
        <h4 className="manage-reviews-title">
          <NavLink to={`/locations/${review?.Spot.id}`}>
            {review?.Spot.name}
          </NavLink>
        </h4>
        <div className="each-star-rating-container">
          {/* <span className="reviews-stars-rating">{review?.stars}</span> */}
          {/* <span id="reserve-star">{"★"}</span> */}
          {starsCountArr.map((count, i) => {
            return <span key={`${review.id}${i}`}>{"★"}</span>;
          })}
        </div>
      </div>
      <p className="manage-reviews-date">{createdDate}</p>
      <p className="manage-reviews-reviews">{review?.review}</p>
      <div className="review-buttons-container">
        <div>
          <UpdateReviewModal review={review} pageType={pageType} />
        </div>
        <div className="delete-review-container">
          <DeleteReviewModal review={review} />
        </div>
      </div>
    </>
  );
}

export default ManageReviewsCard;
