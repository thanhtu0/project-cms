import './AdminLayout.scss';
import useToggleNavigation from '~/hooks/useToggleNavigation ';
import { Main, Navigation } from '../components';
import FooterAdmin from '../components/FooterAdmin';

const AdminLayout = ({ children }) => {
    useToggleNavigation();

    return (
        <div className="wrapper mh-100">
            <div className="container">
                <Navigation />
                <Main />
            </div>
            <div className="content mh-100">
                {children}
                <FooterAdmin />
            </div>
        </div>
    );
};

export default AdminLayout;
