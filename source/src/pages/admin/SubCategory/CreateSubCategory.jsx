import { SubCategoryForm } from '~/common/Form';
import CreateItem from '~/common/CreateItem';

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
