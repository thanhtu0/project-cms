import { useEffect, useState } from 'react';
import { Button } from '~/components';
import useImagePreview from '~/hooks/useImagePreview';
import { FASHION_IMAGES } from '~/utils/apiURL';

const FashionPhotoForm = ({
    onSubmit,
    initialData = {},
    validationErrors = {},
    loading,
    fashions,
    fashionId,
    categories,
}) => {
    const { imagePreview, handleImageChange } = useImagePreview('');
    const [imageOlder, setImageOlder] = useState('');
    const [hidden, setHidden] = useState(initialData.hidden || false);

    const getCategoryName = (fashionId) => {
        const fashion = fashions.find((f) => f.id === fashionId);
        if (fashion) {
            const category = categories.find((c) => c.id === fashion.categoryId);
            return category ? category.name : 'Unknown Category';
        }
        return 'Unknown Fashion';
    };

    const categoryName = getCategoryName(initialData.fashionId);

    useEffect(() => {
        if (initialData.imageUrl) {
            setImageOlder(`${FASHION_IMAGES}/${categoryName}/${initialData.imageUrl}`);
        }
    }, [initialData, categoryName]);

    const handleHiddenChange = (e) => {
        setHidden(e.target.value === 'true');
    };

    return (
        <div className="list__form">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-25">
                        <label>Photo Name:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="name" defaultValue={initialData.name || ''} />
                        <span className="text-danger">{validationErrors.name}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label>Hidden:</label>
                    </div>
                    <div className="col-75">
                        <select name="hidden" defaultValue={hidden.toString()} onChange={handleHiddenChange}>
                            <option value="false">Show Photo</option>
                            <option value="true">Do not Show Photo</option>
                        </select>
                        <span className="text-danger">{validationErrors.hidden}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="image">Fashion Photo Image:</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="form-control"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                        {!imagePreview && imageOlder && (
                            <div className="image-preview">
                                <img src={imageOlder} alt="Existing" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="btn-actions">
                    <Button type="submit" disabled={loading} primary>
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                    <Button to={`/admin/fashion/edit/${fashionId}`} secondary>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FashionPhotoForm;
