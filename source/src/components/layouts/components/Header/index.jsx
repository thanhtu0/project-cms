import { BASE_URL } from '~/components/utils/apiURL';
import { NavMenu } from '..';
import useContactInfo from '~/components/hooks/useContactInfo';
import useFetch from '~/components/hooks/useFetch';
import './Header.scss';
import InfoHeader from './InfoHeader';
import InfoNavigation from './InfoNavigation';

const Header = ({ setActiveTab }) => {
    const { data: contactData, loading: contactLoading, error: contactError } = useFetch(`${BASE_URL}/contact`);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(`${BASE_URL}/categories`);

    const { companyName, infoItems } = useContactInfo(
        contactData && !contactLoading && !contactError ? contactData : [],
    );
    return (
        <header className="header flex-column">
            {!contactLoading && contactData ? (
                <InfoHeader infoItems={infoItems} loading={contactLoading} error={contactError} />
            ) : (
                <p>Loading contact data...</p>
            )}

            <InfoNavigation
                companyName={companyName}
                categories={categories}
                categoriesLoading={categoriesLoading}
                categoriesError={categoriesError}
                setActiveTab={setActiveTab}
            />
        </header>
    );
};

export default Header;
