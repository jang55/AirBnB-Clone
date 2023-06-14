import { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteBooking from "./DeleteBooking";

function DeleteBookingModal({ booking }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="manage-delete-delete-button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteBooking setShowModal={setShowModal} booking={booking} />
        </Modal>
      )}
    </>
  );
}

export default DeleteBookingModal;
