import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';
import useModal from '~/hooks/useModal';

const PlayVideo = ({ isOpen, onClose, children }) => {
    const { handleClickOutside } = useModal(isOpen, onClose);

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay position-fixed top-0 left-0 w-100 h-100 flex flex-center z-999"
            onClick={handleClickOutside}
        >
            <div className="modal-video position-relative bg-black p-2">
                <button className="close-button position-absolute top-0" onClick={onClose}>
                    <FontAwesomeIcon className="icon text-white fs-24" icon={faTimes} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default PlayVideo;
