import { Pagination } from '~/common';
import { ListHeader, ListTitle } from '~/common/List';
import Button from '~/components/Button';
import { usePaginatedData } from '~/hooks';
import { API_BASE_URL } from '~/utils/apiURL';

const EmployeeList = () => {
    const itemsPerPage = 9;

    const {
        data: employees,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    } = usePaginatedData(`${API_BASE_URL}/employees`, itemsPerPage);

    return (
        <>
            <div className="list">
                <ListHeader
                    title="Products List"
                    refreshHandler={handleRefresh}
                    createLink="/admin/employee/create"
                    refreshLabel="Refresh Employee"
                    createLabel="Create Employee"
                />
                <ListTitle totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} />
                <div className="list__employee position-relative p-2 w-100 mt-1 grid">
                    {employees.map((employee) => (
                        <div key={employee.id} className="card position-relative bg-gray-f1 flex-column">
                            <div className="profile flex-column h-100">
                                <div className="title flex flex-between h-4 px-15">
                                    <div className="left_title">
                                        <h4 className="fs-18 fw-5">{employee.fullName}</h4>
                                    </div>
                                    <div className="right_title flex flex-end">
                                        <Button
                                            to={'/admin/employees/edit/' + employee.id}
                                            className="w-3 h-3"
                                            iconSize="1.6rem"
                                            primary
                                        >
                                            <ion-icon className="fs-16" name="create-outline"></ion-icon>
                                        </Button>
                                        <Button
                                            to={'/admin/employees/reset-password/' + employee.id}
                                            className="w-3 h-3"
                                            iconSize="1.6rem"
                                            warning
                                        >
                                            <ion-icon className="fs-16" name="key-outline"></ion-icon>
                                        </Button>
                                        <Button
                                            type="button"
                                            className="w-3 h-3"
                                            danger
                                            iconSize="1.6rem"
                                            onClick={() => {}}
                                        >
                                            <ion-icon
                                                className="fs-16 flex flex-center"
                                                name="trash-outline"
                                            ></ion-icon>
                                        </Button>
                                    </div>
                                </div>
                                <div className="body mt-1 px-15 grid">
                                    <div className="left-info">
                                        <img
                                            src={`${API_BASE_URL}/images/employees/${employee.imageFilename}`}
                                            className="img-fluid profile-user-img"
                                            alt={employee.fullName}
                                        />
                                    </div>
                                    <div className="right-info">
                                        <ul className="fs-14">
                                            <li className="px-15 py-1">
                                                <ion-icon name="calendar-outline"></ion-icon>
                                                {new Date(employee.birthDate).toLocaleDateString()}
                                            </li>
                                            <li className="px-15 py-1">
                                                <ion-icon name="call-outline"></ion-icon>
                                                {employee.phone ? (
                                                    employee.phone
                                                ) : (
                                                    <>
                                                        Pending update
                                                        <span
                                                            className="info-icon bg-white fw-7 text-center lh-16 position-relative"
                                                            value="You haven't added this information."
                                                        >
                                                            i
                                                        </span>
                                                    </>
                                                )}
                                            </li>
                                            <li className="px-15 py-1">
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
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                )}
            </div>
        </>
    );
};

export default EmployeeList;
