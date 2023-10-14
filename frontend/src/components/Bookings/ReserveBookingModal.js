import { useState } from "react";
import { Modal } from "../../context/Modal";
import ReserveBooking from "./ReserveBooking";
import { useSelector } from "react-redux";

function ReserveBookingModal({ spot }) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.sessionState.user);

  return (
    <>
      {
        <button
          id="reserve-button"
          onClick={() => {
            if (!user) {
              alert("Please login to continue making reservations");
              return;
            }
            if (user.id === spot.ownerId) {
              alert("Owners can not book there own spot!");
              return;
            }
            setShowModal(true);
          }}
        >
          Reserve
        </button>
      }
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReserveBooking spot={spot} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ReserveBookingModal;
