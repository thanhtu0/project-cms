import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '~/components/common/Title';

const EditItem = ({ endpoint, formComponent: FormComponent, title, redirectPath }) => {
    const params = useParams();
    const [initialData, setInitialData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getItem() {
            try {
                const response = await fetch(`http://localhost:4000/${endpoint}/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setInitialData(data);
                } else {
                    alert(`Unable to read the ${title.toLowerCase()} details`);
                }
            } catch (error) {
                alert('Unable to connect to the server!');
            }
        }

        getItem();
    }, [params.id, endpoint, title]);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const item = Object.fromEntries(formData.entries());

        if (!item.name || !item.description) {
            setValidationErrors({
                name: !item.name ? 'Name is required' : '',
                description: !item.description ? 'Description is required' : '',
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/${endpoint}/${params.id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                navigate(redirectPath);
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
            } else {
                alert(`Unable to update the ${title.toLowerCase()}!`);
            }
        } catch (error) {
            alert('Unable to connect to the server!');
        }
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
