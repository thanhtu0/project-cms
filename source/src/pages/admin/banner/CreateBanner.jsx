import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BannerForm } from '~/common/Form';
import Title from '~/common/Title';
import { BASE_URL } from '~/utils/apiURL';

const CreateBanner = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(`${BASE_URL}/categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }

        fetchCategories();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const categoryId = parseInt(formData.get('categoryId'), 10);
        formData.set('categoryId', categoryId.toString());

        const banner = Object.fromEntries(formData.entries());
        if (!banner.season || !banner.title || !banner.subtitle || !banner.categoryId) {
            setValidationErrors({
                season: !banner.season ? 'Season is required' : '',
                title: !banner.title ? 'Title is required' : '',
                subtitle: !banner.subtitle ? 'Subtitle is required' : '',
                categoryId: !banner.categoryId ? 'Category ID is required' : '',
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
            <BannerForm
                onSubmit={handleSubmit}
                validationErrors={validationErrors}
                loading={loading}
                categories={categories}
            />
        </div>
    );
};

export default CreateBanner;
