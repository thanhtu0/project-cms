import { useState } from 'react';
import usePaginatedData from '~/components/hooks/usePaginatedData';
import { ListHeader, ListTable, ListTitle } from '~/components/List';
import ConfirmModal from '~/components/Modal/ConfirmModal';
import Pagination from '~/components/Pagination';

const BrandList = () => {
    const {
        data: brands,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData('http://localhost:4000/brands');

    const [showModal, setShowModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const handleShowModal = (brand) => {
        setSelectedBrand(brand);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBrand(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedBrand) {
            try {
                const response = await fetch(`http://localhost:4000/brands/${selectedBrand.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    handleRefresh(); // Refresh the list after deletion
                } else {
                    alert('Unable to delete the category!');
                }
            } catch (error) {
                alert('Unable to connect to the server!');
            } finally {
                handleCloseModal();
            }
        }
    };

    return (
        <div className="list">
            <ListHeader
                title="Brands List"
                refreshHandler={handleRefresh}
                createLink="/admin/brand/create"
                refreshLabel="Refresh Brand"
                createLabel="Create Brand"
            />
            <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />

            <ListTable
                headers={['ID', 'Image', 'Brand Name']}
                data={brands}
                onEdit={(brand) => `/admin/brand/${brand.id}`}
                onDelete={handleShowModal}
                renderRow={(brand) => (
                    <>
                        <td style={{ width: '10px' }}>{brand.id}</td>
                        <td style={{ width: '100px', height: 'auto' }}>
                            <img
                                src={`http://localhost:4000/images/brands/${brand.imageFilename}`}
                                className="img-responsive"
                                alt="..."
                            />
                        </td>
                        <td>{brand.name}</td>
                    </>
                )}
            />

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            <ConfirmModal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete brand ${selectedBrand?.name}?`}
            />
        </div>
    );
};

export default BrandList;
