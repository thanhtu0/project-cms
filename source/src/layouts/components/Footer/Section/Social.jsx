import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faGithub,
    faInstagram,
    faLinkedin,
    faSnapchat,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import useContactData from '~/hooks/useContactData';
import { Error, Loading } from '~/common';
import Button from '~/components/Button';

const iconMap = {
    facebook: faFacebook,
    instagram: faInstagram,
    github: faGithub,
    twitter: faTwitter,
    snapchat: faSnapchat,
    linkedin: faLinkedin,
};

const SocialSection = () => {
    const { data, loading, error } = useContactData();

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;

    if (data && Array.isArray(data) && data.length > 0) {
        const contact = data[0];
        const socialLinks = contact.social || [];

        if (socialLinks.length > 0) {
            return (
                <div className="footer-section">
                    <h3 className="fs-16 text-white">Social app</h3>
                    <ul className="social-icons">
                        {socialLinks.map(({ id, href, icon, name }) => (
                            <li key={id} className="mr-1 text-white">
                                <Button href={href} icon className={name} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={iconMap[name]} style={{ fontSize: '1.6rem' }} />
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    return (
        <div className="footer-section">
            <h3 className="fs-16 text-white">Social app</h3>
            <p className="text-white">No social links available.</p>
        </div>
    );
};

export default SocialSection;
