import Modal from '~/common/Modal/SubscribeModal';
import './Subscribe.scss';
import Search from '~/components/Search';
import { useState } from 'react';
const Subscribe = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubscribe = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="subscription mw-144 flex flex-between">
            <div className="subscription__content">
                <p className="subscription__text position-relative">Stay in touch</p>
                <h2 className="subscription__title fs-40 lh-50">Subscribe</h2>
            </div>
            <Search
                placeholder="Enter your email here..."
                buttonText="Subscribe"
                width="480px"
                buttonWidth="125px"
                onSearch={handleSubscribe}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                messageTitle="Thanks for subscribing!"
                messageBody="Check your email for a confirmation message."
            />
        </div>
    );
};

export default Subscribe;
