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
        async function fetchData() {
            try {
                const fashionPhotoResponse = await fetch(`${FASHION_PHOTOS_URL}/${id}`);
                const fashionPhotoData = await fashionPhotoResponse.json();

                if (!fashionPhotoData) {
                    throw new Error('Fashion Photo not found');
                }
                setFashionPhotoData(fashionPhotoData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                toast.error('Failed to load data!');
            }
        }

        fetchData();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);

        const hidden = formData.get('hidden') === 'true';

        formData.set('hidden', hidden);
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
                const fashionId = fashionPhotoData.fashionId;
                const data = await response.json();
                console.log(data);
                navigate(`/admin/fashion/edit/${fashionId}`);
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
                    fashionId={fashionPhotoData.fashionId}
                />
            </div>
        </>
    );
};

export default EditFashionPhoto;
