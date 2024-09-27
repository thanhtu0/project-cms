import { useState } from 'react';
import { toast } from 'react-toastify';
import { Error, Loading } from '~/common';
import About from '~/common/Modal/About';
import Button from '~/components/Button';
import useFetch from '~/hooks/useFetch';
import { ABOUT_URL } from '~/utils/apiURL';

const AboutSection = () => {
    const { data: about, loading: aboutLoading, error: aboutError, refetch } = useFetch(`${ABOUT_URL}`);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAbout, setCurrentAbout] = useState(null);

    const handleAddOrEdit = async (about) => {
        const method = currentAbout ? 'PATCH' : 'POST';
        const url = currentAbout ? `${ABOUT_URL}/${currentAbout.id}` : `${ABOUT_URL}`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(about),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to add or edit the about item');
            }

            setIsModalOpen(false);
            setCurrentAbout(null);
            refetch();

            toast.success(currentAbout ? 'Update successfully!' : 'Create successfully!');
        } catch (error) {
            toast.error('There was an issue adding or updating the about item. Please try again.');
        }
    };

    const handleEdit = (item) => {
        setCurrentAbout(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${ABOUT_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the about item');
            }

            refetch();
            toast.success('Deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete the item. Please try again.');
        }
    };

    if (aboutLoading) return <Loading />;
    if (aboutError) return <Error message={aboutError.message} />;

    return (
        <div className="about-table">
            <div className="table-header fw-7 text-center">
                <div className="header-item p-1">About Name</div>
                <div className="header-item flex flex-center">
                    <Button
                        primary
                        onClick={() => {
                            setCurrentAbout(null);
                            setIsModalOpen(true);
                        }}
                    >
                        Add About
                    </Button>
                </div>
            </div>
            {about.length > 0 ? (
                about.map((item) => (
                    <div className="table-row" key={item.id}>
                        <div className="table-cell text-center">{item.name || 'No Name'}</div>
                        <div className="table-cell text-center">
                            <Button info onClick={() => handleEdit(item)}>
                                Update
                            </Button>
                            <Button danger onClick={() => handleDelete(item.id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="table-row">
                    <div className="table-cell text-center error" colSpan={2}>
                        No About data available
                    </div>
                </div>
            )}
            <About
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setCurrentAbout(null);
                }}
                onSubmit={handleAddOrEdit}
                initialData={currentAbout}
            />
        </div>
    );
};

export default AboutSection;
