import { Error, Loading } from '~/common';
import Button from '~/components/Button';
import useFetch from '~/hooks/useFetch';
import { API_BASE_URL } from '~/utils/apiURL';

const SocialSection = () => {
    const { data: social, loading: socialLoading, error: socialError } = useFetch(`${API_BASE_URL}/social`);

    if (socialLoading) return <Loading />;
    if (socialError) return <Error message={socialError.message} />;
    return (
        <table className="social-table">
            <thead>
                <tr>
                    <th>Social Name</th>
                    <th>Social Link</th>
                    <th>
                        <Button primary>Add</Button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {social.length > 0 ? (
                    social.map((item) => (
                        <tr className="text-center" key={item.id}>
                            <td>{item.name || 'No Name'}</td>
                            <td className="text-justify">
                                <a href={item.href} target="_blank" rel="noopener noreferrer">
                                    {item.href || 'No Links'}
                                </a>
                            </td>
                            <td>
                                <Button info>Update</Button>
                                <Button danger>Delete</Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <div className="table-row">
                        <div className="table-cell text-center error" colSpan={2}>
                            No Social data available
                        </div>
                    </div>
                )}
            </tbody>
        </table>
    );
};

export default SocialSection;
