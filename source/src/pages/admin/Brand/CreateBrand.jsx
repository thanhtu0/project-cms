import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BrandForm } from '~/common/Form';
import Title from '~/common/Title';
import { BRANDS_URL } from '~/utils/apiURL';

const CreateBrand = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);

        const brand = Object.fromEntries(formData.entries());
        if (!brand.name) {
            setValidationErrors({
                name: 'Name is required',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BRANDS_URL}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/admin/brands');
                toast.success('Brand created successfully!');
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
                toast.error('Validation failed. Please check the errors.');
            } else {
                toast.error('Unable to create the brand!');
            }
        } catch (error) {
            toast.error('Unable to connect to the server!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="list">
            <div className="list__header">
                <Title text="Create Brand" />
            </div>
            <BrandForm onSubmit={handleSubmit} validationErrors={validationErrors} loading={loading} />
        </div>
    );
};

export default CreateBrand;
