import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { UserLayout } from '~/layouts';
import { Fragment, useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import { CATEGORIES_URL } from './utils/apiURL';
import { Error, Loading } from './common';

function App() {
    const [activeTab, setActiveTab] = useState('');
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(CATEGORIES_URL);

    useEffect(() => {
        if (categories && categories.length > 0) {
            setActiveTab(categories[0].name);
        }
    }, [categories]);

    if (categoriesLoading) return <Loading />;
    if (categoriesError) return <Error message={categoriesError.message} />;
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = UserLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout {...(Layout === Fragment ? {} : { activeTab, setActiveTab })}>
                                        <Page activeTab={activeTab} />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = UserLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
