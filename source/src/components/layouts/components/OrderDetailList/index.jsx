import { Link } from 'react-router-dom';
import './OrderDetailList.scss';
import NewCustomer from '../NewCustomer';
const OrderDetailList = () => {
    return (
        <div className="details position-relative w-100 p-2 grid">
            <div className="recentOrders position-relative grid bg-white p-2">
                <div className="cardHeader flex-between">
                    <h2 className="fw-6 text-black">Recent Orders</h2>
                    <Link to="*" className="btn position-relative bg-black text-white">
                        View All
                    </Link>
                </div>

                <table className='w-100 mt-1'>
                    <thead>
                        <tr>
                            <td className="fw-6">Name</td>
                            <td className="fw-6">Price</td>
                            <td className="fw-6">Payment</td>
                            <td className="fw-6">Status</td>
                        </tr>
                    </thead>

                    <tbody className='text-black-1'>
                        <tr>
                            <td>Star Refrigerator</td>
                            <td>$1200</td>
                            <td>Paid</td>
                            <td>
                                <span className="status status-delivered">Delivered</span>
                            </td>
                        </tr>

                        <tr>
                            <td>Dell Laptop</td>
                            <td>$110</td>
                            <td>Due</td>
                            <td>
                                <span className="status status-pending">Pending</span>
                            </td>
                        </tr>

                        <tr>
                            <td>App Watch</td>
                            <td>$1200</td>
                            <td>Paid</td>
                            <td>
                                <span className="status status-return">Return</span>
                            </td>
                        </tr>

                        <tr>
                            <td>Adidas Shoes</td>
                            <td>$620</td>
                            <td>Due</td>
                            <td>
                                <span className="status status-inProgress">In Progress</span>
                            </td>
                        </tr>

                        <tr>
                            <td>Star Refrigerator</td>
                            <td>$1200</td>
                            <td>Paid</td>
                            <td>
                                <span className="status status-delivered">Delivered</span>
                            </td>
                        </tr>

                        <tr>
                            <td>Dell Laptop</td>
                            <td>$110</td>
                            <td>Due</td>
                            <td>
                                <span className="status status-pending">Pending</span>
                            </td>
                        </tr>

                        <tr>
                            <td>App Watch</td>
                            <td>$1200</td>
                            <td>Paid</td>
                            <td>
                                <span className="status status-return">Return</span>
                            </td>
                        </tr>

                        <tr>
                            <td>Adidas Shoes</td>
                            <td>$620</td>
                            <td>Due</td>
                            <td>
                                <span className="status status-inProgress">In Progress</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <NewCustomer />
        </div>
    );
};

export default OrderDetailList;
