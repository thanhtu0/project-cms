import Button from '~/components/Button';

const SubCategoryForm = ({ onSubmit, initialData = {}, validationErrors = {} }) => {
    return (
        <div className="list__form">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-25">
                        <label>SubCategory Name:</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="name" defaultValue={initialData.name || ''} />
                        <span className="text-danger">{validationErrors.name}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="subject">SubCategory Description:</label>
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
                    <Button type="submit" primary>
                        Submit
                    </Button>
                    <Button to="/admin/subcategories" secondary>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SubCategoryForm;
