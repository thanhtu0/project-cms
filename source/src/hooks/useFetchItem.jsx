// hooks/useFetchItem.js
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/apiURL';
import { toast } from 'react-toastify';

const useFetchItem = (endpoint, id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchItem() {
            try {
                const response = await fetch(`${BASE_URL}/${endpoint}/${id}`);
                if (response.ok) {
                    const item = await response.json();
                    setData(item);
                } else {
                    setError('Unable to fetch item');
                    toast.error('Failed to fetch item data!');
                }
            } catch (error) {
                setError('Unable to connect to the server!');
                toast.error('Unable to connect to the server!');
            }
        }

        fetchItem();
    }, [endpoint, id]);

    return { data, error };
};

export default useFetchItem;
