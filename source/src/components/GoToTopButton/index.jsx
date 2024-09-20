import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './GoToTopButton.scss';

const GoToTopButton = () => {
    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowGoToTop(window.scrollY >= 450);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        showGoToTop && (
            <button
                className="go-to-top position-fixed p-1 bg-black text-white"
                onClick={handleGoToTop}
                aria-label="Go to top"
            >
                <FaArrowUp />
            </button>
        )
    );
};

export default GoToTopButton;
