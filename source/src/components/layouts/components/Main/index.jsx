import useToggleNavigation from '~/components/hooks/useToggleNavigation ';
import './Main.scss';
import OrderDetailList from '../OrderDetailList';
import Card from '../Card';

const Main = () => {
    useToggleNavigation();

    return (
        <div className="main">
            <div className="topbar flex flex-between">
                <div className="toggle flex flex-center">
                    <ion-icon name="menu-outline"></ion-icon>
                </div>

                <div className="search">
                    <label>
                        <input type="text" placeholder="Search here" />
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                </div>

                <div className="user">
                    <img src="/user_logo.jpg" alt="logo_user" />
                </div>
            </div>

            <Card />
            <OrderDetailList />
        </div>
    );
};

export default Main;
