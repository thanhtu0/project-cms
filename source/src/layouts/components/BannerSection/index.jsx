import { useState } from 'react';
import Button from '~/components/Button';
import './BannerSection.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import PlayVideo from '~/common/Modal/PlayVideo';
import { skateboard_video } from '~/utils/videos';

const BannerSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePlayVideo = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="banner_section grid">
            <div className="banner_section__section top-left px-10 py-8">
                <p className="new-season text-white position-relative">New Season</p>
                <p className="title fs-52 fw-6 lh-65 text-white mt-8">Welcome</p>
                <p className="sub-title fs-52 fw-6 lh-65 text-white ml-10 mt-8">Hoddies</p>
                <Button to={'clothing'} className="text-black bg-white mt-56" fill>
                    Discover
                </Button>
            </div>
            <div className="banner_section__section top-right px-10 py-8">
                <p className="latest text-white position-relative">Latest</p>
                <p className="title fs-52 fw-6 lh-65 text-white mt-8">Santa</p>
                <p className="sub-title fs-52 fw-6 lh-65 text-white ml-10 mt-8">Cruz</p>
                <Button to={'santa-cruz'} className="mt-56 text-black bg-white" fill>
                    Discover
                </Button>
            </div>
            <div className="banner_section__section bottom-left flex flex-center">
                <Button className="play-button w-10 h-10" onClick={handlePlayVideo}>
                    <FontAwesomeIcon className="fs-30 text-white" icon={faPlay} />
                </Button>
            </div>
            <div className="banner_section__section bottom-right px-10 py-4">
                <p className="title fs-52 fw-6 lh-65">Cookie</p>
                <p className="sub-title fs-52 fw-6 lh-65">'Light of Mine'</p>
                <p className="description lh-18 text-justify mt-24">
                    Remember when Chris 'Cookie' Colbourn mixed amazing Cobra Man cameos in his Heatwave part? You ought
                    to, it was only seven months ago! Well, he's back again (sans Cobra Man sadly) and this time the
                    "gimmick" is it's all filmed...
                </p>
                <Button className="mt-56" fill>
                    Discover
                </Button>
            </div>

            <PlayVideo isOpen={isModalOpen} onClose={handleCloseModal}>
                <video width="100%" controls autoPlay loop>
                    <source src={skateboard_video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </PlayVideo>
        </div>
    );
};

export default BannerSection;
