import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Brand.scss';
import useFetch from '~/components/hooks/useFetch';
import { BASE_URL } from '~/components/utils/apiURL';
import { createSlug } from '~/components/utils/helpers';

const Brand = () => {
    const { data: brands, loading, error } = useFetch(`${BASE_URL}/brands`);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading brands.</div>;

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
                        src={`${BASE_URL}/images/brands/${brand.imageFilename}`}
                        alt={`${brand.name}-logo`}
                        onClick={() => handleBrandClick(brand.name)}
                        className="brand-logo__image"
                    />
                ))}
            </div>
            {brands.length > 6 && !showAll && (
                <button onClick={() => setShowAll(true)} className="fs-14 fw-6 brand__show-more">
                    Explore Brands
                </button>
            )}
            {showAll && (
                <button onClick={() => setShowAll(false)} className="fs-14 fw-6 brand__show-less">
                    Show Less
                </button>
            )}
        </div>
    );
};

export default Brand;
