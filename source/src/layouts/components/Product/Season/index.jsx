import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Season.scss';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TitleClient } from '~/components';

const SeasonContainer = () => {
    return (
        <div className="season-container mx-130 my-180">
            <TitleClient title="New Season - Converse 'White Widow' Pack" />
            <div className="season-content w-100 position-relative mt-10">
                <div className="img-season flex flex-center">
                    <img src="imageBackgroundUrl" alt="122f" />
                </div>

                <div className="season-slide">
                    <div className="slide-line first-line"></div>
                    <div className="slide-line second-line"></div>
                    <div className="slide-line third-line"></div>
                </div>

                <div className="right-season">
                    <div className="season-img">
                        <img src="imageUrl" alt="" />
                    </div>
                    <div className="season-text">
                        <span>
                            <b>Converse </b>
                            CTAS Pro Hi Stake Shoes
                        </span>
                        <strong>£64,99</strong>
                    </div>
                </div>

                <div className="slide-btn">
                    <button className="btn">
                        <FontAwesomeIcon className="icon" icon={faAngleLeft} />
                    </button>
                    <button className="btn">
                        <FontAwesomeIcon className="icon" icon={faAngleRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeasonContainer;
