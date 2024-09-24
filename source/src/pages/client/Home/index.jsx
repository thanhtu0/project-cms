import { BannerSection, RouteOne } from '~/layouts/components';
import { FashionContainer, ReleaseContainer, SeasonContainer } from '~/layouts/components/Product';

const Home = () => {
    return (
        <>
            <FashionContainer />
            <SeasonContainer />
            <RouteOne />
            <ReleaseContainer />
            <BannerSection />
        </>
    );
};

export default Home;
