const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="list__pagination flex flex-center mt-2 fs-14">
            <button
                className="bg-primary text-white px-2 py-1"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>
            <span className="fz-14 text-gray-9a">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="bg-primary text-white px-2 py-1 fs-14"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
