import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartFlatbed, faChevronDown, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';

const InfoNavigation = ({ companyName, categories, categoriesLoading, categoriesError }) => {
    return (
        <div className="info-navigation flex flex-between px-13 py-1">
            <Link to="/" className="logo-text fs-43">
                {categoriesLoading ? 'Loading company name...' : companyName || ''}
            </Link>

            <nav>
                <ul className="flex flex-around">
                    {categoriesLoading ? (
                        <li>Loading categories...</li>
                    ) : categoriesError ? (
                        <li>Error loading categories</li>
                    ) : (
                        categories.map((category) => (
                            <li key={category.id}>
                                <Link to={`/${category.name.toLowerCase()}`}>{category.name}</Link>
                            </li>
                        ))
                    )}
                </ul>
            </nav>

            <div className="search-bar position-relative">
                <input className="w-100 h-100" type="text" placeholder="Search product" />
                <button type="submit" className="position-absolute right-0 h-100 bg-black text-white">
                    <FontAwesomeIcon className="fs-14" icon={faSearch} />
                    <span className="fs-14">Search</span>
                </button>
            </div>

            <div className="account flex">
                <FaRegUser className="account-icon mr-2" />
                <div className="account-text flex flex-column">
                    <div className="up flex">
                        <Link className="fs-8" to="/login">
                            Log in
                        </Link>{' '}
                        /
                        <Link className="fs-8" to="/register">
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
    );
};

export default InfoNavigation;
