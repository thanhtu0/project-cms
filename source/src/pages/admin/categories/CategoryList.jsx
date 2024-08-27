import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '~/components/Title';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    const getCategories = (page = 1) => {
        fetch(`http://localhost:4000/categories?_page=${page}&_limit=${itemsPerPage}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then((data) => {
                setCategories(data);
                setTotalItems(data.length);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            })
            .catch((error) => {
                alert('Unable to get the data');
            });
    };

    useEffect(() => {
        getCategories(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="list">
                <div className="list__header">
                    <Title text="Categories List" />
                    <div className="list__btn-group">
                        <Link to="*" className="btn btn-outline-primary">
                            Refresh Category
                        </Link>
                        <Link to="/admin/category/create" className="btn btn-primary">
                            Create Category
                        </Link>
                    </div>
                </div>
                <div className="list__title">
                    <p>
                        There are {totalItems} items. Currently on page {currentPage} of {totalPages} total pages.
                    </p>
                </div>
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
                                <td>{category.categoryName}</td>
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

export default CategoryList;
