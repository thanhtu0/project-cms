import { BannerSection, RouteOne } from '~/layouts/components';
import { Fashion, ReleaseContainer, SeasonContainer } from '~/layouts/components/Product';

const Home = ({ activeTab }) => {
    return (
        <>
            <Fashion activeTab={activeTab} />
            <SeasonContainer />
            <RouteOne />
            <ReleaseContainer />
            <BannerSection />
        </>
    );
};

export default Home;
