import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useImagePreview from '~/components/hooks/useImagePreview';
import { BASE_URL } from '~/components/utils/apiURL';

const BannerForm = ({ onSubmit, initialData = {}, validationErrors = {}, loading }) => {
    const { imagePreview, handleImageChange } = useImagePreview('');
    const [imageOlder, setImageOlder] = useState('');

    useEffect(() => {
        if (initialData.imageFilename) {
            setImageOlder(`${BASE_URL}/images/banners/categoryId/${initialData.imageFilename}`);
        }
    }, [initialData]);

    return (
        <div className="list__form">
            <form onSubmit={onSubmit}>
                <input type="hidden" name="type" value="brand" />
                <div className="row">
                    <div className="col-25">
                        <label>Banner Season:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="season" defaultValue={initialData.season || ''} />
                        <span className="text-danger">{validationErrors.season}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Category Name:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="name" defaultValue={initialData.name || ''} />
                        <span className="text-danger">{validationErrors.name}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Banner Title:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="title" defaultValue={initialData.title || ''} />
                        <span className="text-danger">{validationErrors.title}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Banner SubTitle:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="subtitle" defaultValue={initialData.subtitle || ''} />
                        <span className="text-danger">{validationErrors.subtitle}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="image">Banner Image:</label>
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
                            <div className="image-preview logo">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                        {!imagePreview && imageOlder && (
                            <div className="image-preview logo">
                                <img src={imageOlder} width="150" alt="Existing" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="btn-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <Link className="btn btn-outline-default" to="/admin/banners">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default BannerForm;
