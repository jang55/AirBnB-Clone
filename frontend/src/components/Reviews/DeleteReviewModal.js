import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteReview from "./DeleteReview";
import { useSelector } from "react-redux";

function DeleteReviewModal({ review }) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.sessionState.user);

  return (
    <>
      {user.id === review.userId && (
        <div>
          <button
            className="delete-review-button"
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <DeleteReview review={review} setShowModal={setShowModal} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
export default DeleteReviewModal;
