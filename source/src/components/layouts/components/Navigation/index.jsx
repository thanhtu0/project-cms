import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';
import useActiveLink from '~/components/hooks/useActiveLink';

const Navigation = () => {
    const listRef = useRef([]);

    useActiveLink(listRef);

    return (
        <div className="container">
            <div className="navigation">
                <ul>
                    {[
                        { to: '/admin', icon: 'cloud-circle-sharp', title: 'Route O.B Store' },
                        { to: '/admin', icon: 'home-outline', title: 'Dashboard' },
                        { to: '/admin/customers', icon: 'people-outline', title: 'Customers' },
                        { to: '/admin/employees', icon: 'people-circle-outline', title: 'Employees' },
                        { to: '/admin/brands', icon: 'basket-outline', title: 'Brands' },
                        { to: '/admin/categories', icon: 'albums-outline', title: 'Categories' },
                        { to: '/admin/subcategories', icon: 'grid-outline', title: 'SubCategories' },
                        { to: '/admin/products', icon: 'shirt-outline', title: 'Products' },
                        { to: '/admin/info', icon: 'information-circle-outline', title: 'Information Store' },
                        { to: '/admin/messages', icon: 'chatbubble-outline', title: 'Messages' },
                        { to: '/admin/settings', icon: 'settings-outline', title: 'Settings' },
                        { to: '/admin/password', icon: 'lock-closed-outline', title: 'Password' },
                        { to: '/login', icon: 'log-out-outline', title: 'Sign Out' },
                    ].map((item, index) => (
                        <li key={index} ref={(el) => (listRef.current[index] = el)}>
                            <Link to={item.to} title={item.title}>
                                <span className="icon">
                                    <ion-icon name={item.icon}></ion-icon>
                                </span>
                                <span className="title">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
