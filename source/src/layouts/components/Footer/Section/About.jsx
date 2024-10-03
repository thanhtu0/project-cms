import { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Error, Loading } from '~/common';
import Button from '~/components/Button';
import { createSlug } from '~/helpers/stringHelpers';
import useFetch from '~/hooks/useFetch';
import { API_BASE_URL } from '~/utils/apiURL';

const AboutSection = () => {
    const { data: about, loading: aboutLoading, error: aboutError } = useFetch(`${API_BASE_URL}/about`);
    const [links, setLinks] = useState({ left: [], right: [] });
    const navigate = useNavigate();

    useEffect(() => {
        if (about && about.length > 0) {
            const leftLinks = about.slice(0, 5);
            const rightLinks = about.length > 5 ? about.slice(5) : [];
            setLinks({ left: leftLinks, right: rightLinks });
        }
    }, [about]);

    if (aboutLoading) return <Loading />;
    if (aboutError) return <Error message={aboutError.message} />;

    const handleBrandClick = (name) => {
        const slug = createSlug(name);
        navigate(`/about/${slug}`);
    };

    return (
        <div className="footer-section">
            <h3 className="fs-16 text-white">About</h3>
            <div className="about-section">
                {links.left.length > 0 || links.right.length > 0 ? (
                    <>
                        <ul className="about-left">
                            {links.left.map(({ id, name }) => (
                                <li key={id}>
                                    <Button
                                        onClick={() => handleBrandClick(name)}
                                        aria-label={`Learn more about ${name}`}
                                        className="text-white"
                                        text
                                    >
                                        {name}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                        {links.right.length > 0 && (
                            <ul className="about-right">
                                {links.right.map(({ id, name }) => (
                                    <li key={id}>
                                        <Button
                                            onClick={() => handleBrandClick(name)}
                                            aria-label={`Learn more about ${name}`}
                                            className="text-white text-end"
                                            text
                                        >
                                            {name}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ) : (
                    <p className="text-white fs-14 lh-18">No about methods available.</p>
                )}
            </div>
        </div>
    );
};

export default memo(AboutSection);
