import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from "../../store/reviewReducer";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "./Reviews.css"

function Reviews({ locationId }) {
  const dispatch = useDispatch();
  const reviewsInfo = useSelector((state) => state.reviewState);
  const allReviews = Object.values(reviewsInfo);
  const reverseOrderAllReviews = [];
  for(let i = allReviews.length - 1; i >= 0; i--) {
    reverseOrderAllReviews.push(allReviews[i]);
  };

  const [isLoading, setIsLoading] = useState("");

  

  useEffect(() => {
    (async () => {
        await dispatch(reviewActions.loadReviewsThunk(locationId))
    })().then(() => setIsLoading("Loading..."))
  }, [dispatch, locationId]);

  return (
    <div className="review-container">
      {isLoading && (reverseOrderAllReviews.map(review => (
        <div key={review.id} className="review-wrapper">
            <ReviewCard review={review}/>
        </div>
      )))}
    </div>
  );
}

export default Reviews;
