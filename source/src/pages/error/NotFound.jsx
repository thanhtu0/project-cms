import { Button } from '~/components';
import useIsAdmin from '~/hooks/useIsAdmin';
import { error } from '~/utils/images';

const NotFound = () => {
    const isAdmin = useIsAdmin();
    const redirectPath = isAdmin ? '/admin' : '/';

    return (
        <section className="error-404 mh-100 flex flex-column flex-center p-2 text-center">
            <h1 className="fs-180 fw-7 text-black">404</h1>
            <h2 className="fs-24 fw-7 text-black-2 mt-3">The page you are looking for doesn't exist.</h2>
            <Button className="my-2" to={redirectPath} secondary>
                {isAdmin ? 'Back to Dashboard' : 'Back to Home'}
            </Button>
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
                    Thanh's Tu
                </a>
            </div>
        </section>
    );
};

export default NotFound;
