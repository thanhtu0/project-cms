const ListTitle = ({ totalItems, currentPage, totalPages }) => {
    return (
        <div className="list__title my-2">
            <p className="lh-3 fs-16 text-gray-9a ml-2">
                There are {totalItems} items. Currently on page {currentPage} of {totalPages} total pages.
            </p>
        </div>
    );
};

export default ListTitle;
