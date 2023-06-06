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

  useEffect(() => {
    (async () => {
      await dispatch(spotsAction.loadCurrentUserSpotsThunk());
    })();
  }, [dispatch]);

  return (
    <>
      <h1>Manage Your Spots</h1>
      {allSpots.length === 0 && <button onClick={createButtonHandler}>Create a New Spot</button>}
      {isLoaded && (
        <nav className="spot-container">
          {allSpots.map((spot) => (
            <div key={spot.id} className="spot-card">
              <NavLink to={`/locations/${spot.id}`}>
                <LocationCard spot={spot} />
              </NavLink>
              <div>
                <button>
                  <NavLink to={`/locations/${spot.id}/edit`}>
                    Update
                  </NavLink>
                </button>
                <DeleteLocationModal locationId={spot.id}/>
              </div>
            </div>
          ))}
        </nav>
      )}
    </>
  );
}

export default ManageLocations;
