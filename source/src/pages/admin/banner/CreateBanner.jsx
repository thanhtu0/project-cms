import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BannerForm } from '~/components/common/Form';
import Title from '~/components/common/Title';
import { BASE_URL } from '~/components/utils/apiURL';

const CreateBanner = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const banner = Object.fromEntries(formData.entries());

        if (!banner.season || !banner.title || !banner.subtitle || !banner.categoryId) {
            setValidationErrors({
                name: 'Season is required',
            });
            setValidationErrors({
                title: 'Title is required',
            });
            setValidationErrors({
                subtitle: 'Subtitle is required',
            });
            setValidationErrors({
                categoryId: 'Category Name is required',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/banners`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/admin/banners');
                toast.success('Banner created successfully!');
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
                toast.error('Validation failed. Please check the errors.');
            } else {
                toast.error('Unable to create the banner!');
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
                <Title text="Create Banner" />
            </div>
            <BannerForm onSubmit={handleSubmit} validationErrors={validationErrors} loading={loading} />
        </div>
    );
};

export default CreateBanner;
