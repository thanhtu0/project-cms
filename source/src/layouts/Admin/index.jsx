import './AdminLayout.scss';
import useToggleNavigation from '~/hooks/useToggleNavigation ';
import { Main, Navigation } from '../components';
import FooterAdmin from '../components/FooterAdmin';
import GoToTopButton from '~/components/GoToTopButton';

const AdminLayout = ({ children }) => {
    useToggleNavigation();

    return (
        <div className="wrapper mh-100">
            <div className="container">
                <Navigation />
                <Main />
            </div>
            <div className="content position-absolute left-30 bg-white mh-100">
                {children}
                <FooterAdmin />
                <GoToTopButton />
            </div>
        </div>
    );
};

export default AdminLayout;
