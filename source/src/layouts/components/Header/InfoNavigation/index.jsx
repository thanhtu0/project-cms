import { FaRegUser } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartFlatbed, faChevronDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Search from '~/components/Search';

const InfoNavigation = ({ companyName, categories, categoriesLoading, categoriesError }) => {
    return (
        <div className="info-navigation flex flex-between px-13 py-1">
            <Button to="/" className="logo-text fs-43" text>
                {categoriesLoading ? 'Loading company name...' : companyName || ''}
            </Button>
            <nav>
                <ul className="flex flex-around">
                    {categoriesLoading ? (
                        <li>Loading categories...</li>
                    ) : categoriesError ? (
                        <li>Error loading categories</li>
                    ) : (
                        categories.map((category) => (
                            <li key={category.id}>
                                <Button to={`/${category.name.toLowerCase()}`} text>
                                    {category.name}
                                </Button>
                            </li>
                        ))
                    )}
                </ul>
            </nav>
            <Search
                placeholder="Search product"
                buttonText="Search"
                width="380px"
                buttonWidth="100px"
                onSearch={() => {
                    /* Handle search */
                }}
            />

            <div className="account flex">
                <FaRegUser className="mr-1" />
                <div className="account-text flex flex-column">
                    <div className="up flex">
                        <Button to="/login" className="fs-8" text>
                            Log in
                        </Button>{' '}
                        /
                        <Button to="/register" className="fs-8" text>
                            Sign up
                        </Button>
                    </div>
                    <div className="down flex">
                        <p className="fs-14">Account</p>
                        <FontAwesomeIcon className="icon fs-16" icon={faChevronDown} />
                    </div>
                </div>
            </div>

            <div className="wishlist flex h-2">
                <Button to="/wishlist" leftIcon={<FontAwesomeIcon icon={faHeart} />} iconSize="2rem" text>
                    Wishlist
                </Button>
            </div>

            <div className="cart flex h-2">
                <Button to="/cart" leftIcon={<FontAwesomeIcon icon={faCartFlatbed} />} iconSize="2rem" text>
                    Cart
                </Button>
            </div>
        </div>
    );
};

export default InfoNavigation;
