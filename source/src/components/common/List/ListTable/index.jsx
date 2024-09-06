import React from 'react';
import { Link } from 'react-router-dom';

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
                                <Link className="btn btn-primary btn-icon" to={onEdit(item)}>
                                    <ion-icon name="create-outline"></ion-icon>
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-icon"
                                    onClick={() => onDelete(item)}
                                >
                                    <ion-icon name="trash-outline"></ion-icon>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTable;
