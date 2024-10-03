import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Error, Loading } from '~/common';
import Button from '~/components/Button';
import { formatPhoneNumber } from '~/helpers/formatHelpers';
import useFetch from '~/hooks/useFetch';
import { CONTACT_URL } from '~/utils/apiURL';

const ContactSection = () => {
    const { data: contact, loading: contactLoading, error: contactError, refetch } = useFetch(`${CONTACT_URL}`);
    const [formData, setFormData] = useState({
        companyName: '',
        telephone: '',
        email: '',
        address: '',
    });

    useEffect(() => {
        if (contact && contact.length > 0) {
            setFormData(contact[0]);
        }
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${CONTACT_URL}/${formData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update contact');
            }

            toast.success('Contact updated successfully');
            refetch();
        } catch (error) {
            toast.error(error);
        }
    };

    if (contactLoading) return <Loading />;
    if (contactError) return <Error message={contactError.message} />;

    return (
        <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
                <div className="col-25">
                    <label>Company Name:</label>
                </div>
                <div className="col-75">
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label>Telephone:</label>
                </div>
                <div className="col-75">
                    <input
                        type="text"
                        name="telephone"
                        value={formatPhoneNumber(formData.telephone)}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label>Email:</label>
                </div>
                <div className="col-75">
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label>Address:</label>
                </div>
                <div className="col-75">
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
            </div>
            <div className="btn-actions text-end mt-2">
                <Button info onClick={handleUpdate}>
                    Update
                </Button>
            </div>
        </form>
    );
};

export default ContactSection;
