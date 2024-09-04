import usePaginatedData from '~/components/hooks/usePaginatedData';
import { ListHeader, ListTable, ListTitle } from '~/components/List';
import Pagination from '~/components/Pagination';

const SubCategoryList = () => {
    const {
        data: subcategories,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData('http://localhost:4000/subcategories');

    return (
        <>
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
                    headers={['ID', 'SubCategory Name']}
                    data={subcategories}
                    onEdit={(subcategory) => `/admin/subcategory/${subcategory.id}`}
                    onDelete={handleShowModal}
                    renderRow={(subcategory) => (
                        <>
                            <td>{subcategory.id}</td>
                            <td>{subcategory.name}</td>
                        </>
                    )}
                />

                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                )}
            </div>
        </>
    );
};

export default SubCategoryList;
