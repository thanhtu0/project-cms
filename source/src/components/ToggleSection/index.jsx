import { Title } from '~/common';
import './ToggleSection.scss';

const ToggleSection = ({ title, visible, onToggle, children }) => (
    <div className="list">
        <div className="flex flex-between">
            <Title text={title} />
            <button
                type="button"
                className="w-4 h-4 flex flex-center fs-24 btn-primary text-gray-9a"
                onClick={onToggle}
            >
                <ion-icon name={visible ? 'remove-outline' : 'add-outline'}></ion-icon>
            </button>
        </div>
        {visible && <div className="p-2">{children}</div>}
    </div>
);

export default ToggleSection;
