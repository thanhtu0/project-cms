import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryForm } from '~/components/common/Form';
import Title from '~/components/common/Title';

const EditCategory = () => {
    const params = useParams();
    const [initialData, setInitialData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getCategory() {
            try {
                const response = await fetch('http://localhost:4000/categories/' + params.id);
                if (response.ok) {
                    const data = await response.json();
                    setInitialData(data);
                } else {
                    alert('Unable to read the category details');
                }
            } catch (error) {
                alert('Unable to connect to the server!');
            }
        }

        getCategory();
    }, [params.id]);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const category = Object.fromEntries(formData.entries());

        if (!category.name || !category.description) {
            setValidationErrors({
                name: !category.name ? 'Name is required' : '',
                description: !category.description ? 'Description is required' : '',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/categories/' + params.id, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                navigate('/admin/categories');
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
            } else {
                alert('Unable to update the category!');
            }
        } catch (error) {
            alert('Unable to connect to the server!');
        }
    }

    return (
        <div className="list">
            <div className="list__header">
                <Title text="Edit Category" />
            </div>
            <CategoryForm onSubmit={handleSubmit} initialData={initialData} validationErrors={validationErrors} />
        </div>
    );
};

export default EditCategory;
