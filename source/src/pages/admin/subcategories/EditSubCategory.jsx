import { EditItem } from '~/components/admin';
import { SubCategoryForm } from '~/components/common/Form';

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
