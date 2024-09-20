import useModal from '~/hooks/useModal';
import './Modal.scss';

const Modal = ({ isOpen, onClose, messageTitle, messageBody }) => {
    const { handleClickOutside } = useModal(isOpen, onClose);

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay position-fixed top-0 left-0 w-100 h-100 flex flex-center"
            onClick={handleClickOutside}
        >
            <div className="modal-content bg-white p-2 text-center position-relative z-1">
                <h2 className="modal-title fs-24 fw-700 mt-1">{messageTitle}</h2>
                <p className="modal-body mt-1 fs-16 text-black-2">{messageBody}</p>
                <button onClick={onClose} className="modal-close-button mt-2 py-1 px-2 text-white bg-primary">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
