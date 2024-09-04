import { Link } from 'react-router-dom';
import Title from '../../Title';

const ListHeader = ({ title, refreshHandler, refreshLabel = 'Refresh', createLink, createLabel = 'Create' }) => {
    return (
        <div className="list__header">
            <Title text={title} />
            <div className="list__btn-group">
                <button type="button" className="btn btn-outline-success" onClick={refreshHandler}>
                    {refreshLabel}
                </button>
                <Link to={createLink} className="btn btn-primary">
                    {createLabel}
                </Link>
            </div>
        </div>
    );
};

export default ListHeader;
