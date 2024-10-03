import { memo } from 'react';
import { Error, Loading } from '~/common';
import { formatPhoneNumber } from '~/helpers/formatHelpers';
import useFetch from '~/hooks/useFetch';
import { CONTACT_URL } from '~/utils/apiURL';

const ContactSection = () => {
    const { data: contact, loading: contactLoading, error: contactError } = useFetch(`${CONTACT_URL}`);

    if (contactLoading) return <Loading />;
    if (contactError) return <Error message={contactError.message} />;

    if (contact && contact.length > 0) {
        const store = contact[0];

        return (
            <div className="footer-section">
                <h3 className="fs-16 text-white">Store</h3>
                <p className="text-white fs-14 fw-4" aria-label="Company name">
                    <strong>Company name:</strong> {store.companyName || 'N/A'}
                </p>
                <p className="text-white fs-14 fw-4" aria-label="Telephone number">
                    <strong>Tel:</strong> {formatPhoneNumber(store.telephone)}
                </p>
                <p className="text-white fs-14 fw-4" aria-label="Email address">
                    <strong>Email:</strong> {store.email || 'N/A'}
                </p>
                <p className="text-white fs-14 fw-4" aria-label="Store address">
                    <strong>Address:</strong> {store.address || 'N/A'}
                </p>
            </div>
        );
    }

    return (
        <div className="footer-section">
            <h3 className="fs-16 text-white">Store</h3>
            <p className="text-white">No store information available.</p>
        </div>
    );
};

export default memo(ContactSection);
