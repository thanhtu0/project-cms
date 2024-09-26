import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Brand.scss';
import useFetch from '~/hooks/useFetch';
import { BRAND_IMAGES, BRANDS_URL } from '~/utils/apiURL';
import { createSlug } from '~/utils/helpers';
import { Error, Loading } from '~/common';

const Brand = () => {
    const { data: brands, loading, error } = useFetch(`${BRANDS_URL}`);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;

    if (!brands.length) return <div>No brands available.</div>;

    const displayedBrands = showAll ? brands : brands.slice(0, 6);

    const handleBrandClick = (name) => {
        const slug = createSlug(name);
        navigate(`/brands/${slug}`);
    };

    return (
        <div className="brand flex flex-between bg-white px-13">
            <div className="brand-logo flex flex-between position-relative">
                {displayedBrands.map((brand) => (
                    <img
                        key={brand.id}
                        src={`${BRAND_IMAGES}/${brand.imageUrl}`}
                        alt={`${brand.name}-logo`}
                        onClick={() => handleBrandClick(brand.name)}
                        className="brand-logo__image"
                    />
                ))}
            </div>
            {brands.length > 6 && !showAll && (
                <button onClick={() => setShowAll(true)} type="button" className="fs-14 fw-6 brand__show-more">
                    Explore Brands
                </button>
            )}
            {showAll && (
                <button onClick={() => setShowAll(false)} type="button" className="fs-14 fw-6 brand__show-less">
                    Show Less
                </button>
            )}
        </div>
    );
};

export default Brand;
