import { useState } from "react";
import StarRating from "./StarRating";
import * as reviewActions from "../../store/reviewReducer";
import { useDispatch } from "react-redux";
import "./PostReview.css";

function PostReview({ locationId, setShowModal, setNewReview }) {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formInfo = {
      review,
      stars,
    };

    

    const submitReview = async () => {
      try {
        let newlyReview = await dispatch(reviewActions.addReviewThunk(formInfo, locationId));
        console.log(newlyReview)
        if(newlyReview) setNewReview(true)
        setShowModal(false);

    } catch (err) {

        if(err.status === 403) {
            setErrors({alreadyCreated: "Review already exist for this spot"})
        }
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
      <h1>How was your stay?</h1>
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
          {errors.alreadyCreated && <p className="errors">{errors.alreadyCreated}</p>}
        </li>
      </ul>
      <textarea
        placeholder="Leave your review here..."
        className="post-review-textbox"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <div className="star-rating-container">
        <StarRating stars={stars} setStars={setStars} />
        <span id="star-text">Stars</span>
      </div>
      <button
        id={
          review.length >= 10
            ? "post-review-submit-button"
            : "post-review-submit-button-not"
        }
        type="submit"
        disabled={review.length < 10}
      >
        Submit Your Review
      </button>
    </form>
  );
}

export default PostReview;
