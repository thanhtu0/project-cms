import React from 'react';
import { Link } from 'react-router-dom';

const ListTable = ({ headers, data, onEdit, onDelete, renderRow }) => {
    return (
        <div className="list__table">
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <td key={index}>{header}</td>
                        ))}
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
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
