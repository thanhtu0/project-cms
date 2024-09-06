// hooks/useFetchItem.js
import { useEffect, useState } from 'react';

const useFetchItem = (endpoint, id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchItem() {
            try {
                const response = await fetch(`http://localhost:4000/${endpoint}/${id}`);
                if (response.ok) {
                    const item = await response.json();
                    setData(item);
                } else {
                    setError('Unable to fetch item');
                }
            } catch (error) {
                setError('Unable to connect to the server!');
            }
        }

        fetchItem();
    }, [endpoint, id]);

    return { data, error };
};

export default useFetchItem;