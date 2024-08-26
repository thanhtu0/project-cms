import { Link } from 'react-router-dom';
import './OrderDetailList.scss';
import NewCustomer from '../NewCustomer';
const OrderDetailList = () => {
    return (
        <div className="details">
            <div className="recentOrders">
                <div className="cardHeader">
                    <h2>Recent Orders</h2>
                    <Link to="*" className="btn">
                        View All
                    </Link>
                </div>

                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Payment</td>
                            <td>Status</td>
                        </tr>
                    </thead>

                    <tbody>
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
