import { useParams } from "react-router-dom";
import * as spotsActions from "../../store/spotsReducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./Location.css";

function LocationDetails() {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const [spot, setSpot] = useState({});
  const [isLoading, setIsLoading] = useState("");

  useEffect(() => {
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
  }, [dispatch, locationId]);

  console.log(spot);

    const reserveHandler = () => {
        alert("Feature Coming Soon...")
    }

    
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
                        ? String(spot.avgStarRating).length === 1 ? `${spot.avgStarRating}.0` : spot.avgStarRating
                        : "New"}
                    </span>
                    <p>{`${spot.numReviews} Reviews`}</p>
                </div>
                <button id="reserve-button" onClick={reserveHandler} >Reserve</button>
            </div>
          </div>
          <div className="reviews-container">

          </div>
        </div>
      )}
    </>
  );
}

export default LocationDetails;
