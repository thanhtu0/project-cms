import { Link } from 'react-router-dom';
import useIsAdmin from '~/components/hooks/useIsAdmin';
import { error } from '~/components/utils/images';

const NotFound = () => {
    const isAdmin = useIsAdmin();
    const redirectPath = isAdmin ? '/admin' : '/';

    return (
        <section className="error error-404 flex flex-column flex-center p-2 text-center">
            <h1 className="fs-180 fw-7 text-black">404</h1>
            <h2 className="ds-24 fw-7 text-black-2 mt-3">The page you are looking for doesn't exist.</h2>
            <Link className="btn bg-gray-9a text-gray" to={redirectPath}>
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
            <div className="credits mt-2 fs-14 text-black-2">
                Designed by{' '}
                <a className="text-black-1 fw-7" href="https://www.facebook.com/ThanhTu03012002/">
                    Thanh Tu
                </a>
            </div>
        </section>
    );
};

export default NotFound;
