import CreateItem from '~/components/admin/CreateItem';
import { SubCategoryForm } from '~/components/common/Form';

const CreateSubCategory = () => {
    return (
        <CreateItem
            endpoint="subcategories"
            formComponent={SubCategoryForm}
            title="SubCategory"
            redirectPath="/admin/subcategories"
        />
    );
};

export default CreateSubCategory;
