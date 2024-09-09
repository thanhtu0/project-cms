import { Link } from 'react-router-dom';
import { About, Payment, Social, Store } from './Section';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <Link to="/" className="footer-logo">
                <h2 className='fs-43 fw-4 text-white'>cordes.</h2>
            </Link>
            <div className="footer-container">
                <About />
                <Store />
                <Payment />
                <Social />
            </div>
            <div className="footer-bottom">
                <p className='fs-12 fw-3 lh-55 text-white'>© 2021 cordes. retail Ltd. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
