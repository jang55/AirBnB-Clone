import { useParams } from "react-router-dom";
import * as spotsActions from "../../store/spotsReducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Reviews from "../Reviews";
import PostReviewModal from "../Reviews/PostReviewModal";
import { useReview } from "../../context/ReviewContext";
import "./LocationDetails.css";

function LocationDetails() {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const [spot, setSpot] = useState({});
  const [isLoading, setIsLoading] = useState("");
  const { newReview, setNewReview, deleteReview, setDeleteReview } =
    useReview();

  useEffect(() => {
    setNewReview(false);
    setDeleteReview(false);
    //make a fetch call to get details of one spot
    (async () => {
      const spotInfo = await dispatch(
        spotsActions.loadOneSpotThunk(locationId)
      );
      //if it exist, set the spot to a slice of state
      if (spotInfo) {
        setSpot(spotInfo);
      }
    })().then(() => setIsLoading("Loading..."));
  }, [
    dispatch,
    locationId,
    newReview,
    deleteReview,
    setDeleteReview,
    setNewReview,
  ]);

  // useEffect(() => {
  //   setNewReview(false);
  //   setDeleteReview(false);
  // }, [spot, setDeleteReview, setNewReview])

  const reserveHandler = () => {
    alert("Feature Coming Soon...");
  };

  return (
    <>
      {isLoading && (
        <div>
          <div className="details-container">
            <h1>{spot.name}</h1>
            <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
            <div className="image-container">
              {spot.SpotImages.map(
                (image, index) =>
                  index <= 4 && (
                    <img
                      id={`image${index}`}
                      className="details-image"
                      key={image.id}
                      src={image.url}
                      alt="Camping"
                    />
                  )
              )}
            </div>
            <div className="details-description-reserve-wrapper">
              <div className="details-description-wrapper">
                <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                <p className="details-description">{spot.description}</p>
              </div>
              <div className="reserve-wrapper">
                <div className="price-reviewCount">
                  <div>
                    <span id="detail-price">{`$${spot.price}.00 `}</span>
                    <span>night</span>
                  </div>
                  <div id="reserve-rating-wrapper">
                    <span id="reserve-star">{"★"}</span>
                    <span>
                      {spot.avgStarRating
                        ? String(spot.avgStarRating).length === 1
                          ? Number(spot.avgStarRating).toFixed(1)
                          : spot.avgStarRating
                        : "New"}
                    </span>
                    <span className="middle-dot">{Number(spot.numReviews) === 0 ? "" : "·"} </span>
                    <span>
                      {Number(spot.numReviews) === 0
                        ? ""
                        : Number(spot.numReviews) === 1
                        ? `${spot.numReviews} Review`
                        : `${spot.numReviews} Reviews`}
                    </span>
                  </div>
                </div>
                <button id="reserve-button" onClick={reserveHandler}>
                  Reserve
                </button>
              </div>
            </div>
          </div>
          {/************************************************/}
          <div className="reviews-container">
            <div className="review-rating-wrapper">
              <span id="review-star">{"★"}</span>
              <span className="details-reviews-rating">
                {spot.avgStarRating
                  ? String(spot.avgStarRating).length === 1
                    ? Number(spot.avgStarRating).toFixed(1)
                    : spot.avgStarRating
                  : "New"}
              </span>
              <span className="details-reviews-rating middle-dot">{Number(spot.numReviews) === 0 ? "" : "·"} </span>
              <span className="details-reviews-rating">
                {Number(spot.numReviews) === 0
                  ? ""
                  : Number(spot.numReviews) === 1
                  ? `${spot.numReviews} Review`
                  : `${spot.numReviews} Reviews`}
              </span>
            </div>
            <div>
              <PostReviewModal locationId={locationId} location={spot} />
            </div>
            <Reviews locationId={locationId} location={spot} />
          </div>
        </div>
      )}
    </>
  );
}

export default LocationDetails;
