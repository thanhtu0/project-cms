import Button from '../../components/Button';
import './Modal.scss';

const Confirm = ({ show, onClose, onConfirm, title, message }) => {
    if (!show) return null;

    return (
        <div
            className="modal-overlay w-100 h-100 flex flex-center position-absolute top-0 left-0 right-0 bottom-0  z-1000"
            aria-hidden={!show}
        >
            <div className="modal-content position-relative bg-white p-2">
                <div className="modal-header flex flex-between">
                    <h2>{title}</h2>
                    <button className="close-button fs-24" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body fs-18 text-center text-black-1 fw-4 my-2">
                    <p>{message}</p>
                </div>
                <div className="modal-footer flex flex-end pt-1">
                    <Button
                        onClick={() => {
                            onConfirm();
                        }}
                        primary
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => {
                            onClose();
                        }}
                        secondary
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
