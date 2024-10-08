import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import useImagePreview from '~/hooks/useImagePreview';
import { BRAND_IMAGES } from '~/utils/apiURL';

const BrandForm = ({ onSubmit, initialData = {}, validationErrors = {}, loading }) => {
    const { imagePreview, handleImageChange } = useImagePreview('');
    const [imageOlder, setImageOlder] = useState('');

    useEffect(() => {
        if (initialData.imageUrl) {
            setImageOlder(`${BRAND_IMAGES}/${initialData.imageUrl}`);
        }
    }, [initialData]);

    return (
        <div className="list__form">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <input type="hidden" name="type" value="brand" />
                <div className="row">
                    <div className="col-25">
                        <label>Brand Name:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="name" defaultValue={initialData.name || ''} autoFocus />
                        <span className="text-danger">{validationErrors.name}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="image">Brand Image:</label>
                    </div>
                    <div className="col-75">
                        <input
                            className="form-control"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <span className="text-danger">{validationErrors.image}</span>
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                        {!imagePreview && imageOlder && (
                            <div className="image-preview">
                                <img src={imageOlder} width="150" alt="Existing" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="btn-actions">
                    <Button type="submit" disabled={loading} primary>
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                    <Button to="/admin/brands" secondary>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BrandForm;
