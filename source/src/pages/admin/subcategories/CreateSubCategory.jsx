import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubCategoryForm } from '~/components/common/Form';
import Title from '~/components/common/Title';

const CreateSubCategory = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const subcategory = Object.fromEntries(formData.entries());

        if (!subcategory.name || !subcategory.description) {
            setValidationErrors({
                name: !subcategory.name ? 'Name is required' : '',
                description: !subcategory.description ? 'Description is required' : '',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/subcategories', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/admin/subcategories');
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
            } else {
                alert('Unable to create the subcategory');
            }
        } catch (error) {
            alert('Unable to connect to the server!');
        }
    }

    return (
        <div className="list">
            <div className="list__header">
                <Title text="Create SubCategory" />
            </div>
            <SubCategoryForm onSubmit={handleSubmit} validationErrors={validationErrors} />
        </div>
    );
};

export default CreateSubCategory;
