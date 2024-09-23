import Button from '~/components/Button';

const PaymentSection = ({ paymentData }) => {
    console.log('Payment Data:', paymentData);
    return (
        <div className="payment-table">
            <div className="table-header fw-7 text-center">
                <div className="header-item p-1">Payment Name</div>
                <div className="header-item flex flex-center">
                    <Button primary>Add</Button>
                </div>
            </div>
            {paymentData.length > 0 ? (
                paymentData.map((item) => (
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
