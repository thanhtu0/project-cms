import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePaginatedData = (url, itemsPerPage = 10) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = useCallback(
        (page = 1) => {
            const randomParam = `?_=${new Date().getTime()}`;
            fetch(`${url}${randomParam}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Failed to fetch data');
                })
                .then((data) => {
                    const startIndex = (page - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    const paginatedData = data.slice(startIndex, endIndex);

                    setData(paginatedData);
                    setTotalItems(data.length);
                    setTotalPages(Math.ceil(data.length / itemsPerPage));
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        [url, itemsPerPage],
    );

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(query.get('page'), 10);

        if (pageFromUrl && pageFromUrl > 0) {
            setCurrentPage(pageFromUrl);
        } else {
            setCurrentPage(1);
        }
    }, [location.search]);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, fetchData]);

    useEffect(() => {
        if (currentPage === 1) {
            navigate(`${location.pathname}`, { replace: true });
        } else {
            navigate(`${location.pathname}?page=${currentPage}`, { replace: true });
        }
    }, [currentPage, navigate, location.pathname]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleRefresh = () => {
        setData([]);
        fetchData(currentPage);
    };

    return {
        data,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange,
        handleRefresh,
    };
};

export default usePaginatedData;
