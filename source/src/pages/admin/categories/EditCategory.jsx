import { EditItem } from '~/components/admin';
import { CategoryForm, GenericForm } from '~/components/common/Form';

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
