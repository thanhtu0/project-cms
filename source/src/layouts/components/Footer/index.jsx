import { Link } from 'react-router-dom';
import './Footer.scss';
import { Error, Loading } from '~/common';
import useFetch from '~/hooks/useFetch';
import { CONTACT_URL } from '~/utils/apiURL';
import { About, Payment, Social, Contact } from './Section';

const Footer = () => {
    const { data, loading, error } = useFetch(`${CONTACT_URL}`);

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;

    const companyName = data?.[0]?.companyName || 'Default Company Name';

    return (
        <footer className="footer mw-144">
            <Link to="/" className="footer-logo h-5">
                <h2 className="fs-43 fw-4 text-white">{companyName}</h2>
            </Link>
            <div className="footer-container">
                <About />
                <Contact />
                <Payment />
                <Social />
            </div>
            <div className="footer-bottom">
                <p className="fs-12 fw-32 text-white">© 2021 {companyName} retail Ltd. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
