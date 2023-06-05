import { useParams } from "react-router-dom";
import * as spotsActions from "../../store/spotsReducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Reviews from "../Reviews";
import PostReviewModal from "../Reviews/PostReviewModal";
import { useReview } from "../../context/ReviewContext";
import "./Location.css";

function LocationDetails() {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const [spot, setSpot] = useState({});
  const [isLoading, setIsLoading] = useState("");
  const { newReview, setNewReview, deleteReview, setDeleteReview } = useReview();

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
  }, [dispatch, locationId, newReview, deleteReview, setDeleteReview, setNewReview]);

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
              {spot.SpotImages.map((image, index) => (
                <img
                  id={`image${index}`}
                  key={image.id}
                  src={image.url}
                  alt="Camping"
                />
              ))}
            </div>
            <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
            <p>{spot.description}</p>
            <div className="reserve-wrapper">
              <div>
                <span>{`$${spot.price}.00 `}</span>
                <span>night</span>
              </div>
              <div>
                <span>{"★"}</span>
                <span>
                  {spot.avgStarRating
                    ? String(spot.avgStarRating).length === 1
                      ? Number(spot.avgStarRating).toFixed(1)
                      : spot.avgStarRating
                    : "New"}
                </span>
                <span>{Number(spot.numReviews) === 0 ? "" : "·"} </span>
                <span>
                  {Number(spot.numReviews) === 0
                    ? ""
                    : Number(spot.numReviews) === 1
                    ? `${spot.numReviews} Review`
                    : `${spot.numReviews} Reviews`}
                </span>
              </div>
              <button id="reserve-button" onClick={reserveHandler}>
                Reserve
              </button>
            </div>
          </div>
          {/************************************************/}
          <div className="reviews-container">
            <div>
              <span>{"★"}</span>
              <span>
                {spot.avgStarRating
                  ? String(spot.avgStarRating).length === 1
                    ? Number(spot.avgStarRating).toFixed(1)
                    : spot.avgStarRating
                  : "New"}
              </span>
              <span>{Number(spot.numReviews) === 0 ? "" : "·"} </span>
              <span>
                {Number(spot.numReviews) === 0
                  ? ""
                  : Number(spot.numReviews) === 1
                  ? `${spot.numReviews} Review`
                  : `${spot.numReviews} Reviews`}
              </span>
            </div>
            <div>
              <PostReviewModal locationId={locationId} />
            </div>
            <Reviews locationId={locationId} />
          </div>
        </div>
      )}
    </>
  );
}

export default LocationDetails;
