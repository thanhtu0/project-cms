import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Error, Loading } from '~/components/common';
import useFooterData from '~/components/hooks/useContactData';
import { createSlug } from '~/components/utils/helpers';

const AboutSection = () => {
    const { data, loading, error } = useFooterData();
    const [links, setLinks] = useState({ left: [], right: [] });
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data[0] && data[0].about) {
            const aboutLinks = data[0].about;
            const leftLinks = aboutLinks.slice(0, 5);
            const rightLinks = aboutLinks.length > 5 ? aboutLinks.slice(5) : [];
            setLinks({ left: leftLinks, right: rightLinks });
        }
    }, [data]);

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;

    const handleBrandClick = (name) => {
        const slug = createSlug(name);
        navigate(`/about/${slug}`);
    };

    return (
        <div className="footer-section">
            <h3 className="fs-16 text-white">About</h3>
            <div className="about-section">
                <ul className="about-left">
                    {links.left.map(({ id, name }) => (
                        <li key={id}>
                            <button onClick={() => handleBrandClick(name)} aria-label={`About ${name}`}>
                                {name}
                            </button>
                        </li>
                    ))}
                </ul>
                {links.right.length > 0 && (
                    <ul className="about-right">
                        {links.right.map(({ id, name }) => (
                            <li key={id}>
                                <button onClick={() => handleBrandClick(name)} aria-label={`About ${name}`}>
                                    {name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AboutSection;
