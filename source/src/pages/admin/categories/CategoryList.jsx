import { ListHeader, ListTable, ListTitle } from '~/components/common/List';
import { ConfirmModal } from '~/components/common/Modal';
import Pagination from '~/components/common/Pagination';
import { useDeleteModal, usePaginatedData } from '~/components/hooks';
import { BASE_URL } from '~/components/utils/apiURL';

const CategoryList = () => {
    const {
        data: categories,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${BASE_URL}/categories`);

    const {
        showModal,
        selectedItem: selectedCategory,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal(
        `${BASE_URL}/categories`,
        handleRefresh,
        'Category deleted successfully!',
        'Unable to delete the category!',
    );

    return (
        <div className="list">
            <ListHeader
                title="Categories List"
                refreshHandler={handleRefresh}
                createLink="/admin/category/create"
                refreshLabel="Refresh Category"
                createLabel="Create Category"
            />
            <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />
            <ListTable
                headers={['ID', 'Category Name', 'Category Description']}
                data={categories}
                onEdit={(category) => `/admin/category/${category.id}`}
                onDelete={handleShowModal}
                renderRow={(category) => (
                    <>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
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
                message={`Are you sure you want to delete category ${selectedCategory?.name}?`}
            />
        </div>
    );
};

export default CategoryList;
