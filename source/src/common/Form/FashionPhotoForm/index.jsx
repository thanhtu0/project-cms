import { useEffect, useState } from 'react';
import { Button } from '~/components';
import useImagePreview from '~/hooks/useImagePreview';
import { FASHION_PHOTOS_IMAGE } from '~/utils/apiURL';

const FashionPhotoForm = ({ onSubmit, initialData = {}, validationErrors = {}, loading, fashionId }) => {
    const { imagePreview, handleImageChange } = useImagePreview('');
    const [imageOlder, setImageOlder] = useState('');
    const [hidden, setHidden] = useState(initialData.hidden || false);

    useEffect(() => {
        if (initialData.imageUrl) {
            setImageOlder(`${FASHION_PHOTOS_IMAGE}/${initialData.imageUrl}`);
        }
    }, [initialData]);

    const handleHiddenChange = (e) => {
        setHidden(e.target.value === 'true');
    };

    return (
        <div className="list__form">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <input type="hidden" name="type" value="fashionPhoto" />
                <div className="row">
                    <div className="col-25">
                        <label>Photo Name:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="name" defaultValue={initialData.name || ''} autoFocus />
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
