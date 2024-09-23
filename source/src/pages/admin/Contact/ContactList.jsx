import { useState } from 'react';
import { Title } from '~/common';
import ToggleSection from '~/components/ToggleSection';
import { AboutSection, ContactSection, PaymentSection, SocialSection } from './Section';
import { toggleVisibility } from '~/utils/helpers';

const ContactList = () => {
    const [visible, setVisible] = useState({
        about: false,
        contact: true,
        payment: false,
        social: false,
    });

    const handleToggleVisibility = (section) => {
        setVisible((prevState) => toggleVisibility(prevState, section));
    };

    return (
        <div className="list">
            <div className="list__info">
                <Title text="Information Store" />
            </div>

            <ToggleSection title="About Store" visible={visible.about} onToggle={() => handleToggleVisibility('about')}>
                <AboutSection />
            </ToggleSection>

            <ToggleSection
                title="Contact Store"
                visible={visible.contact}
                onToggle={() => handleToggleVisibility('contact')}
            >
                <ContactSection />
            </ToggleSection>

            <ToggleSection
                title="Payment Store"
                visible={visible.payment}
                onToggle={() => handleToggleVisibility('payment')}
            >
                <PaymentSection />
            </ToggleSection>

            <ToggleSection
                title="Social Store"
                visible={visible.social}
                onToggle={() => handleToggleVisibility('social')}
            >
                <SocialSection />
            </ToggleSection>
        </div>
    );
};

export default ContactList;
