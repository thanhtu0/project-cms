import { BannerSection, RouteOne } from '~/layouts/components';
import { Fashion, ReleaseContainer, Season } from '~/layouts/components/Product';

const Home = ({ activeTab }) => {
    return (
        <>
            <Fashion activeTab={activeTab} />
            <Season activeTab={activeTab} />
            <RouteOne />
            <ReleaseContainer />
            <BannerSection />
        </>
    );
};

export default Home;
