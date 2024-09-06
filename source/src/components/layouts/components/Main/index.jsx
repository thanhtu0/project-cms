import './Main.scss';

const Main = () => {
    return (
        <div className="main position-absolute bg-white">
            <div className="topbar flex flex-between px-1">
                <div className="toggle flex flex-center position-relative bg-gray-f1 fs-40">
                    <ion-icon name="menu-outline"></ion-icon>
                </div>

                <div className="search position-relative mx-1">
                    <label className="position-relative w-100">
                        <input type="text" placeholder="Search here" />
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                </div>

                <div className="user position-relative w-4 h-4">
                    <img className='position-absolute top-0 left-0 w-100 h-100' src="/user_logo.jpg" alt="logo_user" />
                </div>
            </div>
        </div>
    );
};

export default Main;
