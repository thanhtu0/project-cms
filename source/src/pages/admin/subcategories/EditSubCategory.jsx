import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubCategoryForm } from '~/components/common/Form';
import Title from '~/components/common/Title';

const EditSubCategory = () => {
    const params = useParams();
    const [initialData, setInitialData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getSubCategory() {
            try {
                const response = await fetch('http://localhost:4000/subcategories/' + params.id);
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

        getSubCategory();
    }, [params.id]);

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
            const response = await fetch('http://localhost:4000/subcategories/' + params.id, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                navigate('/admin/subcategories');
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
            } else {
                alert('Unable to update the subcategory!');
            }
        } catch (error) {
            alert('Unable to connect to the server!');
        }
    }

    return (
        <div className="list">
            <div className="list__header">
                <Title text="Edit SubCategory" />
            </div>
            <SubCategoryForm onSubmit={handleSubmit} initialData={initialData} validationErrors={validationErrors} />
        </div>
    );
};

export default EditSubCategory;
