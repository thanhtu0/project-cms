import { BANNER_IMAGES, BANNERS_URL, CATEGORIES_URL } from '~/utils/apiURL';
import './Banner.scss';
import useFetch from '~/hooks/useFetch';
import { useEffect, useState, useMemo } from 'react';
import { Error, Loading } from '~/common';
import { Button, Label } from '~/components';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlayVideo from '~/common/Modal/PlayVideo';
import { skateboard_banner } from '~/utils/videos';
import usePlayVideo from '~/hooks/usePlayVideo';
import { error } from '~/utils/images';
import { getCategoryName } from '~/helpers/dataHelpers';

const Banner = ({ activeTab }) => {
    const { data: banners, loading: bannersLoading, error: bannersError } = useFetch(BANNERS_URL);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(CATEGORIES_URL);
    const [categoryMap, setCategoryMap] = useState({});
    const { isModalOpen, handleOpenModal, handleCloseModal } = usePlayVideo();
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    useEffect(() => {
        if (categories) {
            const map = {};
            categories.forEach((category) => {
                map[category.name] = category.id;
            });
            setCategoryMap(map);
        }
    }, [categories]);

    // Memoized filtered banners
    const filteredBanners = useMemo(() => {
        return (banners || []).filter((banner) => {
            return categoryMap[activeTab] === banner.categoryId;
        });
    }, [banners, activeTab, categoryMap]);

    // Memoized banner image URL
    const bannerImageUrl = useMemo(() => {
        if (filteredBanners.length === 0) return ''; // Fallback if don't have banner
        return `${BANNER_IMAGES}/${getCategoryName(filteredBanners[currentBannerIndex].categoryId, categories)}/${
            filteredBanners[currentBannerIndex].imageUrl
        }`;
    }, [filteredBanners, currentBannerIndex, categories]);

    useEffect(() => {
        if (filteredBanners.length > 0) {
            const interval = setInterval(() => {
                setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % filteredBanners.length);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [filteredBanners.length]);

    const handleLineClick = (index) => {
        setCurrentBannerIndex(index);
    };

    if (bannersLoading || categoriesLoading) return <Loading />;
    if (bannersError) return <Error message={bannersError.message} />;
    if (categoriesError) return <Error message={categoriesError.message} />;

    return (
        <>
            {filteredBanners.length > 0 ? (
                <div
                    className={`banner position-relative mw-144 flex flex-between px-13 ${
                        filteredBanners[currentBannerIndex].categoryId % 2 === 0 ? 'even' : 'odd'
                    }`}
                >
                    <div className="banner-content">
                        <Label
                            text={filteredBanners[currentBannerIndex].season}
                            className="text-black position-relative label"
                        />
                        <p className="title fs-58 mt-16 fw-6 position-relative lh-72">
                            {filteredBanners[currentBannerIndex].title}
                        </p>
                        <p className="sub-title fs-58 mt-16 fw-6 position-relative lh-72 ml-10">
                            {filteredBanners[currentBannerIndex].subtitle}
                        </p>
                        <div className="banner-btn flex mt-88">
                            <Button fill to="skateboard">
                                Discover
                            </Button>
                            <Button
                                reverse
                                leftIcon={<FontAwesomeIcon icon={faCirclePlay} />}
                                onClick={handleOpenModal}
                            >
                                Watch Video
                            </Button>
                        </div>

                        <div
                            className="banner-slide"
                            style={{ display: 'flex', justifyContent: 'start', marginTop: '105px' }}
                        >
                            {filteredBanners.map((_, index) => (
                                <div
                                    key={index}
                                    className={`slide-line ${index === currentBannerIndex ? 'active' : 'inactive'}`}
                                    onClick={() => handleLineClick(index)}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div
                        className={`banner-image position-absolute ${
                            filteredBanners[currentBannerIndex].categoryId % 2 === 0 ? 'even' : 'odd'
                        }`}
                    >
                        <img
                            src={bannerImageUrl}
                            alt={`${filteredBanners[currentBannerIndex].title} Banner`}
                            className="banner-img"
                        />
                        <strong className="position-absolute text-end text-black">
                            cordes.<p className="text-black-2">{filteredBanners[currentBannerIndex].title}</p>
                        </strong>
                    </div>
                    <PlayVideo isOpen={isModalOpen} onClose={handleCloseModal}>
                        <video width="100%" controls autoPlay loop>
                            <source src={skateboard_banner} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </PlayVideo>
                </div>
            ) : (
                <div className="fallback-message flex flex-around">
                    <img src={error} alt="No Banners" />
                    <p className="text-danger">No banners available at the moment. Please check back later!</p>
                </div>
            )}
        </>
    );
};

export default Banner;
