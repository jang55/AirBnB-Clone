import CurrentUserBookingCard from "./CurrentUserBookingCard";
import * as bookingActions from "../../store/bookingReducer";
import DeleteBookingModal from "./DeleteBookingModal";
import UpdatebookingModal from "./UpdateBookingModal";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function ManageBookings({ isLoaded }) {
  const dispatch = useDispatch();
  const bookingsState = useSelector((state) => state.bookingState);
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    (async () => {
      await dispatch(bookingActions.loadUserBookingsThunk());
    })();
  }, [dispatch]);

  useEffect(() => {
    setAllBookings(Object.values(bookingsState));
  }, [bookingsState]);

  //   useEffect(() => {
  //     console.log(allBookings);
  //   }, [allBookings]);

  return (
    <>
      <h1>Manage Your Bookings</h1>
      {allBookings.length === 0 && (
        <h3 className="manage-location-no-spot-message">
          You have no Bookings yet!
        </h3>
      )}
      {isLoaded && (
        <nav className="booking-container">
          {allBookings.map((booking, i) => (
            <div key={`${booking.id}${i}`} className={"spot-booking-card"}>
              <NavLink to={`/locations/${booking.spotId}`}>
                <CurrentUserBookingCard booking={booking} />
              </NavLink>
              {new Date(booking.endDate).getTime() > new Date().getTime() ? <div className="booking-buttons-wrapper">
                <UpdatebookingModal booking={booking}/>
                <DeleteBookingModal booking={booking}/>
              </div> : <p>Out-of-date Reservation</p>}
            </div>
          ))}
        </nav>
      )}
    </>
  );
}

export default ManageBookings;
