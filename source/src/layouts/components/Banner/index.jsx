import { BANNER_IMAGES, BANNERS_URL, CATEGORIES_URL } from '~/utils/apiURL';
import './Banner.scss';
import useFetch from '~/hooks/useFetch';
import { useEffect, useState } from 'react';
import { Error, Loading } from '~/common';
import { getCategoryName } from '~/utils/helpers';
import { Button, Label } from '~/components';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlayVideo from '~/common/Modal/PlayVideo';
import { skateboard_banner } from '~/utils/videos';
import usePlayVideo from '~/hooks/usePlayVideo';

const Banner = ({ activeTab }) => {
    const { data: banners, loading: bannersLoading, error: bannersError } = useFetch(BANNERS_URL);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(CATEGORIES_URL);
    const [categoryMap, setCategoryMap] = useState({});
    const { isModalOpen, handleOpenModal, handleCloseModal } = usePlayVideo();

    useEffect(() => {
        if (categories) {
            const map = {};
            categories.forEach((category) => {
                map[category.name] = category.id;
            });
            setCategoryMap(map);
        }
    }, [categories]);

    if (bannersLoading || categoriesLoading) return <Loading />;
    if (bannersError) return <Error message={bannersError.message} />;
    if (categoriesError) return <Error message={categoriesError.message} />;

    const filteredBanners = banners.filter((banner) => {
        return categoryMap[activeTab] === banner.categoryId;
    });

    return (
        <>
            {filteredBanners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`banner position-relative mw-144 flex flex-between px-13 ${
                        banner.categoryId % 2 === 0 ? 'even' : 'odd'
                    }`}
                >
                    <div className="banner-content">
                        <Label text={banner.season} className="text-black position-relative label" />
                        <p className="title fs-58 mt-16 fw-6 position-relative lh-72">{banner.title}</p>
                        <p className="sub-title fs-58 mt-16 fw-6 position-relative lh-72 ml-10">{banner.subtitle}</p>
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

                        <div className="banner-slide">
                            <div className="slide-line first-line"></div>
                            <div className="slide-line second-line"></div>
                            <div className="slide-line third-line"></div>
                        </div>
                    </div>
                    <div className={`banner-image position-absolute ${banner.categoryId % 2 === 0 ? 'even' : 'odd'}`}>
                        <img
                            src={`${BANNER_IMAGES}/${getCategoryName(banner.categoryId, categories)}/${
                                banner.imageUrl
                            }`}
                            alt={`${banner.title} Banner`}
                            className="banner-img"
                        />
                        <strong className="position-absolute text-end text-black">
                            cordes.<p className="text-black-2">Skateboard</p>
                        </strong>
                    </div>
                    <PlayVideo isOpen={isModalOpen} onClose={handleCloseModal}>
                        <video width="100%" controls autoPlay loop>
                            <source src={skateboard_banner} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </PlayVideo>
                </div>
            ))}
        </>
    );
};

export default Banner;
