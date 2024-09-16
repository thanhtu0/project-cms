import Button from '~/components/Button';

const ListTable = ({ headers, data, onEdit, onDelete, renderRow }) => {
    return (
        <div className="list__table">
            <table className="ml-2">
                <thead className="bg-black-1 text-white">
                    <tr>
                        {headers.map((header, index) => (
                            <td className="text-center fw-7" key={index}>
                                {header}
                            </td>
                        ))}
                        <td className="text-center fw-7">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr className="text-black-1" key={item.id}>
                            {renderRow(item)}
                            <td style={{ width: '10px', whiteSpace: 'nowrap' }}>
                                <Button to={onEdit(item)} edit>
                                    <ion-icon name="create-outline"></ion-icon>
                                </Button>
                                <Button onClick={() => onDelete(item)} del>
                                    <ion-icon name="trash-outline"></ion-icon>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTable;
