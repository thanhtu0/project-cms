import Button from '../../components/Button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="list__pagination flex flex-center mt-2 mb-2 fs-14">
            <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </Button>
            <span className="fz-14 text-gray-9a">
                Page {currentPage} of {totalPages}
            </span>
            <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </Button>
        </div>
    );
};

export default Pagination;
