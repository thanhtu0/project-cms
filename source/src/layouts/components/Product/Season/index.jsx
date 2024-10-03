import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Season.scss';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TitleClient } from '~/components';
import {
    BRANDS_URL,
    CATEGORIES_URL,
    FASHION_SEASON_IMAGES,
    FASHION_SEASON_URL,
    PRODUCT_IMAGES,
    PRODUCTS_URL,
} from '~/utils/apiURL';
import useFetch from '~/hooks/useFetch';
import { useEffect, useMemo, useState } from 'react';
import { Error, Loading } from '~/common';
import { error } from '~/utils/images';
import { getBrandName, getCategoryName } from '~/helpers/dataHelpers';

const Season = ({ activeTab }) => {
    const { data: seasons, loading: seasonsLoading, error: seasonsError } = useFetch(FASHION_SEASON_URL);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(CATEGORIES_URL);
    const { data: brands } = useFetch(BRANDS_URL);
    const { data: products, loading: productsLoading, error: productsError } = useFetch(PRODUCTS_URL);

    const [categoryMap, setCategoryMap] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (categories) {
            const map = {};
            categories.forEach((category) => {
                map[category.name] = category.id;
            });
            setCategoryMap(map);
        }
    }, [categories]);

    const filteredSeasons = useMemo(() => {
        return (seasons || []).filter((season) => categoryMap[activeTab] === season.categoryId);
    }, [seasons, activeTab, categoryMap]);

    const getSeasonProduct = (productId, categoryId) => {
        return products?.find((product) => product.id === productId && product.categoryId === categoryId);
    };

    const ProductCard = (product) => (
        <>
            <div className="season-img w-100">
                <img
                    style={{ maxHeight: '300px' }}
                    src={`${PRODUCT_IMAGES}/${getCategoryName(product.categoryId, categories)}/${product.imageUrl}`}
                    alt={product.name}
                />
            </div>
            <div className="season-text bg-white flex flex-between">
                <p className="lh-18">
                    <b className="fw-7">{getBrandName(product.brandId, brands)} </b>
                    <span className="fw-4">{product.name}</span>
                </p>
                <p className="fs-17 fw-7">£{product.price}</p>
            </div>
        </>
    );

    if (seasonsLoading || categoriesLoading || productsLoading) return <Loading />;
    if (seasonsError) return <Error message={seasonsError.message} />;
    if (categoriesError) return <Error message={categoriesError.message} />;
    if (productsError) return <Error message={productsError.message} />;

    const currentSeasonProduct = getSeasonProduct(
        filteredSeasons[currentIndex]?.productId,
        filteredSeasons[currentIndex]?.categoryId,
    );

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredSeasons.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredSeasons.length) % filteredSeasons.length);
    };

    return (
        <>
            {filteredSeasons.length > 0 ? (
                <div className="season-container mx-130 my-180">
                    <TitleClient
                        title={`New Season - ${
                            currentSeasonProduct ? getBrandName(currentSeasonProduct.brandId, brands) : ''
                        } ${filteredSeasons[currentIndex]?.name}`}
                    />
                    <div className="season-content w-100 position-relative mt-10">
                        <div className="img-season h-100">
                            <img
                                style={{ maxHeight: '410px', maxWidth: '580px' }}
                                src={`${FASHION_SEASON_IMAGES}/${filteredSeasons[currentIndex]?.imageUrl}`}
                                alt={filteredSeasons[currentIndex]?.name}
                            />
                        </div>

                        <div className="season-slide">
                            {filteredSeasons.map((_, index) => (
                                <div
                                    key={index}
                                    className={`slide-line ${index === currentIndex ? 'active' : 'inactive'}`}
                                ></div>
                            ))}
                        </div>

                        <div className="right-season">
                            {currentSeasonProduct ? (
                                ProductCard(currentSeasonProduct)
                            ) : (
                                <div className="fallback-message flex flex-around">
                                    <img src={error} alt="No Banners" />
                                    <p className="text-danger">No product available for this season.</p>
                                </div>
                            )}
                        </div>

                        <div className="slide-btn">
                            <button className="btn btn-prev" onClick={handlePrev}>
                                <FontAwesomeIcon className="icon" icon={faAngleLeft} />
                            </button>
                            <button className="btn btn-next" onClick={handleNext}>
                                <FontAwesomeIcon className="icon" icon={faAngleRight} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="fallback-message flex flex-around">
                    <img src={error} alt="No Banners" />
                    <p className="text-danger">No Fashion Season available at the moment. Please check back later!</p>
                </div>
            )}
        </>
    );
};

export default Season;
