import { Link } from 'react-router-dom';
import useIsAdmin from '~/components/hooks/useIsAdmin';
import { error } from '~/components/utils/images';

const NotFound = () => {
    const isAdmin = useIsAdmin();
    const redirectPath = isAdmin ? '/admin' : '/';

    return (
        <section className="error error-404">
            <h1>404</h1>
            <h2>The page you are looking for doesn't exist.</h2>
            <Link className="btn" to={redirectPath}>
                Back to home
            </Link>
            <img
                src={error}
                className="img-fluid py-5"
                alt="Page Not Found"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                }}
            />
            <div className="credits">
                Designed by <a href="https://www.facebook.com/ThanhTu03012002/">Thanh Tu</a>
            </div>
        </section>
    );
};

export default NotFound;
