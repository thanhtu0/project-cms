import { useState } from 'react';
import { Title } from '~/common';
import ToggleSection from '~/components/ToggleSection';
import { AboutSection, ContactSection, PaymentSection, SocialSection } from './Section';
import { toggleVisibility } from '~/helpers/uiHelpers';

const Information = () => {
    const [visible, setVisible] = useState({
        about: false,
        contact: true,
        payment: false,
        social: false,
    });

    const sections = [
        { key: 'about', title: 'About Store', component: <AboutSection /> },
        { key: 'contact', title: 'Contact Store', component: <ContactSection /> },
        { key: 'payment', title: 'Payment Store', component: <PaymentSection /> },
        { key: 'social', title: 'Social Store', component: <SocialSection /> },
    ];

    const handleToggleVisibility = (section) => {
        setVisible((prevState) => toggleVisibility(prevState, section));
    };

    return (
        <div className="list">
            <div className="list__info">
                <Title text="Information Store" />
            </div>

            {sections.map(({ key, title, component }) => (
                <ToggleSection
                    key={key}
                    title={title}
                    visible={visible[key]}
                    onToggle={() => handleToggleVisibility(key)}
                >
                    {component}
                </ToggleSection>
            ))}
        </div>
    );
};

export default Information;
