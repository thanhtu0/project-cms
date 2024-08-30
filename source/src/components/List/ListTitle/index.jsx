const ListTitle = ({ totalItems, currentPage, totalPages }) => {
    return (
        <div className="list__title">
            <p>
                There are {totalItems} items. Currently on page {currentPage} of {totalPages} total pages.
            </p>
        </div>
    );
};

export default ListTitle;
