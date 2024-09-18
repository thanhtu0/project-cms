import { CategoryForm } from '~/common/Form';
import EditItem from '~/common/EditItem';

const EditCategory = () => {
    return (
        <EditItem
            endpoint="categories"
            formComponent={CategoryForm}
            title="Category"
            redirectPath="/admin/categories"
        />
    );
};

export default EditCategory;
