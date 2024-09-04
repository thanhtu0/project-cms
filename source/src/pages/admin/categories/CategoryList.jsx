import { Link } from 'react-router-dom';
import usePaginatedData from '~/components/hooks/usePaginatedData';
import { ListHeader, ListTitle } from '~/components/List';
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
        <>
            <div className="list">
                <ListHeader
                    title="Categories List"
                    refreshHandler={handleRefresh}
                    createLink="/admin/product/create"
                    refreshLabel="Refresh Category"
                    createLabel="Create Category"
                />
                <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />
                <table className="list__table">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Category Name</td>
                            <td>Category Description</td>
                            <td>Actions</td>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td
                                    style={{
                                        width: '10px',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <Link
                                        className="btn btn-primary btn-icon"
                                        to={'/admin/categories/edit/' + category.id}
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

export default CategoryList;
