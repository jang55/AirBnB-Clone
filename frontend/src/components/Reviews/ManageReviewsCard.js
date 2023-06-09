import DeleteReviewModal from "./DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import { NavLink } from "react-router-dom";

function ManageReviewsCard({ review, pageType }) {
  const createdDate = (() => {
    return (
      new Date(review?.createdAt).toString().slice(4, 8) +
      new Date(review?.createdAt).toString().slice(11, 15)
    );
  })();

  return (
    <>
      <h4 className="manage-reviews-title">
        <NavLink to={`/locations/${review?.Spot.id}`}>
          {review?.Spot.name}
        </NavLink>
      </h4>
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
