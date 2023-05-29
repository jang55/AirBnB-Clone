import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spotsReducer";
import { NavLink } from "react-router-dom";
import LocationItem from "./LocationItem";
import "./Location.css"

function Locations({ isLoaded }) {
  const dispatch = useDispatch();
  const SpotsState = useSelector((state) => state.spotsState);
  const allSpots = Object.values(SpotsState)

  useEffect(() => {
    (async () => {
        await dispatch(spotsAction.loadSpotsThunk())
    })();
  }, [dispatch]);


  return (
    <>
    {isLoaded && (
        <nav className="spot-container">
            {allSpots.map((spot) => (
                <NavLink key={spot.id} to={`/locations/${spot.id}` }>
                    <LocationItem spot={spot}/>
                </NavLink>
            ))}
        </nav>
    )}
    </>
  );
}

export default Locations;
