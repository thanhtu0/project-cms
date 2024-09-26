import { FaRegUser } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartFlatbed, faChevronDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Search from '~/components/Search';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Error, Loading } from '~/common';

const InfoNavigation = ({ companyName, categories, categoriesLoading, categoriesError, activeTab, setActiveTab }) => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split('/')[1].toLowerCase();
        const activeCategory = categories.find((category) => category.name.toLowerCase() === path);

        if (activeCategory) {
            setActiveTab(activeCategory.name);
        }
    }, [location.pathname, categories, setActiveTab]);

    return (
        <div className="info-navigation h-12 flex flex-between px-13 py-1">
            <Button to="/" className="logo-text w-12 h-5 lh-5 fs-43" text>
                {categoriesLoading ? <Loading /> : companyName || ''}
            </Button>
            <nav>
                <ul className="flex flex-around w-17 h-12 bg-white-fc">
                    {categoriesLoading ? (
                        <li>
                            <Loading />
                        </li>
                    ) : categoriesError ? (
                        <li>
                            <Error message={categoriesError.message} />
                        </li>
                    ) : (
                        categories.map((category) => {
                            const isActive = category.name.toLowerCase() === activeTab.toLowerCase();
                            return (
                                <li key={category.id} className={isActive ? 'active' : ''}>
                                    <Button to={`/${category.name.toLowerCase()}`} text>
                                        {category.name}
                                    </Button>
                                </li>
                            );
                        })
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
                        <Button to="/signin" className="fs-8" text>
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
