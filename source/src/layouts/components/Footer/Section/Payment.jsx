import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import useContactData from '~/hooks/useContactData';
import { Error, Loading } from '~/common';
import { useNavigate } from 'react-router-dom';
import { createSlug } from '~/utils/helpers';
import Button from '~/components/Button';

const PaymentSection = () => {
    const { data, loading, error } = useContactData();
    const navigate = useNavigate();

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;

    const handleBrandClick = (name) => {
        const slug = createSlug(name);
        navigate(`/about/${slug}`);
    };

    if (data && Array.isArray(data) && data.length > 0) {
        const contact = data[0];
        const paymentMethods = contact.payment;

        if (paymentMethods && paymentMethods.length > 0) {
            return (
                <div className="footer-section">
                    <h3 className="fs-16 text-white">We accept</h3>
                    <ul className="payment-methods">
                        {paymentMethods.map(({ id, name, icon }) => (
                            <li className="text-white fs-14 lh-18" key={id}>
                                <Button
                                    onClick={() => handleBrandClick(name)}
                                    aria-label={`Payment ${name}`}
                                    className="payment-link text-white"
                                    leftIcon={<FontAwesomeIcon icon={faCreditCard} />}
                                    iconSize="2rem"
                                    text
                                >
                                    {name}
                                </Button>
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
