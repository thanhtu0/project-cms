import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BannerForm } from '~/common/Form';
import Title from '~/common/Title';
import { BASE_URL } from '~/utils/apiURL';

const EditBanner = () => {
    const { id } = useParams();
    const [banner, setBanner] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBanner() {
            try {
                const response = await fetch(`${BASE_URL}/banners/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched banner data:', data);
                    setBanner(data.banner);
                } else {
                    toast.error('Banner not found.');
                    navigate('/admin/banners');
                }
            } catch (error) {
                console.error('Failed to fetch banner:', error);
                toast.error('Failed to fetch banner.');
            } finally {
                setLoading(false);
            }
        }

        async function fetchCategories() {
            try {
                const response = await fetch(`${BASE_URL}/categories`);
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    toast.error('Failed to fetch categories.');
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                toast.error('Failed to fetch categories.');
            }
        }

        fetchBanner();
        fetchCategories();
    }, [id, navigate]);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        
        const categoryId = parseInt(formData.get('categoryId'), 10);
        formData.set('categoryId', categoryId.toString());

        const banner = Object.fromEntries(formData.entries());
        console.log(banner);

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
            const response = await fetch(`${BASE_URL}/banners/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            const responseData = await response.json();

            if (response.ok) {
                navigate('/admin/banners');
                toast.success('Banner updated successfully!');
            } else if (response.status === 400) {
                setValidationErrors(responseData);
                toast.error('Validation failed. Please check the errors.');
            } else {
                toast.error('Unable to update the banner!');
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('Unable to connect to the server!');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (!banner) return <div>No banner data found</div>;

    return (
        <div className="list">
            <div className="list__header">
                <Title text="Edit Banner" />
            </div>
            <BannerForm
                onSubmit={handleSubmit}
                initialData={banner}
                validationErrors={validationErrors}
                loading={loading}
                categories={categories}
            />
        </div>
    );
};

export default EditBanner;
