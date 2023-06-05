import DeleteReviewModal from "./DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
function ReviewCard({ review }) {
  
  const createdDate = (() => {
    return (
      new Date(review?.createdAt).toString().slice(4, 8) +
      new Date(review?.createdAt).toString().slice(11, 15)
    );
  })();

  return (
    <>
      <h4>{review.User?.firstName}</h4>
      <p>{createdDate}</p>
      <p>{review?.review}</p>
      <div>
        <UpdateReviewModal review={review} type={"detail"}/>
      </div>
      <div className="delete-review-container">
        <DeleteReviewModal review={review} />
      </div>
    </>
  );
}

export default ReviewCard;
