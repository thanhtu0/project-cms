import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '~/common';
import { FashionForm } from '~/common/Form';
import Title from '~/common/Title';
import { CATEGORIES_URL, FASHIONS_URL } from '~/utils/apiURL';

const EditFashion = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fashionData, setFashionData] = useState(null);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(`${CATEGORIES_URL}`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        async function fetchFashion() {
            if (categories.length === 0) return;

            try {
                const response = await fetch(`${FASHIONS_URL}/${id}`);
                const data = await response.json();
                if (!data.fashion) {
                    throw new Error('Fashion not found');
                }
                const fashion = data.fashion;
                const category = categories.find((c) => c.id === fashion.categoryId);
                if (category) {
                    setFashionData({ ...fashion, categoryName: category.name });
                } else {
                    setFashionData(fashion);
                }
            } catch (error) {
                console.error('Failed to fetch fashion:', error);
                toast.error('Failed to load fashion!');
            }
        }

        fetchFashion();
    }, [id, categories]);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('Submit button clicked');
        setLoading(true);

        const formData = new FormData(event.target);

        const categoryId = parseInt(formData.get('categoryId'), 10);
        formData.set('categoryId', categoryId.toString());

        const fashion = Object.fromEntries(formData.entries());
        if (!fashion.label || !fashion.title || !fashion.subtitle || !fashion.categoryId || !fashion.description) {
            setValidationErrors({
                label: !fashion.label ? 'Label is required' : '',
                title: !fashion.title ? 'Title is required' : '',
                subtitle: !fashion.subtitle ? 'Subtitle is required' : '',
                description: !fashion.description ? 'Description is required' : '',
                categoryId: !fashion.categoryId ? 'Category ID is required' : '',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${FASHIONS_URL}/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                navigate('/admin/fashions');
                toast.success('Fashion updated successfully!');
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
                console.error('Validation errors:', data);
                toast.error('Validation failed. Please check the errors.');
            } else {
                const errorText = await response.text();
                console.error('Server error:', errorText);
                toast.error('Unable to update the fashion!');
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('Unable to connect to the server!');
        } finally {
            setLoading(false);
        }
    }

    if (!fashionData) return <Loading />;

    return (
        <div className="list">
            <div className="list__header">
                <Title text="Edit Fashion" />
            </div>
            <FashionForm
                onSubmit={handleSubmit}
                initialData={fashionData}
                validationErrors={validationErrors}
                loading={loading}
                categories={categories}
            />
        </div>
    );
};

export default EditFashion;
