import { useState } from 'react';
import { toast } from 'react-toastify';
import { Error, Loading } from '~/common';
import Payment from '~/common/Modal/Payment';
import Button from '~/components/Button';
import useFetch from '~/hooks/useFetch';
import { PAYMENT_URL } from '~/utils/apiURL';

const PaymentSection = () => {
    const { data: payment, loading: paymentLoading, error: paymentError, refetch } = useFetch(`${PAYMENT_URL}`);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPayment, setCurrentPayment] = useState(null);

    const handleAddOrEdit = async (payment) => {
        const method = currentPayment ? 'PATCH' : 'POST';
        const url = currentPayment ? `${PAYMENT_URL}/${currentPayment.id}` : `${PAYMENT_URL}`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payment),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to add or edit the payment item');
            }

            setIsModalOpen(false);
            setCurrentPayment(null);
            refetch();

            toast.success(currentPayment ? 'Update successfully!' : 'Create successfully!');
        } catch (error) {
            toast.error('There was an issue adding or updating the payment item. Please try again.');
        }
    };

    const handleEdit = (item) => {
        setCurrentPayment(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${PAYMENT_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the payment item');
            }

            refetch();
            toast.success('Deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete the item. Please try again.');
        }
    };

    if (paymentLoading) return <Loading />;
    if (paymentError) return <Error message={paymentError.message} />;

    return (
        <div className="payment-table">
            <div className="table-header fw-7 text-center">
                <div className="header-item p-1">Payment Name</div>
                <div className="header-item flex flex-center">
                    <Button
                        primary
                        onClick={() => {
                            setCurrentPayment(null);
                            setIsModalOpen(true);
                        }}
                    >
                        Add Payment
                    </Button>
                </div>
            </div>
            {payment.length > 0 ? (
                payment.map((item) => (
                    <div className="table-row" key={item.id}>
                        <div className="table-cell text-center">{item.name || 'No Name'}</div>
                        <div className="table-cell text-center">
                            <Button info onClick={() => handleEdit(item)}>
                                Update
                            </Button>
                            <Button danger onClick={() => handleDelete(item.id)}>
                                Delete
                            </Button>
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
            <Payment
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setCurrentPayment(null);
                }}
                onSubmit={handleAddOrEdit}
                initialData={currentPayment}
            />
        </div>
    );
};

export default PaymentSection;
