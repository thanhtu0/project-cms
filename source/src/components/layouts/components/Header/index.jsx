import { useState, useEffect } from 'react';
import { faCartFlatbed, faChevronDown, faHeart, faLocationDot, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRegUser } from 'react-icons/fa';
import { IoIosStar } from 'react-icons/io';
import { BASE_URL } from '~/components/utils/apiURL';
import { Link } from 'react-router-dom';
import './Header.scss';
import { NavMenu } from '..';

const Header = () => {
    const [infoItems, setInfoItems] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/contact`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    const contact = data[0];
                    setCompanyName(contact.companyName || '');
                    setInfoItems([
                        {
                            icon: faPhoneVolume,
                            text: contact.telephone || 'N/A',
                            className: 'phone',
                        },
                        {
                            icon: faLocationDot,
                            text: contact.address || 'N/A',
                            className: 'address',
                        },
                    ]);
                } else {
                    console.error('Contact data is missing or empty:', data);
                }
            })
            .catch((error) => console.error('Error fetching contact info:', error));
    }, []);

    useEffect(() => {
        fetch(`${BASE_URL}/categories`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setCategories(data);
                } else {
                    console.error('Categories data is missing or empty:', data);
                }
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    return (
        <header className="header flex-column">
            <div className="info-header text-white bg-black flex flex-between px-13">
                <div className="left-info">
                    {infoItems.map((item, index) => (
                        <div key={index} className={item.className}>
                            <FontAwesomeIcon className="fs-14" icon={item.icon} />
                            <p className="fs-12 lh-15 ml-1">{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className="right-info">
                    {Array.from({ length: 5 }, (_, index) => (
                        <IoIosStar className="icon" key={index} />
                    ))}
                    <p className="fs-12 lh-15 ml-1">33400 Five Star Service Reviews</p>
                </div>
            </div>

            <div className="info-navigation flex flex-between px-13 py-1">
                <Link to="/" className="logo-text fs-43">
                    {companyName || ''}
                </Link>

                <nav>
                    <ul className="flex flex-around">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link to={`/${category.name.toLowerCase()}`}>{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="account flex">
                    <FaRegUser className="account-icon  mr-2" />

                    <div className="account-text flex flex-column">
                        <div className="up flex">
                            <Link className="fs-10" to="/login">
                                Log in
                            </Link>
                            /
                            <Link className="fs-10" to="/register">
                                Sign up
                            </Link>
                        </div>
                        <div className="down flex">
                            <p className="fs-14">Account</p>
                            <FontAwesomeIcon className="icon fs-16" icon={faChevronDown} />
                        </div>
                    </div>
                </div>

                <div className="wishlist flex h-2">
                    <FontAwesomeIcon icon={faHeart} className="fs-20" />
                    <Link to="/wishlist" className="ml-2 fs-14 lh-18">
                        Wishlist
                    </Link>
                </div>

                <div className="cart flex h-2">
                    <FontAwesomeIcon icon={faCartFlatbed} className="fs-20" />
                    <Link to="/cart" className="ml-2 fs-14 lh-18">
                        Cart
                    </Link>
                </div>
            </div>

            <NavMenu />
        </header>
    );
};

export default Header;
