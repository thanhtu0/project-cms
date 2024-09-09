import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosStar } from 'react-icons/io';

const InfoHeader = ({ infoItems, loading, error }) => {
    return (
        <div className="info-header text-white bg-black flex flex-between px-13">
            <div className="left-info">
                {loading ? (
                    <p>Loading contact info...</p>
                ) : error ? (
                    <p>Error loading contact info</p>
                ) : (
                    infoItems.map((item, index) => (
                        <div key={index} className={item.className}>
                            <FontAwesomeIcon className="fs-14" icon={item.icon} />
                            <p className="fs-12 lh-15 ml-1">{item.text}</p>
                        </div>
                    ))
                )}
            </div>

            <div className="right-info">
                {Array.from({ length: 5 }, (_, index) => (
                    <IoIosStar className="icon" key={index} />
                ))}
                <p className="fs-12 lh-15 ml-1">33400 Five Star Service Reviews</p>
            </div>
        </div>
    );
};

export default InfoHeader;
