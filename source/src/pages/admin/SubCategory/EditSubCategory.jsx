import { SubCategoryForm } from '~/common/Form';
import EditItem from '~/components/EditItem';

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
