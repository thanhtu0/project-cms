import { Button, TitleClient } from '~/components';
import './Fashion.scss';
import { CATEGORIES_URL, FASHION_IMAGES, FASHION_PHOTOS_URL, FASHIONS_URL } from '~/utils/apiURL';
import { useEffect, useMemo, useState } from 'react';
import { Error, Loading } from '~/common';
import useFetch from '~/hooks/useFetch';
import { getCategoryName } from '~/utils/helpers';

const Fashion = ({ activeTab }) => {
    const { data: fashion, loading: fashionLoading, error: fashionError } = useFetch(FASHIONS_URL);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(CATEGORIES_URL);
    const [categoryMap, setCategoryMap] = useState({});
    const { data: fashionPhotos } = useFetch(FASHION_PHOTOS_URL);

    useEffect(() => {
        if (categories) {
            const map = {};
            categories.forEach((category) => {
                map[category.name] = category.id;
            });
            setCategoryMap(map);
        }
    }, [categories]);

    const filteredFashions = useMemo(() => {
        return (fashion || []).filter((item) => {
            const categoryId = categoryMap[activeTab];
            return categoryId === item.categoryId;
        });
    }, [fashion, activeTab, categoryMap]);

    if (fashionLoading || categoriesLoading) return <Loading />;
    if (fashionError) return <Error message={fashionError.message} />;
    if (categoriesError) return <Error message={categoriesError.message} />;

    if (filteredFashions.length === 0) {
        return <div>No fashions available for this category "{activeTab}".</div>;
    }

    return (
        <div className="fashion-container position-relative">
            {filteredFashions.map((fashionItem) => (
                <div key={fashionItem.id} className="fashion-item">
                    <TitleClient title={fashionItem.label} />
                    <div className="img position-absolute left-0 bottom-0">
                        <img
                            src={`${FASHION_IMAGES}/${getCategoryName(fashionItem.categoryId, categories)}/${
                                fashionItem.imageUrl
                            }`}
                            alt={fashionItem.title}
                        />
                    </div>
                    <div className="fashion-text position-absolute bottom-0">
                        <p className="title fs-110 lh-125 fw-6">{fashionItem.title}</p>
                        <p className="subtitle position-absolute right-0 fs-110 lh-145 fw-6">{fashionItem.subtitle}</p>
                        <p className="description fs-14 fw-3 lh-18">{fashionItem.description}</p>
                        <Button fill>Shop Now</Button>
                    </div>

                    <div className="img-title position-absolute right-0 bottom-0 z-2 flex flex-center">
                        <img src="fashionPhotos.imageUrl" alt="fashionPhotos.name" />
                    </div>

                    <div className="img-subtitle position-absolute right-0 flex flex-center">
                        <img src="fashionPhotos.imageUrl" alt="fashionPhotos.name" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Fashion;
