import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';
import useActiveLink from '~/hooks/useActiveLink';

const Navigation = () => {
    const listRef = useRef([]);

    useActiveLink(listRef);

    return (
        <div className="navigation position-fixed w-30 h-100 bg-black">
            <ul className="position-absolute top-0 left-0 w-100">
                {[
                    { to: '/admin', icon: 'cloud-circle-sharp', title: 'Route O.B Store' },
                    { to: '/admin', icon: 'home-outline', title: 'Dashboard' },
                    { to: '/admin/customers', icon: 'people-outline', title: 'Customers' },
                    { to: '/admin/employees', icon: 'people-circle-outline', title: 'Employees' },
                    { to: '/admin/brands', icon: 'basket-outline', title: 'Brands' },
                    { to: '/admin/banners', icon: 'extension-puzzle-outline', title: 'Banners' },
                    { to: '/admin/categories', icon: 'albums-outline', title: 'Categories' },
                    { to: '/admin/subcategories', icon: 'grid-outline', title: 'SubCategories' },
                    { to: '/admin/products', icon: 'shirt-outline', title: 'Products' },
                    { to: '/admin/information', icon: 'information-circle-outline', title: 'Information Store' },
                    { to: '/admin/messages', icon: 'chatbubble-outline', title: 'Messages' },
                    { to: '/admin/settings', icon: 'settings-outline', title: 'Settings' },
                    { to: '/admin/password', icon: 'lock-closed-outline', title: 'Password' },
                    { to: '/login', icon: 'log-out-outline', title: 'Sign Out' },
                ].map((item, index) => (
                    <li className="position-relative w-100" key={index} ref={(el) => (listRef.current[index] = el)}>
                        <Link to={item.to} title={item.title}>
                            <span className="icon position-relative text-center h-6 lh-75">
                                <ion-icon name={item.icon}></ion-icon>
                            </span>
                            <span className="title position-relative px-1 h-6 lh-6 text-start">{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navigation;
