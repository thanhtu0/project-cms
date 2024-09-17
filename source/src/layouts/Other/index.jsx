import GoToTopButton from '~/components/GoToTopButton';
import { Footer, Header, NavMenu } from '../components';

const ProductDetail = ({ children }) => {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <NavMenu />
                <div className="content">{children}</div>
            </div>
            <Footer />
            <GoToTopButton />
        </div>
    );
};

export default ProductDetail;
