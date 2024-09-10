import { Link } from 'react-router-dom';
import { About, Payment, Social, Store } from './Section';
import useFooterData from '~/components/hooks/useFooterData';
import './Footer.scss';
import { Error, Loading } from '~/components/common';

const Footer = () => {
    const { data, loading, error } = useFooterData();

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;

    const companyName = data?.[0]?.store?.companyName || 'Default Company Name';

    return (
        <footer className="footer">
            <Link to="/" className="footer-logo">
                <h2 className="fs-43 fw-4 text-white">{companyName}</h2>
            </Link>
            <div className="footer-container">
                <About />
                <Store />
                <Payment />
                <Social />
            </div>
            <div className="footer-bottom">
                <p className="fs-12 fw-3 lh-55 text-white">© 2021 {companyName} retail Ltd. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
