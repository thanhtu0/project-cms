import { useState } from 'react';
import { toast } from 'react-toastify';
import { Error, Loading } from '~/common';
import Social from '~/common/Modal/Social';
import Button from '~/components/Button';
import useFetch from '~/hooks/useFetch';
import { SOCIAL_URL } from '~/utils/apiURL';

const SocialSection = () => {
    const { data: social, loading: socialLoading, error: socialError, refetch } = useFetch(`${SOCIAL_URL}`);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSocial, setCurrentSocial] = useState(null);

    const handleAddOrEdit = async (social) => {
        if (!currentSocial) return;

        try {
            const response = await fetch(`${SOCIAL_URL}/${currentSocial.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(social),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to edit the social item');
            }

            setIsModalOpen(false);
            setCurrentSocial(null);
            refetch();

            toast.success('Update successfully!');
        } catch (error) {
            toast.error('There was an issue updating the social item. Please try again.');
        }
    };

    const handleEdit = (item) => {
        setCurrentSocial(item);
        setIsModalOpen(true);
    };

    if (socialLoading) return <Loading />;
    if (socialError) return <Error message={socialError.message} />;
    return (
        <table className="social-table">
            <thead>
                <tr>
                    <th>Social Name</th>
                    <th>Social Link</th>
                    <th></th>
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
                            <td style={{ width: '25rem' }}>
                                <Button info onClick={() => handleEdit(item)}>
                                    Update
                                </Button>
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
                <Social
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setCurrentSocial(null);
                    }}
                    onSubmit={handleAddOrEdit}
                    initialData={currentSocial}
                />
            </tbody>
        </table>
    );
};

export default SocialSection;
