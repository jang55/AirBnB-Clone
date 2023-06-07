import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from "../../store/reviewReducer";
import { useEffect, useState } from "react";
import ReviewDetailCard from "./ReviewDetailCard";
import "./Reviews.css";

function Reviews({ locationId, location }) {
  const dispatch = useDispatch();
  const reviewsInfo = useSelector((state) => state.reviewState);
  const allReviews = Object.values(reviewsInfo);
  const reverseOrderAllReviews = [];
  for (let i = allReviews.length - 1; i >= 0; i--) {
    reverseOrderAllReviews.push(allReviews[i]);
  }

  /************************* */

  const [isLoading, setIsLoading] = useState("");
  const [spotOwner, setSpotOwner] = useState(false);

  const user = useSelector((state) => state.sessionState.user);

  useEffect(() => {
    if (user) {
      if (location.ownerId === user.id) {
        setSpotOwner(true);
      }
    }
  }, [user, location.ownerId]);

  /******************************************* */

  useEffect(() => {
    (async () => {
      await dispatch(reviewActions.loadReviewsThunk(locationId));
    })().then(() => setIsLoading("Loading..."));
  }, [dispatch, locationId]);

  return (
    <div className="review-container">
      {isLoading && reverseOrderAllReviews.length === 0 ? (
        !spotOwner ? (
          <p>Be the first to post a review!</p>
        ) : (
          ""
        )
      ) : (
        reverseOrderAllReviews.map((review) => (
          <div key={review.id} className="review-wrapper">
            <ReviewDetailCard review={review} />
          </div>
        ))
      )}
    </div>
  );
}

export default Reviews;
