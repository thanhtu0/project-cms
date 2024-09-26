import { useState } from 'react';
import './NavMenu.scss';
import useFetch from '~/hooks/useFetch';
import { SUBCATEGORIES_URL } from '~/utils/apiURL';
import Button from '~/components/Button';
import { Error, Loading } from '~/common';

const NavMenu = () => {
    const { data: subcategories, loading, error } = useFetch(`${SUBCATEGORIES_URL}`);
    const [showAll, setShowAll] = useState(false);

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;
    if (!subcategories || subcategories.length === 0) {
        return <Error message="No subcategories..." />;
    }

    const limitedSubcategories = subcategories.slice(0, 9);
    const displayedSubcategories = showAll ? subcategories : limitedSubcategories;

    const handleShowMore = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="wrapper-nav flex flex-center w-100 h-5">
            <div className="menu-bar flex flex-center p-1 fs-14 fw-4 h-34">
                <ul className="flex">
                    {displayedSubcategories.map((subcategory) => (
                        <li key={subcategory.id} className="h-34 flex flex-center position-relative mx-1">
                            <Button
                                to={`/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}
                                text
                                className="text-black text-center"
                                aria-label={subcategory.name}
                                role="button"
                            >
                                {subcategory.name}
                            </Button>
                        </li>
                    ))}
                    {subcategories.length > 9 && (
                        <li
                            className="more-subcategory h-34 fs-14 flex flex-center fw-6 position-relative mx-1"
                            onClick={handleShowMore}
                        >
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
