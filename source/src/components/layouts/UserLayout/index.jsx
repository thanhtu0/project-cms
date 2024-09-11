import { Banner, Brand, Footer, Header } from '../components';
import './UserLayout.scss';

const UserLayout = ({ children }) => {
    return (
        <div className="user_wrapper flex">
            <Header />
            <div className="user_wrapper__container mw-144">
                <div className="user_wrapper__content mw-144">
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
