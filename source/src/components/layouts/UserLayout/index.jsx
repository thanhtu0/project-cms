import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import React from 'react';

const UserLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default UserLayout;
