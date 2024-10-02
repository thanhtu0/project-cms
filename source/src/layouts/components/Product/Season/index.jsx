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
import { getBrandName, getCategoryName } from '~/utils/helpers';

const Season = ({ activeTab }) => {
    const { data: seasons, loading: seasonsLoading, error: seasonsError } = useFetch(FASHION_SEASON_URL);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(CATEGORIES_URL);
    const { data: brands } = useFetch(BRANDS_URL);
    const { data: products, loading: productsLoading, error: productsError } = useFetch(PRODUCTS_URL);

    const [categoryMap, setCategoryMap] = useState({});

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
            <div className="season-img flex flex-center">
                <img
                    src={`${PRODUCT_IMAGES}/${getCategoryName(product.categoryId, categories)}/${product.imageUrl}`}
                    alt={product.name}
                />
            </div>
            <div className="season-text">
                <span>
                    <b>{getBrandName(product.brandId, brands)}</b> {product.name}
                </span>
                <strong>£ {product.price}</strong>
            </div>
        </>
    );

    if (seasonsLoading || categoriesLoading || productsLoading) return <Loading />;
    if (seasonsError) return <Error message={seasonsError.message} />;
    if (categoriesError) return <Error message={categoriesError.message} />;
    if (productsError) return <Error message={productsError.message} />;

    const currentSeasonProduct = filteredSeasons[0]
        ? getSeasonProduct(filteredSeasons[0].productId, filteredSeasons[0].categoryId)
        : null;

    return (
        <>
            {filteredSeasons.length > 0 ? (
                <div className="season-container mx-130 my-180">
                    <TitleClient
                        title={`New Season - ${
                            currentSeasonProduct ? getBrandName(currentSeasonProduct.brandId, brands) : ''
                        } ${filteredSeasons[0].name}`}
                    />
                    <div className="season-content w-100 position-relative mt-10">
                        <div className="img-season flex-start">
                            <img
                                src={`${FASHION_SEASON_IMAGES}/${filteredSeasons[0].imgUrl}`}
                                alt={filteredSeasons[0].name}
                            />
                        </div>

                        <div className="season-slide">
                            <div className="slide-line first-line"></div>
                            <div className="slide-line second-line"></div>
                            <div className="slide-line third-line"></div>
                        </div>

                        {filteredSeasons[0] && (
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
                        )}

                        <div className="slide-btn">
                            <button className="btn" onClick={() => {}}>
                                <FontAwesomeIcon className="icon" icon={faAngleLeft} />
                            </button>
                            <button className="btn" onClick={() => {}}>
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
