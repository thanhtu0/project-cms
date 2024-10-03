import { BannerSection, RouteOne } from '~/layouts/components';
import { Fashion, Release, Season } from '~/layouts/components/Product';

const Home = ({ activeTab }) => {
    return (
        <>
            <Fashion activeTab={activeTab} />
            <Season activeTab={activeTab} />
            <RouteOne />
            <Release activeTab={activeTab} />
            <BannerSection />
        </>
    );
};

export default Home;
