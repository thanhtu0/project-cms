import { ListHeader, ListTable, ListTitle } from '~/common/List';

import { Confirm } from '~/common/Modal';
import { Pagination } from '~/common';
import { useDeleteModal, usePaginatedData } from '~/hooks';
import { BRAND_IMAGES, BRANDS_URL } from '~/utils/apiURL';

const BrandList = () => {
    const {
        data: brands,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${BRANDS_URL}`);

    const {
        showModal,
        selectedItem: selectedBrand,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal(`${BRANDS_URL}`, handleRefresh, 'Brand deleted successfully!', 'Unable to delete the brand!');

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
                        <td style={{ width: '20px' }}>{brand.id}</td>
                        <td style={{ width: '150px', height: 'auto' }}>
                            <img
                                src={`${BRAND_IMAGES}/${brand.imageFilename}`}
                                className="img-fluid img-cover w-100"
                                alt={`Brand ${brand.name}`}
                            />
                        </td>
                        <td className="text-center">{brand.name}</td>
                    </>
                )}
            />
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            <Confirm
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
