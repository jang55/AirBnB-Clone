import SignupFormPage from "../SignupFormPage"
import "./Modal.css";

function SignupFormModal({ setShowModal }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.className === "modal") {
      setShowModal(false);
    }
  };

  return (
    <div className="modal" onClick={handleClick}>
      <div className="modal-content">
        <SignupFormPage />
      </div>
    </div>
  );
}

export default SignupFormModal