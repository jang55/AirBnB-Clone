import { useDispatch } from "react-redux";
import * as bookingActions from "../../store/bookingReducer";
import "../Reviews/DeleteModal.css";

function DeleteBooking({ setShowModal, booking }) {
  const dispatch = useDispatch();

  const confirmButtonHandler = async (e) => {
    e.preventDefault();
    await dispatch(bookingActions.deleteBookingThunk(booking.id));
  };

  return (
    <div className="delete-container">
      <h1>Confirm Delete</h1>
      <h5>Are you sure you want to cancel your reserved dates?</h5>
      <button className="delete-confirm-button" onClick={confirmButtonHandler}>
        Yes (Delete Booking)
      </button>
      <button
        className="delete-deny-button"
        onClick={() => setShowModal(false)}
      >
        No (Keep Booking)
      </button>
    </div>
  );
}

export default DeleteBooking;
