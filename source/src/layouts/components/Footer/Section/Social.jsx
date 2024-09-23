import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faGithub,
    faInstagram,
    faLinkedin,
    faSnapchat,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Error, Loading } from '~/common';
import Button from '~/components/Button';
import useFetch from '~/hooks/useFetch';
import { API_BASE_URL } from '~/utils/apiURL';

const iconMap = {
    facebook: faFacebook,
    instagram: faInstagram,
    github: faGithub,
    twitter: faTwitter,
    snapchat: faSnapchat,
    linkedin: faLinkedin,
};

const SocialSection = () => {
    const { data: socials, loading: socialsLoading, error: socialsError } = useFetch(`${API_BASE_URL}/social`);

    if (socialsLoading) return <Loading />;
    if (socialsError) return <Error message={socialsError.message} />;

    const socialLinks = socials || [];

    return (
        <div className="footer-section">
            <h3 className="fs-16 text-white">Social app</h3>
            {socialLinks.length > 0 ? (
                <ul className="social-icons">
                    {socialLinks.map(({ id, href, icon, name }) => (
                        <li key={id} className="mr-1 text-white">
                            <Button href={href} icon className={name} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={iconMap[name]} style={{ fontSize: '1.6rem' }} />
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="footer-section">
                    <h3 className="fs-16 text-white">Social app</h3>
                    <p className="text-white">No social links available.</p>
                </div>
            )}
        </div>
    );
};

export default SocialSection;
