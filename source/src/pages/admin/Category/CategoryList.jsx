import { ListHeader, ListTable, ListTitle } from '~/common/List';

import { Confirm } from '~/common/Modal';
import { Pagination } from '~/common';
import { useDeleteModal, usePaginatedData } from '~/hooks';
import { CATEGORIES_URL } from '~/utils/apiURL';

const CategoryList = () => {
    const {
        data: categories,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${CATEGORIES_URL}`);

    const {
        showModal,
        selectedItem: selectedCategory,
        handleShowModal,
        handleCloseModal,
        handleConfirmDelete,
    } = useDeleteModal(
        `${CATEGORIES_URL}`,
        handleRefresh,
        'Category deleted successfully!',
        'Unable to delete the category!',
    );

    return (
        <>
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
                    onEdit={(category) => `/admin/category/edit/${category.id}`}
                    onDelete={handleShowModal}
                    renderRow={(category) => (
                        <>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                        </>
                    )}
                />
            </div>
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            <Confirm
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete category ${selectedCategory?.name}?`}
            />
        </>
    );
};

export default CategoryList;
