import '../../styles/_modal.scss';

const Modal = ({ show, onClose, onConfirm, title, message }) => {
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
                <div className="modal-body fs-18 text-center text-black-1 fw-5 my-2">
                    <p>{message}</p>
                </div>
                <div className="modal-footer flex flex-end pt-1">
                    <button
                        className="py-1 px-2 ml-1 fs-16 btn-primary"
                        onClick={() => {
                            onConfirm();
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="py-1 px-2 ml-1 fs-16 btn-outline-default"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
