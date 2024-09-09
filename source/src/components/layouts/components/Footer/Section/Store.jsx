import React from 'react';
import useFetch from '~/components/hooks/useFetch';
import { BASE_URL } from '~/components/utils/apiURL';

const StoreSection = () => {
    const { data, loading, error } = useFetch(`${BASE_URL}/contact`); // Đảm bảo bạn đang fetch dữ liệu đúng endpoint

    if (loading) return <p>Loading store information...</p>;
    if (error) return <p>Error loading store information</p>;

    if (data && Array.isArray(data) && data.length > 0) {
        const contact = data[0];
        const store = contact.store;

        if (store) {
            return (
                <div className="footer-section">
                    <h3 className="fs-16 text-white">Store</h3>
                    <p className="text-white fs-14 fw-4">Company name: {store.companyName || 'N/A'}</p>
                    <p className="text-white fs-14 fw-4">Tel: {store.telephone || 'N/A'}</p>
                    <p className="text-white fs-14 fw-4">Email: {store.email || 'N/A'}</p>
                    <p className="text-white fs-14 fw-4">Address: {store.address || 'N/A'}</p>
                </div>
            );
        }
    }

    return (
        <div className="footer-section">
            <h3 className="fs-16 text-white">Store</h3>
            <p className="text-white">No store information available.</p>
        </div>
    );
};

export default StoreSection;
