import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '~/common';
import { FashionPhotoForm } from '~/common/Form';
import Title from '~/common/Title';
import { FASHION_PHOTOS_URL } from '~/utils/apiURL';

const EditFashionPhoto = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fashionPhotoData, setFashionPhotoData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchFashionPhoto() {
            try {
                const response = await fetch(`${FASHION_PHOTOS_URL}/${id}`);
                const data = await response.json();
                if (!data) {
                    throw new Error('Fashion Photo not found');
                }
                setFashionPhotoData(data);
            } catch (error) {
                console.error('Failed to fetch fashion photo:', error);
                toast.error('Failed to load fashion photo!');
            }
        }

        fetchFashionPhoto();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const hidden = formData.get('hidden') === 'true';

        const fashionPhoto = {
            ...Object.fromEntries(formData.entries()),
            hidden,
        };

        if (!fashionPhoto.name || typeof fashionPhoto.hidden !== 'boolean') {
            setValidationErrors({
                name: !fashionPhoto.name ? 'Name is required' : '',
                hidden: typeof fashionPhoto.hidden !== 'boolean' ? 'Hidden status is required' : '',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${FASHION_PHOTOS_URL}/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                navigate('/admin/fashionPhotos');
                toast.success('Fashion photo updated successfully!');
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
                toast.error('Validation failed. Please check the errors.');
            } else {
                const errorText = await response.text();
                console.error('Server error:', errorText);
                toast.error('Unable to update the fashion photo!');
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('Unable to connect to the server!');
        } finally {
            setLoading(false);
        }
    }

    if (!fashionPhotoData) return <Loading />;

    return (
        <>
            <div className="list">
                <div className="list__header">
                    <Title text="Edit Fashion Photo" />
                </div>
                <FashionPhotoForm
                    onSubmit={handleSubmit}
                    initialData={fashionPhotoData}
                    validationErrors={validationErrors}
                    loading={loading}
                />
            </div>
        </>
    );
};

export default EditFashionPhoto;
