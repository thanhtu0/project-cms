import { useState, useEffect } from 'react';
import { Title } from '~/common';
import { CONTACT_URL } from '~/utils/apiURL';
import ToggleSection from '~/components/ToggleSection';
import { AboutSection, ContactSection, PaymentSection, SocialSection } from './Section';

const ContactList = () => {
    const [data, setData] = useState({
        about: [],
        store: {},
        payment: [],
        social: [],
    });

    const [visible, setVisible] = useState({
        about: false,
        contact: false,
        payment: false,
        social: false,
    });

    useEffect(() => {
        fetch(`${CONTACT_URL}`)
            .then((response) => response.json())
            .then((result) => {
                if (Array.isArray(result) && result.length > 0) {
                    setData(result[0]);
                } else {
                    console.error('Invalid data format:', result);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const toggleVisibility = (section) => {
        setVisible((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <div className="list">
            <div className="list__info">
                <Title text="Information Store" />
            </div>

            <ToggleSection title="About Store" visible={visible.about} onToggle={() => toggleVisibility('about')}>
                <AboutSection aboutData={data.about} />
            </ToggleSection>

            <ToggleSection title="Contact Store" visible={visible.contact} onToggle={() => toggleVisibility('contact')}>
                <ContactSection storeData={data.store} />
            </ToggleSection>

            <ToggleSection title="Payment Store" visible={visible.payment} onToggle={() => toggleVisibility('payment')}>
                <PaymentSection paymentData={data.payment} />
            </ToggleSection>

            <ToggleSection title="Social Store" visible={visible.social} onToggle={() => toggleVisibility('social')}>
                <SocialSection socialData={data.social} />
            </ToggleSection>
        </div>
    );
};

export default ContactList;
