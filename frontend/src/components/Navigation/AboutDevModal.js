import { useState } from "react";
import { Modal } from "../../context/Modal";
import AboutDev from "./AboutDev";


function AboutDevModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowModal(true)} >About Dev</p>            
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <AboutDev />
            </Modal>
            )}
        </>
    )
};


export default AboutDevModal;