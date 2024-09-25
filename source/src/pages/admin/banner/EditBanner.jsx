import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '~/common';
import { BannerForm } from '~/common/Form';
import Title from '~/common/Title';
import { BANNERS_URL, CATEGORIES_URL } from '~/utils/apiURL';

const EditBanner = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [bannerData, setBannerData] = useState(null);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBanner() {
            try {
                const response = await fetch(`${BANNERS_URL}/${id}`);
                const data = await response.json();

                const banner = data.banner;
                const category = categories.find((c) => c.id === banner.categoryId);
                if (category) {
                    setBannerData({ ...banner, categoryName: category.name });
                } else {
                    setBannerData(banner);
                }
            } catch (error) {
                console.error('Failed to fetch banner:', error);
                toast.error('Failed to load banner!');
            }
        }

        async function fetchCategories() {
            try {
                const response = await fetch(`${CATEGORIES_URL}`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }

        fetchBanner();
        fetchCategories();
    }, [id, categories]);

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
            const response = await fetch(`${BANNERS_URL}/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                navigate('/admin/banners');
                toast.success('Banner updated successfully!');
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
                console.error('Validation errors:', data);
                toast.error('Validation failed. Please check the errors.');
            } else {
                const errorText = await response.text();
                console.error('Server error:', errorText);
                toast.error('Unable to update the banner!');
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('Unable to connect to the server!');
        } finally {
            setLoading(false);
        }
    }

    if (!bannerData) return <Loading />;

    return (
        <div className="list">
            <div className="list__header">
                <Title text="Edit Banner" />
            </div>
            <BannerForm
                onSubmit={handleSubmit}
                initialData={bannerData}
                validationErrors={validationErrors}
                loading={loading}
                categories={categories}
            />
        </div>
    );
};

export default EditBanner;
