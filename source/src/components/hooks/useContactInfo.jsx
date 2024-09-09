import { useState, useEffect } from 'react';
import { faLocationDot, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

const useContactInfo = (contactData) => {
    const [infoItems, setInfoItems] = useState([]);
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        if (contactData) {
            if (Array.isArray(contactData) && contactData.length > 0) {
                const contact = contactData[0];
                setCompanyName(contact.companyName || '');
                setInfoItems([
                    {
                        icon: faPhoneVolume,
                        text: contact.telephone || 'N/A',
                        className: 'phone',
                    },
                    {
                        icon: faLocationDot,
                        text: contact.address || 'N/A',
                        className: 'address',
                    },
                ]);
            } else {
                console.error('Contact data is missing or empty:', contactData);
            }
        }
    }, [contactData]);

    return { companyName, infoItems };
};

export default useContactInfo;
