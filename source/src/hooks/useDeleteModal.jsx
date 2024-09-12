import { useState } from 'react';
import { toast } from 'react-toastify';

const useDeleteModal = (apiUrl, handleRefresh, successMessage, errorMessage) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleShowModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedItem) {
            try {
                const response = await fetch(`${apiUrl}/${selectedItem.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    handleRefresh();
                    toast.success(successMessage || 'Item deleted successfully!');
                } else {
                    toast.error(errorMessage || 'Unable to delete the item!');
                }
            } catch (error) {
                toast.error(errorMessage || 'Unable to connect to the server!');
            } finally {
                handleCloseModal();
            }
        }
    };

    return {
        showModal,
        selectedItem,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    };
};

export default useDeleteModal;
