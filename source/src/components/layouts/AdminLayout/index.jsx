import useToggleNavigation from '~/components/hooks/useToggleNavigation ';
import Main from '../components/Main';
import Navigation from '../components/Navigation';
import './AdminLayout.scss';

const AdminLayout = ({ children }) => {
    useToggleNavigation();

    return (
        <div className="wrapper">
            <div className="container">
                <Navigation />
                <Main />
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
