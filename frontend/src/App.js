import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Locations from "./components/Locations";
import LocationDetails from "./components/Locations/locationDetails";
import LocationForm from "./components/Locations/LocationForm";
import ManageLocations from "./components/Locations/ManageLocations";
import UpdateLocationForm from "./components/Locations/UpdateLocationForm";
import ManageReviews from "./components/Reviews/ManageReviews";
import ManageBookings from "./components/Bookings/ManageBooking";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Locations isLoaded={isLoaded} />
          </Route>
          <Route path="/locations/new">
            <LocationForm />
          </Route>
          <Route path="/currentUser/locations">
            <ManageLocations isLoaded={isLoaded} />
          </Route>
          <Route path="/currentUser/reviews">
            <ManageReviews isLoaded={isLoaded} />
          </Route>
          <Route path="/currentUser/bookings">
            <ManageBookings isLoaded={isLoaded} />
          </Route>
          <Route exact path="/locations/:locationId">
            <LocationDetails />
          </Route>
          <Route exact path="/locations/:locationId/edit">
            <UpdateLocationForm />
          </Route>
          <Route>
            <h1>404 Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
