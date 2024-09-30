import { useEffect, useState } from 'react';
import { Button } from '~/components';
import useImagePreview from '~/hooks/useImagePreview';
import { FASHION_IMAGES } from '~/utils/apiURL';

const FashionForm = ({ onSubmit, initialData = {}, validationErrors = {}, loading, categories = [] }) => {
    const { imagePreview, handleImageChange } = useImagePreview('');
    const [imageOlder, setImageOlder] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(initialData.categoryId || '');

    useEffect(() => {
        if (initialData.imageUrl) {
            setImageOlder(`${FASHION_IMAGES}/${initialData.categoryName}/${initialData.imageUrl}`);
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
                <input type="hidden" name="type" value="fashion" />
                <div className="row">
                    <div className="col-25">
                        <label>Fashion Label:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="label" defaultValue={initialData.label || ''} />
                        <span className="text-danger">{validationErrors.label}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Category:</label>
                    </div>
                    <div className="col-75 grid">
                        <div className="checkbox">
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
                        </div>
                        <span className="text-danger">{validationErrors.categoryId}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Fashion Title:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="title" defaultValue={initialData.title || ''} />
                        <span className="text-danger">{validationErrors.title}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Fashion SubTitle:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="subtitle" defaultValue={initialData.subtitle || ''} />
                        <span className="text-danger">{validationErrors.subtitle}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Fashion Description:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="description" defaultValue={initialData.description || ''} />
                        <span className="text-danger">{validationErrors.description}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="image">Fashion Image:</label>
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
                    <Button to="/admin/fashions" secondary>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FashionForm;
