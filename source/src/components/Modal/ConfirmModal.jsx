import '../GlobalStyles/_modal.scss';

const Modal = ({ show, onClose, onConfirm, title, message }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            onConfirm();
                            console.log('Confirm button clicked');
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="btn btn-outline-default"
                        onClick={() => {
                            onClose();
                            console.log('Cancel button clicked');
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
