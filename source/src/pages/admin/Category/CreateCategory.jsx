import { CategoryForm } from '~/common/Form';
import CreateItem from '~/common/CreateItem';

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
