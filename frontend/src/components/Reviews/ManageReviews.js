import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviewReducer";
import ManageReviewsCard from "./ManageReviewsCard";
import "./ManageReviews.css"


function ManageReviews() {
  const dispatch = useDispatch();
  const reviewState = useSelector((state) => state.reviewState);
  const allReviews = Object.values(reviewState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
        await dispatch(reviewActions.loadCurrentUserReviewsThunk());
    })().then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <h1>Manage Reviews</h1>
      {isLoaded && 
        allReviews.map((review) => (
          <div key={review.id} className="currentUser-reviews-container">
            <ManageReviewsCard review={review} pageType={"manage"}/>
          </div>
        ))}
    </>
  );
}

export default ManageReviews;
