import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Error, Loading } from '~/common';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import useFetch from '~/hooks/useFetch';
import { API_BASE_URL } from '~/utils/apiURL';
import { memo } from 'react';
import { createSlug } from '~/helpers/stringHelpers';

const PaymentSection = () => {
    const { data: payments, loading: paymentsLoading, error: paymentsError } = useFetch(`${API_BASE_URL}/payment`);
    const navigate = useNavigate();

    if (paymentsLoading) return <Loading />;
    if (paymentsError) return <Error message={paymentsError.message} />;

    const paymentMethods = payments || [];

    const handleBrandClick = (name) => {
        const slug = createSlug(name);
        navigate(`/payment/${slug}`);
    };

    return (
        <div className="footer-section">
            <h3 className="fs-16 text-white">We accept</h3>
            {paymentMethods.length > 0 ? (
                <ul className="payment-methods w-15">
                    {paymentMethods.map(({ id, name }) => (
                        <li className="text-white fs-14 lh-18" key={id}>
                            <Button
                                onClick={() => handleBrandClick(name)}
                                aria-label={`Payment method ${name}`}
                                className="payment-link text-white"
                                leftIcon={<FontAwesomeIcon icon={faCreditCard} />}
                                iconSize="1.6rem"
                                text
                            >
                                {name}
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-white fs-14 lh-18">No payment methods available.</p>
            )}
        </div>
    );
};

export default memo(PaymentSection);
