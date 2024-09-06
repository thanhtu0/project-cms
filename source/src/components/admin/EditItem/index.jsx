import { useParams } from 'react-router-dom';
import Title from '~/components/common/Title';
import useFetchItem from '~/components/hooks/useFetchItem';
import useFormHandler from '~/components/hooks/useFormHandle';

const EditItem = ({ endpoint, formComponent: FormComponent, title, redirectPath }) => {
    const params = useParams();
    const { data: initialData, error } = useFetchItem(endpoint, params.id);
    const { handleSubmit, validationErrors } = useFormHandler(endpoint, params.id, redirectPath, title);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="list">
            <div className="list__header">
                <Title text={`Edit ${title}`} />
            </div>
            <FormComponent onSubmit={handleSubmit} initialData={initialData} validationErrors={validationErrors} />
        </div>
    );
};

export default EditItem;
