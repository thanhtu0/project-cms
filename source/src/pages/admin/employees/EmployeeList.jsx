import { Link } from 'react-router-dom';
import Title from '~/components/Title';

const EmployeeList = () => {
    const employees = [1, 2, 3, 4, 5, 6, 7];
    return (
        <>
            <div className="list">
                <div className="list__header">
                    <Title text="Employees List" />
                    <div className="list__btn-group">
                        <Link to="*" className="btn btn-outline-primary">
                            Refresh Employee
                        </Link>
                        <Link to="/admin/category/create" className="btn btn-primary">
                            Create Employee
                        </Link>
                    </div>
                </div>
                <div className="list__title">
                    <p>There are 10 employees. Currently on page 10 of 10 total pages.</p>
                </div>
                <div className="list__employee">
                    {employees.map((employee, index) => (
                        <div key={index} className="card">
                            <div className="profile">
                                <div className="title">
                                    <div className="left_title">
                                        <h4>Lưu Lê Thanh Tú</h4>
                                    </div>
                                    <div className="right_title">
                                        <Link className="btn-xs btn-primary">
                                            <ion-icon name="create-outline"></ion-icon>
                                        </Link>
                                        <Link className="btn-xs btn-warning">
                                            <ion-icon name="key-outline"></ion-icon>
                                        </Link>
                                        <Link className="btn-xs btn-danger">
                                            <ion-icon name="trash-outline"></ion-icon>
                                        </Link>
                                    </div>
                                </div>
                                <div className="body">
                                    <div className="left-info">
                                        <img
                                            src="/logo_1.png"
                                            alt="Images employee"
                                            className="img-responsive profile-user-img"
                                        />
                                    </div>
                                    <div className="right-info">
                                        <ul>
                                            <li>
                                                <ion-icon name="calendar-outline"></ion-icon>
                                                03/01/2002
                                            </li>
                                            <li>
                                                <ion-icon name="call-outline"></ion-icon> 0932547683
                                            </li>
                                            <li className="email">
                                                <ion-icon name="mail-outline"></ion-icon>
                                                thanhtuluu0301@gmail.com
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EmployeeList;
