import { Link } from 'react-router-dom';
import usePaginatedData from '~/components/hooks/usePaginatedData';
import { ListHeader, ListTitle } from '~/components/List';
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
                    createLink="/admin/product/create"
                    refreshLabel="Refresh SubCategory"
                    createLabel="Create SubCategory"
                />
                <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />
                <table className="list__table">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>SubCategory Name</td>
                            <td>Actions</td>
                        </tr>
                    </thead>

                    <tbody>
                        {subcategories.map((subcategory) => (
                            <tr key={subcategory.id}>
                                <td>{subcategory.id}</td>
                                <td>{subcategory.name}</td>
                                <td
                                    style={{
                                        width: '100px',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <Link
                                        className="btn btn-primary btn-icon"
                                        to={'/admin/categories/edit/' + subcategory.id}
                                    >
                                        <ion-icon name="create-outline"></ion-icon>
                                    </Link>
                                    <button type="button" className="btn btn-danger btn-icon">
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                )}
            </div>
        </>
    );
};

export default SubCategoryList;
