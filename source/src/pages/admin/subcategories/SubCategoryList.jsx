import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '~/components/Title';

const SubCategoryList = () => {
    const [subcategories, setSubCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

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
        getSubCategories(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            <div className="list">
                <div className="list__header">
                    <Title text="SubCategories List" />
                    <div className="list__btn-group">
                        <Link to="#" className="btn btn-outline-primary">
                            Refresh SubCategory
                        </Link>
                        <Link to="/admin/subcategories/create" className="btn btn-primary">
                            Create SubCategory
                        </Link>
                    </div>
                </div>
                <div className="list__title">
                    <p>
                        There are {totalItems} sub categories. Currently on page {currentPage} of {totalPages} total
                        pages.
                    </p>
                </div>
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
                <div className="list__pagination">
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default SubCategoryList;
