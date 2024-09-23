import { useState, useEffect } from 'react';
import { Title } from '~/common';
import { API_BASE_URL, CONTACT_URL } from '~/utils/apiURL';
import ToggleSection from '~/components/ToggleSection';
import { AboutSection, ContactSection, PaymentSection, SocialSection } from './Section';
import { toggleVisibility } from '~/utils/helpers';
import { toast } from 'react-toastify';

const ContactList = () => {
    const [data, setData] = useState({
        about: [],
        store: {},
        payment: [],
        social: [],
    });

    const [visible, setVisible] = useState({
        about: false,
        contact: true,
        payment: false,
        social: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${CONTACT_URL}`);
                const result = await response.json();

                if (Array.isArray(result) && result.length > 0) {
                    const contactData = result[0];

                    const [aboutData, paymentData, socialData] = await Promise.all([
                        fetch(`${API_BASE_URL}/about`).then((res) => res.json()),
                        fetch(`${API_BASE_URL}/payment`).then((res) => res.json()),
                        fetch(`${API_BASE_URL}/social`).then((res) => res.json()),
                    ]);

                    const aboutFromContact = contactData.aboutId.map(
                        (id) => aboutData.find((item) => item.id === id) || { id, name: 'No Name' },
                    );

                    const paymentFromContact = contactData.paymentId.map(
                        (id) => paymentData.find((item) => item.id === id) || { id, name: 'No Name' },
                    );

                    const socialFromContact = contactData.socialId.map(
                        (id) => socialData.find((item) => item.id === id) || { id, name: 'No Name', href: '' },
                    );

                    setData({
                        about: aboutFromContact,
                        store: contactData.store,
                        payment: paymentFromContact,
                        social: socialFromContact,
                    });
                } else {
                    toast.error('Invalid data format:', result);
                }
            } catch (error) {
                toast.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleToggleVisibility = (section) => {
        setVisible((prevState) => toggleVisibility(prevState, section));
    };

    return (
        <div className="list">
            <div className="list__info">
                <Title text="Information Store" />
            </div>

            <ToggleSection title="About Store" visible={visible.about} onToggle={() => handleToggleVisibility('about')}>
                <AboutSection aboutData={data.about} />
            </ToggleSection>

            <ToggleSection
                title="Contact Store"
                visible={visible.contact}
                onToggle={() => handleToggleVisibility('contact')}
            >
                <ContactSection storeData={data.store} />
            </ToggleSection>

            <ToggleSection
                title="Payment Store"
                visible={visible.payment}
                onToggle={() => handleToggleVisibility('payment')}
            >
                <PaymentSection paymentData={data.payment} />
            </ToggleSection>

            <ToggleSection
                title="Social Store"
                visible={visible.social}
                onToggle={() => handleToggleVisibility('social')}
            >
                <SocialSection socialData={data.social} />
            </ToggleSection>
        </div>
    );
};

export default ContactList;
