import Button from '~/components/Button';

const AboutSection = ({ aboutData }) => {
    return (
        <div className="about-table">
            <div className="table-header fw-7 text-center">
                <div className="header-item p-1">About Name</div>
                <div className="header-item flex flex-center">
                    <Button primary>Add</Button>
                </div>
            </div>
            {aboutData.map((item) => (
                <div className="table-row" key={item.id}>
                    <div className="table-cell text-center">{item.name}</div>
                    <div className="table-cell text-center">
                        <Button info>Update</Button>
                        <Button danger>Delete</Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AboutSection;
