import DeleteReviewModal from "./DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import { useEffect } from "react";
import { useState } from "react";
function ReviewDetailCard({ review }) {
  const [starsCountArr, setStarsCountArr] = useState([]);

  const createdDate = (() => {
    return (
      new Date(review?.createdAt).toString().slice(4, 8) +
      new Date(review?.createdAt).toString().slice(11, 15)
    );
  })();

  useEffect(() => {
    const starsArr = [];
    for (let i = 0; i < review.stars; i++) {
      starsArr.push(i + 1);
    }
    setStarsCountArr(starsArr);
  }, [review, setStarsCountArr]);

  return (
    <>
      <div className="reviews-name-stars-container">
        <h4 className="reviews-name">{review.User?.firstName}</h4>
        <div className="each-star-rating-container">
          {/* <span className="reviews-stars-rating">{review?.stars}</span> */}
          {/* <span id="reserve-star">{"★"}</span> */}
          {starsCountArr.map((count, i) => {
            return <span key={`${review.id}${i}`} >{"★"}</span>;
          })}
        </div>
      </div>
      <p className="reviews-date">{createdDate}</p>
      <p className="reviews-review">{review?.review}</p>
      <div className="review-buttons-container">
        <div>
          <UpdateReviewModal review={review} pageType={"detail"} />
        </div>
        <div className="delete-review-container">
          <DeleteReviewModal review={review} />
        </div>
      </div>
    </>
  );
}

export default ReviewDetailCard;
