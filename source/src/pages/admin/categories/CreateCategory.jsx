import CreateItem from '~/components/admin/CreateItem';
import { CategoryForm } from '~/components/common/Form';

const CreateCategory = () => {
    return (
        <CreateItem
            endpoint="categories"
            formComponent={CategoryForm}
            title="Category"
            redirectPath="/admin/categories"
        />
    );
};

export default CreateCategory;
