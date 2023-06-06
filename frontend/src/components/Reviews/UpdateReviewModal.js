import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateReview from "./UpdateReview";
import { useSelector } from "react-redux";

function UpdateReviewModal({ review, pageType }) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.sessionState.user);
  
  

  return (
    <>
      {user && user.id === review.userId && (
        <div>
          <button
            className="update-review-button"
            onClick={() => setShowModal(true)}
          >
            Update
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <UpdateReview review={review} setShowModal={setShowModal} pageType={pageType}/>
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
export default UpdateReviewModal;
