import { useState, useEffect } from 'react';
import './Modal.scss';
import Button from '~/components/Button';

const About = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
        } else {
            setName('');
        }
    }, [initialData, isOpen]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay w-100 h-100 flex flex-center position-absolute top-0 left-0 right-0 bottom-0  z-1000">
            <div className="modal-content position-relative bg-white p-2">
                <div className="modal-header flex flex-between">
                    <h2>{initialData ? 'Update About' : 'Add About'}</h2>
                    <button className="close-button fs-24" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="modal-body fs-18 text-center text-black-1 fw-4 my-2">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="About Name"
                            required
                        />
                        <div className="modal-btn flex flex-end mt-2">
                            <Button primary type="submit">
                                {initialData ? 'Update' : 'Add'}
                            </Button>
                            <Button secondary onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default About;
