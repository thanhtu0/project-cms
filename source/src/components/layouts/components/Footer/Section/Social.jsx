import React from 'react';
import useFetch from '~/components/hooks/useFetch';
import { BASE_URL } from '~/components/utils/apiURL';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faGithub,
    faInstagram,
    faLinkedin,
    faSnapchat,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const iconMap = {
    facebook: faFacebook,
    instagram: faInstagram,
    github: faGithub,
    twitter: faTwitter,
    snapchat: faSnapchat,
    linkedin: faLinkedin,
};

const SocialSection = () => {
    const { data, loading, error } = useFetch(`${BASE_URL}/contact`);

    if (loading) return <p>Loading social links...</p>;
    if (error) return <p>Error loading social links</p>;

    if (data && Array.isArray(data) && data.length > 0) {
        const contact = data[0];
        const socialLinks = contact.social || [];

        if (socialLinks.length > 0) {
            return (
                <div className="footer-section">
                    <h3 className="fs-16 text-white">Social app</h3>
                    <ul className="social-icons">
                        {socialLinks.map(({ id, href, icon, name }) => (
                            <li key={id}>
                                <a href={href} className={name} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={iconMap[name]} />
                                </a>
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
