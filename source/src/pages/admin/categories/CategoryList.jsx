import usePaginatedData from '~/components/hooks/usePaginatedData';
import { ListHeader, ListTable, ListTitle } from '~/components/List';
import Pagination from '~/components/Pagination';

const CategoryList = () => {
    const {
        data: categories,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData('http://localhost:4000/categories');

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
        </div>
    );
};

export default CategoryList;
