import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import useImagePreview from '~/hooks/useImagePreview';
import { BANNER_IMAGES } from '~/utils/apiURL';

const BannerForm = ({ onSubmit, initialData = {}, validationErrors = {}, loading, categories = [] }) => {
    const { imagePreview, handleImageChange } = useImagePreview('');
    const [imageOlder, setImageOlder] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(initialData.categoryId || '');

    useEffect(() => {
        if (initialData.imageUrl) {
            setImageOlder(`${BANNER_IMAGES}/${initialData.categoryName}/${initialData.imageUrl}`);
        }
    }, [initialData]);

    useEffect(() => {
        setSelectedCategory(initialData.categoryId || '');
    }, [initialData.categoryId]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="list__form">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <input type="hidden" name="type" value="banner" />
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
                        <label>Category:</label>
                    </div>
                    <div className="col-75">
                        {categories.map((category) => (
                            <div key={category.id} className="col-25 mt-12">
                                <input
                                    type="radio"
                                    name="categoryId"
                                    value={category.id}
                                    checked={selectedCategory === category.id.toString()}
                                    onChange={handleCategoryChange}
                                    className="custom-radio"
                                />
                                {category.name}
                            </div>
                        ))}
                        <span className="text-danger">{validationErrors.categoryId}</span>
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
                    <Button to="/admin/banners" secondary>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BannerForm;
