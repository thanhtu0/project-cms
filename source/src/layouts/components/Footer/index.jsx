import { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { Error, Loading } from '~/common';
import useFetch from '~/hooks/useFetch';
import { CONTACT_URL } from '~/utils/apiURL';
import { About, Payment, Social, Contact } from './Section';

const Footer = () => {
    const { data, loading, error } = useFetch(`${CONTACT_URL}`);

    const footerData = useMemo(() => {
        if (!data) return { companyName: 'Default Company Name', contactInfo: null };
        return {
            companyName: data[0]?.companyName || 'Default Company Name',
            contactInfo: data[0],
        };
    }, [data]);

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;
    if (!data) return <Error message="No data available." />;

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer mw-144" role="contentinfo">
            <Link to="/" className="footer-logo h-5" aria-label={`Go to ${footerData.companyName} home page`}>
                <h2 className="fs-43 fw-4 text-white">{footerData.companyName}</h2>
            </Link>
            <div className="footer-container">
                <About />
                <Contact contactInfo={footerData.contactInfo} />
                <Payment />
                <Social />
            </div>
            <div className="footer-bottom">
                <p className="fs-12 fw-32 text-white">
                    © {currentYear} {footerData.companyName} retail Ltd. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default memo(Footer);
