import { CATEGORIES_URL } from '~/utils/apiURL';
import { NavMenu } from '..';
import useContactData from '~/hooks/useContactData';
import useFetch from '~/hooks/useFetch';
import './Header.scss';
import InfoHeader from './InfoHeader';
import InfoNavigation from './InfoNavigation';
import { faLocationDot, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const { data: contactData, loading: contactLoading, error: contactError } = useContactData();
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(`${CATEGORIES_URL}`);

    return (
        <header className="header mw-144 flex-column">
            {!contactLoading ? (
                contactData ? (
                    <InfoHeader
                        infoItems={[
                            {
                                icon: faPhoneVolume,
                                text: contactData[0]?.store?.telephone || 'N/A',
                                className: 'phone',
                            },
                            {
                                icon: faLocationDot,
                                text: contactData[0]?.store?.address || 'N/A',
                                className: 'address',
                            },
                        ]}
                        loading={contactLoading}
                        error={contactError}
                    />
                ) : (
                    <p>No contact data available</p>
                )
            ) : (
                <p>Loading contact data...</p>
            )}

            <InfoNavigation
                companyName={contactData?.[0]?.store?.companyName || 'Company Name'}
                categories={categories || []}
                categoriesLoading={categoriesLoading}
                categoriesError={categoriesError}
            />

            <NavMenu />
        </header>
    );
};

export default Header;
