import { Error, Loading } from '~/common';
import Button from '~/components/Button';
import useFetch from '~/hooks/useFetch';
import { API_BASE_URL } from '~/utils/apiURL';

const ContactSection = () => {
    const { data: contact, loading: contactLoading, error: contactError } = useFetch(`${API_BASE_URL}/contact`);

    if (contactLoading) return <Loading />;
    if (contactError) return <Error message={contactError.message} />;

    console.log('Contact Store', contact);

    const contactData = contact.length > 0 ? contact[0] : {};

    return (
        <form encType="multipart/form-data">
            <div className="row">
                <div className="col-25">
                    <label>Company Name:</label>
                </div>
                <div className="col-75">
                    <input type="text" name="companyName" defaultValue={contactData.companyName || ''} />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label>Telephone:</label>
                </div>
                <div className="col-75">
                    <input type="text" name="telephone" defaultValue={contactData.telephone || ''} />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label>Email:</label>
                </div>
                <div className="col-75">
                    <input type="text" name="email" defaultValue={contactData.email || ''} />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label>Address:</label>
                </div>
                <div className="col-75">
                    <input type="text" name="address" defaultValue={contactData.address || ''} />
                </div>
            </div>
            <div className="btn-actions text-end mt-2">
                <Button primary>Create</Button>
                <Button info>Update</Button>
                <Button danger>Delete</Button>
            </div>
        </form>
    );
};

export default ContactSection;
