import { ListHeader, ListTable, ListTitle } from '~/common/List';

import { ConfirmModal } from '~/common/Modal';
import { Pagination } from '~/common';
import { useDeleteModal, usePaginatedData } from '~/hooks';
import { BASE_URL } from '~/utils/apiURL';

const BrandList = () => {
    const {
        data: brands,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${BASE_URL}/brands`);

    const {
        showModal,
        selectedItem: selectedBrand,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal(
        `${BASE_URL}/brands`,
        handleRefresh,
        'Brand deleted successfully!',
        'Unable to delete the brand!',
    );

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
                onEdit={(brand) => `/admin/brand/edit/${brand.id}`}
                onDelete={handleShowModal}
                renderRow={(brand) => (
                    <>
                        <td style={{ width: '10px' }}>{brand.id}</td>
                        <td style={{ width: '100px', height: 'auto' }}>
                            <img
                                src={`${BASE_URL}/images/brands/${brand.imageFilename}`}
                                className="img-fluid img-cover"
                                alt={`Brand ${brand.name}`}
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
