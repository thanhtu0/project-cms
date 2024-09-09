import { BASE_URL } from '~/components/utils/apiURL';
import { NavMenu } from '..';
import useContactInfo from '~/components/hooks/useContactInfo';
import useFetch from '~/components/hooks/useFetch';
import './Header.scss';
import InfoHeader from './InfoHeader';
import InfoNavigation from './InfoNavigation';

const Header = () => {
    const { data: contactData, loading: contactLoading, error: contactError } = useFetch(`${BASE_URL}/contact`);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(`${BASE_URL}/categories`);

    const { companyName, infoItems } = useContactInfo(contactData);

    return (
        <header className="header flex-column">
            <InfoHeader infoItems={infoItems} loading={contactLoading} error={contactError} />

            <InfoNavigation
                companyName={companyName}
                categories={categories}
                categoriesLoading={categoriesLoading}
                categoriesError={categoriesError}
            />

            <NavMenu />
        </header>
    );
};

export default Header;
