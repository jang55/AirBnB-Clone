import { useState } from "react";
import { Modal } from "../../context/Modal";
import ReserveBooking from "./ReserveBooking";


function ReserveBookingModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id="reserve-button" onClick={() => setShowModal(true)} >Reserve</button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <ReserveBooking />
            </Modal>
          )}
        </>
    )
};


export default ReserveBookingModal;