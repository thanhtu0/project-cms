import { CATEGORIES_URL, CONTACT_URL } from '~/utils/apiURL';
import { NavMenu } from '..';
import useFetch from '~/hooks/useFetch';
import './Header.scss';
import InfoHeader from './InfoHeader';
import InfoNavigation from './InfoNavigation';
import { faLocationDot, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { Error, Loading } from '~/common';

const Header = ({ activeTab, setActiveTab }) => {
    const { data: contact, loading: contactLoading, error: contactError } = useFetch(`${CONTACT_URL}`);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(`${CATEGORIES_URL}`);

    if (contactLoading) return <Loading />;
    if (contactError) return <Error message={contactError.message} />;

    const contactInfo = contact && contact.length > 0 ? contact[0] : null;

    return (
        <header className="header mw-144 flex-column">
            {!contactLoading ? (
                contactInfo ? (
                    <InfoHeader
                        infoItems={[
                            {
                                icon: faPhoneVolume,
                                text: contact[0].telephone || 'N/A',
                                className: 'phone',
                            },
                            {
                                icon: faLocationDot,
                                text: contact[0].address || 'N/A',
                                className: 'address',
                            },
                        ]}
                        loading={contactLoading}
                        error={contactError}
                    />
                ) : (
                    <Error message="No contact information" />
                )
            ) : (
                <Loading />
            )}

            <InfoNavigation
                companyName={contactInfo?.companyName || 'Company Name'}
                categories={categories || []}
                categoriesLoading={categoriesLoading}
                categoriesError={categoriesError}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <NavMenu />
        </header>
    );
};

export default Header;
