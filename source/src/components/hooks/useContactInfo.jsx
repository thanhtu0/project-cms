import { useState, useEffect } from 'react';
import { faLocationDot, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

const useContactInfo = (contactData) => {
    const [infoItems, setInfoItems] = useState([]);
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        if (contactData && Array.isArray(contactData) && contactData.length > 0) {
            const store = contactData[0]?.store;
            if (store) {
                setCompanyName(store.companyName || '');
                setInfoItems([
                    {
                        icon: faPhoneVolume,
                        text: store.telephone || 'N/A',
                        className: 'phone',
                    },
                    {
                        icon: faLocationDot,
                        text: store.address || 'N/A',
                        className: 'address',
                    },
                ]);
            }
        }
    }, [contactData]);

    return { companyName, infoItems };
};

export default useContactInfo;
