import useToggleNavigation from '~/components/hooks/useToggleNavigation ';
import './AdminLayout.scss';
import { Main, Navigation } from '../components';

const AdminLayout = ({ children }) => {
    useToggleNavigation();

    return (
        <div className="wrapper">
            <div className="container">
                <Navigation />
                <Main />
            </div>
            <div className="content">{children}</div>
        </div>
    );
};

export default AdminLayout;
