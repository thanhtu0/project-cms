import { TitleClient } from '~/components';
import './Release.scss';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Error, Loading } from '~/common';
import useFetch from '~/hooks/useFetch';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { CATEGORIES_URL, PRODUCT_IMAGES, PRODUCTS_URL } from '~/utils/apiURL';
import { getCategoryName } from '~/helpers/dataHelpers';

const Release = ({ activeTab }) => {
    const { data: initialProducts, loading: productsLoading, error: productsError } = useFetch(PRODUCTS_URL);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(CATEGORIES_URL);

    const [categoryMap, setCategoryMap] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (categories) {
            const map = {};
            categories.forEach((category) => {
                map[category.name] = category.id;
            });
            setCategoryMap(map);
        }
    }, [categories]);

    useEffect(() => {
        if (initialProducts) {
            setProducts(initialProducts);
        }
    }, [initialProducts]);

    const filteredProducts = useMemo(() => {
        const categoryId = categoryMap[activeTab];
        return (products || []).filter((item) => item.isNew && item.categoryId === categoryId);
    }, [products, activeTab, categoryMap]);

    const handleLikeToggle = useCallback(
        (id) => {
            setProducts((prevProducts) =>
                prevProducts.map((product) => (product.id === id ? { ...product, liked: !product.liked } : product)),
            );
        },
        [setProducts],
    );

    if (productsLoading || categoriesLoading) return <Loading />;
    if (productsError) return <Error message={productsError.message} />;
    if (categoriesError) return <Error message={categoriesError.message} />;

    return (
        <div className="release-container mx-130 my-180">
            <TitleClient title="New Releases" />
            <div className="release-products">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div className="position-relative bg-white product-items" key={product.id}>
                            <div className="heart-icon" onClick={() => handleLikeToggle(product.id)}>
                                {product.liked ? <AiFillHeart color="black" /> : <AiOutlineHeart color="black" />}
                            </div>
                            <img
                                className="w-100 img-cover product-image"
                                src={`${PRODUCT_IMAGES}/${getCategoryName(product.categoryId, categories)}/${
                                    product.imageUrl
                                }`}
                                alt={product.name}
                            />
                            <div className="product-content">
                                <Link
                                    to={`/product/${product.name}/?id=${product.id}`}
                                    className="fs-14 fw-4 lh-18 product-name"
                                    title={product.title}
                                >
                                    {product.name}
                                </Link>
                                <div className="flex flex-between lh-21 product-info">
                                    <p className="fs-17 fw-7 product-price">£{product.price}</p>
                                    <p className="fs-12 lh-15 product-sold">{product.sold} sold</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-center">
                        <p>No new products available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Release;
