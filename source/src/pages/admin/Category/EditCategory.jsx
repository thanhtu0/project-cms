import { CategoryForm } from '~/common/Form';
import EditItem from '~/components/EditItem';

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
