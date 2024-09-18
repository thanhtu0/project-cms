import Button from '~/components/Button';
import './BannerSection.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const BannerSection = () => {
    return (
        <div className="banner_section grid">
            <div className="banner_section__section position-relative p-2 top-left">
                <p className="new-season">New Season</p>
                <p className="title">Welcome</p>
                <p className="sub-title">Hoddies</p>
                <Button fill>Discover</Button>
            </div>
            <div className="banner_section__section position-relative p-2 top-right">
                <p className="latest">Latest</p>
                <p className="title">Santa</p>
                <p className="sub-title">Cruz</p>
                <Button fill>Discover</Button>
            </div>
            <div className="banner_section__section position-relative p-2 bottom-left flex flex-center">
                <div className="play-button flex flex-center">
                    <FontAwesomeIcon className="icon" icon={faPlay} />
                </div>
            </div>
            <div className="banner_section__section position-relative p-2 bottom-right">
                <p className="title">Cookie</p>
                <p className="sub-title">'Light of Mine'</p>
                <p className="description lh-18">
                    Remember when Chris 'Cookie' Colbourn mixed amazing Cobra Man cameos in his Heatwave part? You ought
                    to, it was only seven months ago! Well, he's back again (sans Cobra Man sadly) and this time the
                    "gimmick" is it's all filmed...
                </p>
                <Button fill>Discover</Button>
            </div>
        </div>
    );
};

export default BannerSection;
