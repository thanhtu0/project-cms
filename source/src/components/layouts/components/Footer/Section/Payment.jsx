import React from 'react';
import useFetch from '~/components/hooks/useFetch';
import { BASE_URL } from '~/components/utils/apiURL';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

const PaymentSection = () => {
    const { data, loading, error } = useFetch(`${BASE_URL}/contact`);

    if (loading) return <p>Loading payment methods...</p>;
    if (error) return <p>Error loading payment methods</p>;

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
                                <FontAwesomeIcon icon={faCreditCard} className="icon" />
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
