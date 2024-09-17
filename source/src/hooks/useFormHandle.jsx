// hooks/useFormHandler.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/apiURL';
import { toast } from 'react-toastify';

const useFormHandler = (endpoint, id = null, redirectPath, title) => {
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const item = Object.fromEntries(formData.entries());

        if (!item.name || !item.description) {
            setValidationErrors({
                name: !item.name ? 'Name is required' : '',
                description: !item.description ? 'Description is required' : '',
            });
            toast.error('Please fill out all required fields!');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}${id ? `/${id}` : ''}`, {
                method: id ? 'PATCH' : 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success(`${title} ${id ? 'updated' : 'created'} successfully!`);
                navigate(redirectPath);
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
                toast.error(`Failed to ${id ? 'update' : 'create'} ${title.toLowerCase()}!`);
            } else {
                toast.error(`Unable to ${id ? 'update' : 'create'} the ${title.toLowerCase()}!`);
            }
        } catch (error) {
            toast.error('Unable to connect to the server!');
        }
    }

    return { handleSubmit, validationErrors };
};

export default useFormHandler;
