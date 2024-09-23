import { Error, Loading } from '~/common';
import Button from '~/components/Button';
import useFetch from '~/hooks/useFetch';
import { API_BASE_URL } from '~/utils/apiURL';

const PaymentSection = () => {
    const { data: payment, loading: paymentLoading, error: paymentError } = useFetch(`${API_BASE_URL}/payment`);

    if (paymentLoading) return <Loading />;
    if (paymentError) return <Error message={paymentError.message} />;

    return (
        <div className="payment-table">
            <div className="table-header fw-7 text-center">
                <div className="header-item p-1">Payment Name</div>
                <div className="header-item flex flex-center">
                    <Button primary>Add</Button>
                </div>
            </div>
            {payment.length > 0 ? (
                payment.map((item) => (
                    <div className="table-row" key={item.id}>
                        <div className="table-cell text-center">{item.name || 'No Name'}</div>
                        <div className="table-cell text-center">
                            <Button info>Update</Button>
                            <Button danger>Delete</Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="table-row">
                    <div className="table-cell text-center error" colSpan={2}>
                        No Payment data available
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentSection;
