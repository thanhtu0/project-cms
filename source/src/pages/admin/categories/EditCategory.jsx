import EditItem from '~/components/admin/EditItem';
import { CategoryForm } from '~/components/common/Form';

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
