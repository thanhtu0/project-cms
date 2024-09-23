import Button from '~/components/Button';

const SocialSection = ({ socialData }) => {
    console.log('Social Data:', socialData);
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
                {socialData.length > 0 ? (
                    socialData.map((item) => (
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
