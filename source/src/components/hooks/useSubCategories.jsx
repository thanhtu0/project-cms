import { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/apiURL';

const useSubcategories = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await fetch(`${BASE_URL}/subcategories`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setSubcategories(data);
                } else {
                    console.warn('Unexpected data format:', data);
                    setSubcategories([]);
                }
            } catch (err) {
                console.error('Error fetching subcategories:', err);
                setError(err);
                setSubcategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, []);

    return { subcategories, loading, error };
};

export default useSubcategories;
