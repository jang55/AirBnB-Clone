import { useState } from "react";
import StarRating from "./StarRating";
import * as reviewActions from "../../store/reviewReducer";
import { useDispatch } from "react-redux";
import "./PostReview.css";

function UpdateReview({ setShowModal, review }) {
  const [stars, setStars] = useState(review.stars);
  const [reviewText, setReviewText] = useState(review.review);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formInfo = {
      review: reviewText,
      stars,
    };

    const submitReview = async () => {
      try {
        await dispatch(reviewActions.updateReviewThunk(formInfo, review.id));
        setShowModal(false);
      } catch (err) {
        const data = await err.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    };

    await submitReview();
  };

  return (
    <form onSubmit={submitHandler} className="post-review-container">
      <h1>{`How was your stay at ${review.Spot.name}?`}</h1>
      <ul className="post-review-errors-container">
        <li>
          {errors.review && (
            <p className="errors">
              Review is required with atleast 10 characters
            </p>
          )}
        </li>
        <li>
          {errors.stars && <p className="errors">Star Rating is required</p>}
        </li>
        <li>
          {errors.alreadyCreated && (
            <p className="errors">{errors.alreadyCreated}</p>
          )}
        </li>
      </ul>
      <textarea
        placeholder="Leave your review here..."
        className="post-review-textbox"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>
      <div className="star-rating-container">
        <StarRating stars={stars} setStars={setStars} />
        <span id="star-text">Stars</span>
      </div>
      <button
        id={
          reviewText.length >= 10
            ? "post-review-submit-button"
            : "post-review-submit-button-not"
        }
        type="submit"
        disabled={reviewText.length < 10}
      >
        Update Your Review
      </button>
    </form>
  );
}

export default UpdateReview;
