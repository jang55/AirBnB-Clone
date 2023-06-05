import DeleteReviewModal from "./DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import { NavLink } from "react-router-dom";

function ManageReviewsCard({ review, type }) {

  const createdDate = (() => {
    return (
      new Date(review?.createdAt).toString().slice(4, 8) +
      new Date(review?.createdAt).toString().slice(11, 15)
    );
  })();

  return (
    <>
      <h4>
        <NavLink to={`/locations/${review?.Spot.id}`}>
          {review?.Spot.name}
        </NavLink>
      </h4>
      <p>{createdDate}</p>
      <p>{review?.review}</p>
      <div>
        <UpdateReviewModal review={review} type={type}/>
      </div>
      <div className="delete-review-container">
        <DeleteReviewModal review={review} />
      </div>
    </>
  );
}

export default ManageReviewsCard;
