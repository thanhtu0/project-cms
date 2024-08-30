import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Title from '~/components/Title';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 9;
    const navigate = useNavigate();
    const location = useLocation();

    const getEmployees = (page = 1) => {
        fetch(`http://localhost:4000/employees`)
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

                setEmployees(paginatedData);
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
        getEmployees(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (currentPage === 1) {
            navigate('/admin/employees', { replace: true });
        } else {
            navigate(`/admin/employees?page=${currentPage}`, { replace: true });
        }
    }, [currentPage, navigate]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            <div className="list">
                <div className="list__header">
                    <Title text="Employees List" />
                    <div className="list__btn-group">
                        <button onClick={() => getEmployees(currentPage)} className="btn btn-outline-primary">
                            Refresh Employee
                        </button>
                        <Link to="/admin/employee/create" className="btn btn-primary">
                            Create Employee
                        </Link>
                    </div>
                </div>
                <div className="list__title">
                    <p>
                        There are {totalItems} employees. Currently on page {currentPage} of {totalPages} total pages.
                    </p>
                </div>
                <div className="list__employee">
                    {employees.map((employee) => (
                        <div key={employee.id} className="card">
                            <div className="profile">
                                <div className="title">
                                    <div className="left_title">
                                        <h4>{employee.fullName}</h4>
                                    </div>
                                    <div className="right_title">
                                        <Link
                                            className="btn-xs btn-primary"
                                            to={'/admin/employees/edit/' + employee.id}
                                        >
                                            <ion-icon name="create-outline"></ion-icon>
                                        </Link>
                                        <Link
                                            className="btn-xs btn-warning"
                                            to={'/admin/employees/reset-password/' + employee.id}
                                        >
                                            <ion-icon name="key-outline"></ion-icon>
                                        </Link>
                                        <button type="button" className="btn-xs btn-danger">
                                            <ion-icon name="trash-outline"></ion-icon>
                                        </button>
                                    </div>
                                </div>
                                <div className="body">
                                    <div className="left-info">
                                        <img
                                            src={`http://localhost:4000/images/employees/${employee.imageFilename}`}
                                            className="img-responsive profile-user-img"
                                            alt={employee.fullName}
                                        />
                                    </div>
                                    <div className="right-info">
                                        <ul>
                                            <li>
                                                <ion-icon name="calendar-outline"></ion-icon>
                                                {new Date(employee.birthDate).toLocaleDateString()}
                                            </li>
                                            <li>
                                                <ion-icon name="call-outline"></ion-icon>
                                                {employee.phone ? (
                                                    employee.phone
                                                ) : (
                                                    <>
                                                        Pending update
                                                        <span
                                                            className="info-icon"
                                                            value="You haven't added this information."
                                                        >
                                                            i
                                                        </span>
                                                    </>
                                                )}
                                            </li>
                                            <li>
                                                <ion-icon name="mail-outline"></ion-icon> <br />
                                                {employee.email}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
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
                )}
            </div>
        </>
    );
};

export default EmployeeList;
