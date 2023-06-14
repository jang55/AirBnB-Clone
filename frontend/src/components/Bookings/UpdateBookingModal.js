import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateBooking from "./UpdateBooking";

function UpdatebookingModal({ booking,}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {(
        <div>
          <button
            className="update-booking-button"
            onClick={() => setShowModal(true)}
          >
            Edit
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <UpdateBooking booking={booking} setShowModal={setShowModal}/>
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
export default UpdatebookingModal;
