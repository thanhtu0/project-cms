import { Button, TitleClient } from '~/components';
import './Fashion.scss';
import { CATEGORIES_URL, FASHION_IMAGES, FASHION_PHOTOS_IMAGE, FASHION_PHOTOS_URL, FASHIONS_URL } from '~/utils/apiURL';
import { useEffect, useMemo, useState } from 'react';
import { Error, Loading } from '~/common';
import useFetch from '~/hooks/useFetch';
import { getCategoryName } from '~/helpers/dataHelpers';

const Fashion = ({ activeTab }) => {
    const { data: fashion, loading: fashionLoading, error: fashionError } = useFetch(FASHIONS_URL);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(CATEGORIES_URL);
    const { data: fashionPhotos, loading: photosLoading, error: photosError } = useFetch(FASHION_PHOTOS_URL);

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

    const filteredFashions = useMemo(() => {
        return (fashion || []).filter((item) => {
            const categoryId = categoryMap[activeTab];
            return categoryId === item.categoryId;
        });
    }, [fashion, activeTab, categoryMap]);

    if (fashionLoading || categoriesLoading || photosLoading) return <Loading />;
    if (fashionError) return <Error message={fashionError.message} />;
    if (categoriesError) return <Error message={categoriesError.message} />;
    if (photosError) return <Error message={photosError.message} />;

    if (filteredFashions.length === 0) {
        return <div>No fashions available for this category "{activeTab}".</div>;
    }

    return (
        <div className="fashion-container position-relative mx-130 my-120">
            {filteredFashions.map((fashionItem) => {
                const imagesForFashion = (fashionPhotos || []).filter((photo) => photo.fashionId === fashionItem.id);

                return (
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
                            <p className="subtitle position-absolute right-0 fs-110 lh-145 fw-6">
                                {fashionItem.subtitle}
                            </p>
                            <p className="description fs-14 fw-3 lh-18">{fashionItem.description}</p>
                            <Button fill onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                Shop Now
                            </Button>
                        </div>

                        {imagesForFashion.length > 0 && (
                            <>
                                {imagesForFashion.length > 1 && !imagesForFashion[0].hidden && (
                                    <div className="position-absolute right-0 flex flex-center img-subtitle">
                                        <img
                                            src={`${FASHION_PHOTOS_IMAGE}/${imagesForFashion[0].imageUrl}`}
                                            alt={imagesForFashion[0].name}
                                            className="img-cover"
                                            style={{ width: 200, maxHeight: 218 }}
                                        />
                                    </div>
                                )}
                                {!imagesForFashion[1].hidden && (
                                    <div className="position-absolute right-0 flex flex-center bottom-0 z-2 img-title">
                                        <img
                                            src={`${FASHION_PHOTOS_IMAGE}/${imagesForFashion[1].imageUrl}`}
                                            className="img-cover"
                                            alt={imagesForFashion[1].name}
                                            style={{ width: 330, maxHeight: 212 }}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Fashion;
