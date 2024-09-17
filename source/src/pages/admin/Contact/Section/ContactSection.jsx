import Button from '~/components/Button';

const ContactSection = ({ storeData }) => (
    <form encType="multipart/form-data">
        <div className="row">
            <div className="col-25">
                <label>Company Name:</label>
            </div>
            <div className="col-75">
                <input type="text" name="companyName" defaultValue={storeData.companyName || ''} />
            </div>
        </div>
        <div className="row">
            <div className="col-25">
                <label>Telephone:</label>
            </div>
            <div className="col-75">
                <input type="text" name="telephone" defaultValue={storeData.telephone || ''} />
            </div>
        </div>
        <div className="row">
            <div className="col-25">
                <label>Email:</label>
            </div>
            <div className="col-75">
                <input type="text" name="email" defaultValue={storeData.email || ''} />
            </div>
        </div>
        <div className="row">
            <div className="col-25">
                <label>Address:</label>
            </div>
            <div className="col-75">
                <input type="text" name="address" defaultValue={storeData.address || ''} />
            </div>
        </div>
        <div className="btn-actions text-end mt-2">
            <Button primary>Create</Button>
            <Button info>Update</Button>
            <Button danger>Delete</Button>
        </div>
    </form>
);

export default ContactSection;
