import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BrandForm } from '~/common/Form';
import Title from '~/common/Title';
import useFetchItem from '~/hooks/useFetchItem';
import { BASE_URL } from '~/utils/apiURL';

const EditBrand = () => {
    const { id } = useParams();
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { data: initialData } = useFetchItem('brands', id);

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
            const response = await fetch(`${BASE_URL}/brands/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                navigate('/admin/brands');
                toast.success('Brand updated successfully!');
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
                toast.error('Validation failed. Please check the errors.');
            } else {
                toast.error('Unable to update the brand!');
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
                <Title text="Edit Brand" />
            </div>
            <BrandForm
                onSubmit={handleSubmit}
                initialData={initialData}
                validationErrors={validationErrors}
                loading={loading}
            />
        </div>
    );
};

export default EditBrand;
