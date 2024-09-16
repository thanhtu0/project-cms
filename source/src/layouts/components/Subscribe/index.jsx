import './Subscribe.scss';
import Search from '~/components/Search';
const Subscribe = () => {
    return (
        <div className="subscription mw-144 flex flex-between">
            <div className="subscription__content">
                <p className="subscription__text position-relative">Stay in touch</p>
                <h2 className="subscription__title fs-40 lh-50">Subscribe</h2>
            </div>
            <Search
                placeholder="Enter your email here..."
                buttonText="Subscribe"
                width="480px"
                buttonWidth="125px"
                onSearch={() => {
                    /* Handle search */
                }}
            />
        </div>
    );
};

export default Subscribe;
