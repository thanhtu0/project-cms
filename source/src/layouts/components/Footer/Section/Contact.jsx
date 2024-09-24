import { Error, Loading } from '~/common';
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
                <p className="text-white fs-14 fw-4">
                    <strong>Company name:</strong> {store.companyName || 'N/A'}
                </p>
                <p className="text-white fs-14 fw-4">
                    <strong>Tel:</strong> {store.telephone || 'N/A'}
                </p>
                <p className="text-white fs-14 fw-4">
                    <strong>Email:</strong> {store.email || 'N/A'}
                </p>
                <p className="text-white fs-14 fw-4">
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

export default ContactSection;
