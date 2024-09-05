import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryForm } from '~/components/common/Form';
import Title from '~/components/common/Title';

const CreateCategory = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

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
            const response = await fetch('http://localhost:4000/categories', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/admin/categories');
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
            } else {
                alert('Unable to create the category!');
            }
        } catch (error) {
            alert('Unable to connect to the server!');
        }
    }

    return (
        <div className="list">
            <div className="list__header">
                <Title text="Create Category" />
            </div>
            <CategoryForm onSubmit={handleSubmit} validationErrors={validationErrors} />
        </div>
    );
};

export default CreateCategory;
