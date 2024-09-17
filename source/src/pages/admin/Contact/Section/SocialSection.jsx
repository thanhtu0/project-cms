import Button from '~/components/Button';

const SocialSection = ({ socialData }) => (
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
            {socialData.map((item) => (
                <tr key={item.id}>
                    <td className="text-center">{item.name}</td>
                    <td className="text-left">
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                            {item.href}
                        </a>
                    </td>
                    <td className="text-center">
                        <Button info>Update</Button>
                        <Button danger>Delete</Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default SocialSection;
