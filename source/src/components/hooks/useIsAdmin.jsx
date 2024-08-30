import { useLocation } from 'react-router-dom';

const useIsAdmin = () => {
    const location = useLocation();
    return location.pathname.startsWith('/admin');
};

export default useIsAdmin;
