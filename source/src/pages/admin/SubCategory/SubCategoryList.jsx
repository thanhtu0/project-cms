import { Pagination } from '~/common';
import { ListHeader, ListTable, ListTitle } from '~/common/List';
import { Confirm } from '~/common/Modal';
import { useDeleteModal, usePaginatedData } from '~/hooks';
import { SUBCATEGORIES_URL } from '~/utils/apiURL';

const SubCategoryList = () => {
    const {
        data: subcategories,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${SUBCATEGORIES_URL}`);

    const {
        showModal,
        selectedItem: selectedSubCategory,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal(
        `${SUBCATEGORIES_URL}`,
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
                onEdit={(subcategory) => `/admin/subcategory/edit/${subcategory.id}`}
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
            <Confirm
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
