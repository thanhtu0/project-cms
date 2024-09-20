import { useCallback } from 'react';

const useModal = (isOpen, onClose) => {
    const handleClickOutside = useCallback(
        (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                onClose();
            }
        },
        [onClose],
    );

    return {
        isOpen,
        handleClickOutside,
    };
};

export default useModal;
