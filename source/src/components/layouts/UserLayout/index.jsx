import { Banner, Brand, Footer, Header } from '../components';

const UserLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">
                    <Banner />
                    <Brand />
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserLayout;
