import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ListHeader, ListTitle } from '~/components/List';
import Pagination from '~/components/Pagination';

const SubCategoryList = () => {
    const [subcategories, setSubCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;
    const navigate = useNavigate();
    const location = useLocation();

    const getSubCategories = (page = 1) => {
        fetch('http://localhost:4000/subcategories')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch data');
            })
            .then((data) => {
                const startIndex = (page - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const paginatedData = data.slice(startIndex, endIndex);

                setSubCategories(paginatedData);
                setTotalItems(data.length);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(query.get('page'), 10);

        if (pageFromUrl && pageFromUrl > 0) {
            setCurrentPage(pageFromUrl);
        } else {
            setCurrentPage(1);
        }
    }, [location.search]);

    useEffect(() => {
        getSubCategories(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (currentPage === 1) {
            navigate('/admin/subcategories', { replace: true });
        } else {
            navigate(`/admin/subcategories?page=${currentPage}`, { replace: true });
        }
    }, [currentPage, navigate]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleRefresh = () => {
        // Logic để refresh SubCategories
    };

    return (
        <>
            <div className="list">
                <ListHeader
                    title="Products List"
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
