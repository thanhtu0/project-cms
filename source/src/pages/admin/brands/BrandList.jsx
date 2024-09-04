import { ListHeader, ListTable, ListTitle } from "~/components/common/List";
import { ConfirmModal } from "~/components/common/Modal";
import Pagination from "~/components/common/Pagination";
import { useDeleteModal, usePaginatedData } from "~/components/hooks";


const BrandList = () => {
    const {
        data: brands,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData('http://localhost:4000/brands');

    const {
        showModal,
        selectedItem: selectedBrand,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal('http://localhost:4000/brands', handleRefresh);

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
