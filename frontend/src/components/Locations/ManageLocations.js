import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spotsReducer";
import { NavLink, useHistory } from "react-router-dom";
import LocationCard from "./LocationCard";
import DeleteLocationModal from "./DeleteLocationModal";
import "./Location.css";

function ManageLocations({ isLoaded }) {
  const dispatch = useDispatch();
  const SpotsState = useSelector((state) => state.spotsState);
  const allSpots = Object.values(SpotsState);
  const history = useHistory();

  const createButtonHandler = () => {
    history.push("/locations/new");
  };

  const updateButtonHandler = (spotId) => {
    history.push(`/locations/${spotId}/edit`);
  };

  useEffect(() => {
    (async () => {
      await dispatch(spotsAction.loadCurrentUserSpotsThunk());
    })();
  }, [dispatch]);

  return (
    <>
      <h1>Manage Your Spots</h1>
      {allSpots.length === 0 && (
        <div>
          <h3 className="manage-location-no-spot-message">You have no Spots yet! Create a new Spot!</h3>
          <button className="create-spot-from-manage-location" onClick={createButtonHandler}>Create a New Spot</button>
        </div>
      )}
      {isLoaded && (
        <nav className="spot-container">
          {allSpots.map((spot) => (
            <div key={spot.id} className="spot-card">
              <NavLink to={`/locations/${spot.id}`}>
                <LocationCard spot={spot} />
              </NavLink>
              <div>
                <button
                  className="manage-location-update-button"
                  onClick={() => updateButtonHandler(spot.id)}
                >
                  Edit
                </button>
                <DeleteLocationModal locationId={spot.id} />
              </div>
            </div>
          ))}
        </nav>
      )}
    </>
  );
}

export default ManageLocations;
