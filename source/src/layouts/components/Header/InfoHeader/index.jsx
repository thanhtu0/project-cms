import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosStar } from 'react-icons/io';
import { Error, Loading } from '~/common';

const InfoHeader = ({ infoItems, loading, error }) => {
    return (
        <div className="info-header text-white bg-black flex flex-between px-13">
            <div className="left-info flex">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Error message={error} />
                ) : (
                    infoItems.map((item, index) => (
                        <div key={index} className={item.className}>
                            <FontAwesomeIcon className="fs-14" icon={item.icon} />
                            <p className="fs-12 lh-15 ml-1">{item.text}</p>
                        </div>
                    ))
                )}
            </div>

            <div className="right-info flex">
                {Array.from({ length: 5 }, (_, index) => (
                    <IoIosStar className="icon fs-14" key={index} />
                ))}
                <p className="fs-12 lh-15 ml-1">33400 Five Star Service Reviews</p>
            </div>
        </div>
    );
};

export default InfoHeader;
