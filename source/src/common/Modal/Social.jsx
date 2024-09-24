import { useState, useEffect } from 'react';
import './Modal.scss';
import Button from '~/components/Button';

const Social = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [name, setName] = useState('');
    const [href, setHref] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setHref(initialData.href);
        } else {
            setName('');
            setHref('');
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, href });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay w-100 h-100 flex flex-center position-absolute top-0 left-0 right-0 bottom-0  z-1000">
            <div className="modal-content position-relative bg-white p-2">
                <div className="modal-header flex flex-between">
                    <h2>Update Social</h2>
                    <button className="close-button fs-24" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="modal-body fs-18 text-black-1 fw-4 my-2">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-25">
                                <label>{name}:</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    value={href}
                                    onChange={(e) => setHref(e.target.value)}
                                    placeholder="Social href"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row flex flex-end">
                            <Button primary type="submit">
                                Update
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

export default Social;
