import { useState } from 'react';

const useDeleteModal = (apiUrl, handleRefresh) => {
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
                    handleRefresh(); // Refresh the list after deletion
                } else {
                    alert('Unable to delete the item!');
                }
            } catch (error) {
                alert('Unable to connect to the server!');
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
