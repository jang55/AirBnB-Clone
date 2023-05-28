import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spotsReducer";
import { NavLink } from "react-router-dom";
import LocationItem from "./LocationItem";

function Locations() {
  const dispatch = useDispatch();
  const SpotsState = useSelector((state) => state.spotsState);
  const allSpots = Object.values(SpotsState)
//   console.log(allSpots);

  useEffect(() => {
    (async () => {
        await dispatch(spotsAction.loadSpotsThunk())
    })();
  }, [dispatch]);
  return (
    <>
    {allSpots.length && (
        <nav>
            {allSpots.map((spot) => {
                return <NavLink key={spot.id} to={`/location/${spot.id}`}>
                    <LocationItem spot={spot}/>
                </NavLink>
            })}
        </nav>
    )}
    </>
  );
}

export default Locations;
