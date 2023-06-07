import { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteLocation from "./DeleteLocation";


function DeleteLocationModal({locationId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="manage-location-delete-button" onClick={() => setShowModal(true)} >Delete</button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <DeleteLocation setShowModal={setShowModal} locationId={locationId}/>
            </Modal>
          )}
        </>
    )
};


export default DeleteLocationModal;