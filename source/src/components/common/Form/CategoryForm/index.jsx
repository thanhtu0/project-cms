import { Link } from 'react-router-dom';

const CategoryForm = ({ onSubmit, initialData = {}, validationErrors = {} }) => {
    return (
        <div className="list__form">
            <form onSubmit={onSubmit} encType="multipart/form-data">
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
                        <label htmlFor="subject">Category Description:</label>
                    </div>
                    <div className="col-75">
                        <textarea
                            name="description"
                            style={{ height: '200px' }}
                            defaultValue={initialData.description || ''}
                        ></textarea>
                        <span className="text-danger">{validationErrors.description}</span>
                    </div>
                </div>

                <div className="btn-actions">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <Link className="btn btn-outline-default" to="/admin/categories">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
