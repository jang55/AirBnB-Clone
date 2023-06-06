import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spotsReducer";
import { NavLink } from "react-router-dom";
import LocationCard from "./LocationCard";
import "./Location.css";

function Locations({ isLoaded }) {
  const dispatch = useDispatch();
  const SpotsState = useSelector((state) => state.spotsState);
  const allSpots = Object.values(SpotsState);

  useEffect(() => {
    (async () => {
      await dispatch(spotsAction.loadSpotsThunk());
    })();
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <nav className="spot-container">
          {allSpots.map((spot) => (
            <div key={spot.id} className="spot-card">
              <NavLink to={`/locations/${spot.id}`}>
                <LocationCard spot={spot} />
              </NavLink>
            </div>
          ))}
        </nav>
      )}
    </>
  );
}

export default Locations;
