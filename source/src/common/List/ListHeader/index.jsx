import Title from '../../Title';
import Button from '~/components/Button';

const ListHeader = ({ title, refreshHandler, refreshLabel = 'Refresh', createLink, createLabel = 'Create' }) => {
    return (
        <div className="list__header flex flex-between">
            <Title text={title} />
            <div className="list__btn-group mr-2">
                <Button onClick={refreshHandler} success>
                    {refreshLabel}
                </Button>
                <Button to={createLink} primary>
                    {createLabel}
                </Button>
            </div>
        </div>
    );
};

export default ListHeader;
