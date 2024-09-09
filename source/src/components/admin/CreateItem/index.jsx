import Title from '~/components/common/Title';
import useFormHandler from '~/components/hooks/useFormHandle';

const CreateItem = ({ endpoint, formComponent: FormComponent, title, redirectPath }) => {
    const { handleSubmit, validationErrors } = useFormHandler(endpoint, null, redirectPath, title);

    return (
        <div className="list">
            <div className="list__header">
                <Title text={`Create ${title}`} />
            </div>
            <FormComponent onSubmit={handleSubmit} validationErrors={validationErrors} />
        </div>
    );
};

export default CreateItem;
