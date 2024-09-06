import { ListHeader, ListTable, ListTitle } from '~/components/common/List';
import { ConfirmModal } from '~/components/common/Modal';
import Pagination from '~/components/common/Pagination';
import { useDeleteModal, usePaginatedData } from '~/components/hooks';

const SubCategoryList = () => {
    const {
        data: subcategories,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData('http://localhost:4000/subcategories');

    const {
        showModal,
        selectedItem: selectedSubCategory,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal(
        'http://localhost:4000/subcategories',
        handleRefresh,
        'SubCategory deleted successfully!',
        'Unable to delete the subcategory!',
    );

    return (
        <div className="list">
            <ListHeader
                title="SubCategories List"
                refreshHandler={handleRefresh}
                createLink="/admin/subcategory/create"
                refreshLabel="Refresh SubCategory"
                createLabel="Create SubCategory"
            />
            <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />
            <ListTable
                headers={['ID', 'SubCategory Name', 'SubCategory Description']}
                data={subcategories}
                onEdit={(subcategory) => `/admin/subcategory/${subcategory.id}`}
                onDelete={handleShowModal}
                renderRow={(subcategory) => (
                    <>
                        <td>{subcategory.id}</td>
                        <td>{subcategory.name}</td>
                        <td>{subcategory.description}</td>
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
                message={`Are you sure you want to delete subcategory ${selectedSubCategory?.name}?`}
            />
        </div>
    );
};

export default SubCategoryList;
