import Navigation from '../components/Navigation';
import './AdminLayout.scss';

const AdminLayout = ({ children }) => {
    return (
        <div className="wrapper">
            <div className="container">
                <Navigation />
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
