import { useState } from 'react';
import './NavMenu.scss';
import useFetch from '~/hooks/useFetch';
import { BASE_URL } from '~/utils/apiURL';
import Button from '~/components/Button';

const NavMenu = () => {
    const { data: subcategories, loading, error } = useFetch(`${BASE_URL}/subcategories`);
    const [showAll, setShowAll] = useState(false);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading subcategories.</div>;

    const handleShowMore = () => {
        setShowAll(!showAll);
    };

    const displayedSubcategories = showAll ? subcategories : subcategories.slice(0, 9);

    return (
        <div className="wrapper-nav flex flex-center w-100 h-5">
            <div className="menu-bar flex flex-center p-1 fs-14 fw-4 h-34">
                <ul className="flex">
                    {displayedSubcategories.map((subcategory) => (
                        <li key={subcategory.id} className="h-34 flex flex-center">
                            <Button
                                to={`/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}
                                text
                                className="text-black text-center"
                                aria-label={subcategory.name}
                            >
                                {subcategory.name}
                            </Button>
                        </li>
                    ))}
                    {subcategories.length > 9 && (
                        <li className="more-subcategory h-34 fs-14 flex flex-center" onClick={handleShowMore}>
                            {showAll ? 'Show Less' : 'Show More'}
                            <div className="tooltip bg-gray-9a text-white text-center position-absolute z-1 left-50">
                                {showAll ? 'Click to show less' : 'Click to show more categories'}
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default NavMenu;
