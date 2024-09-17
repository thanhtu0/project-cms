import Button from '~/components/Button';

const PaymentSection = ({ paymentData }) => (
    <div className="payment-table">
        <div className="table-header fw-7 text-center">
            <div className="header-item p-1">Payment Name</div>
            <div className="header-item flex flex-center">
                <Button primary>Add</Button>
            </div>
        </div>
        {paymentData.map((item) => (
            <div className="table-row" key={item.id}>
                <div className="table-cell text-center">{item.name}</div>
                <div className="table-cell text-center">
                    <Button to={`/admin/payment/edit/${item.id}`} info>
                        Update
                    </Button>
                    <Button type="button" danger>
                        Delete
                    </Button>
                </div>
            </div>
        ))}
    </div>
);

export default PaymentSection;
