import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import useFooterData from '~/components/hooks/useFooterData';
import { Error, Loading } from '~/components/common';

const PaymentSection = () => {
    const { data, loading, error } = useFooterData();

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;

    if (data && Array.isArray(data) && data.length > 0) {
        const contact = data[0];
        const paymentMethods = contact.payment;

        if (paymentMethods && paymentMethods.length > 0) {
            return (
                <div className="footer-section">
                    <h3 className="fs-16 text-white">We accept</h3>
                    <ul className="payment-methods">
                        {paymentMethods.map(({ id, text, icon }) => (
                            <li className="text-white fs-14 lh-18" key={id}>
                                <FontAwesomeIcon icon={faCreditCard} className={`icon ${icon} mr-1`} />
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    return (
        <div className="footer-section">
            <h3 className="fs-16 text-white">We accept</h3>
            <p className="text-white fs-14 lh-18">No payment methods available.</p>
        </div>
    );
};

export default PaymentSection;
