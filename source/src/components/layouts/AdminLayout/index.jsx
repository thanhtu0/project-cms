import Navigation from '../components/Navigation';

const AdminLayout = ({ children }) => {
    return (
        <div>
            <div>
                <div className="container">
                    <Navigation />
                    <div className="content">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
