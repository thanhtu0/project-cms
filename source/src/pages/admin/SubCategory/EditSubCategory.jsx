import { SubCategoryForm } from '~/common/Form';
import EditItem from '~/common/EditItem';

const EditSubCategory = () => {
    return (
        <EditItem
            endpoint="subcategories"
            formComponent={SubCategoryForm}
            title="SubCategory"
            redirectPath="/admin/subcategories"
        />
    );
};

export default EditSubCategory;
