import { Error, Loading } from '~/common';
import Button from '~/components/Button';
import useFetch from '~/hooks/useFetch';
import { API_BASE_URL } from '~/utils/apiURL';

const AboutSection = () => {
    const { data: about, loading: aboutLoading, error: aboutError } = useFetch(`${API_BASE_URL}/about`);

    if (aboutLoading) return <Loading />;
    if (aboutError) return <Error message={aboutError.message} />;

    return (
        <div className="about-table">
            <div className="table-header fw-7 text-center">
                <div className="header-item p-1">About Name</div>
                <div className="header-item flex flex-center">
                    <Button primary>Add</Button>
                </div>
            </div>
            {about.length > 0 ? (
                about.map((item) => (
                    <div className="table-row" key={item.id}>
                        <div className="table-cell text-center">{item.name || 'No Name'}</div>
                        <div className="table-cell text-center">
                            <Button info>Update</Button>
                            <Button danger>Delete</Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="table-row">
                    <div className="table-cell text-center error" colSpan={2}>
                        No Contact data available
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutSection;
