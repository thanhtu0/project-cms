import GoToTopButton from '~/components/GoToTopButton';
import { Banner, Brand, Footer, Header } from '../components';
import Subscribe from '../components/Subscribe';
import './UserLayout.scss';

const UserLayout = ({ children, activeTab, setActiveTab }) => {
    return (
        <div className="user_wrapper flex">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="user_wrapper__container mw-144">
                <div className="user_wrapper__content mw-144">
                    <Banner activeTab={activeTab} />
                    <Brand />
                    {children}
                </div>
            </div>
            <Subscribe />
            <Footer />
            <GoToTopButton />
        </div>
    );
};

export default UserLayout;
