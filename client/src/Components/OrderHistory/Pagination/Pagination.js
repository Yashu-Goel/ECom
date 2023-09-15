import "./Pagination.css";

const Pagination = ({
  TotalOrder,
  OrderPerPage,
  handlePageChange,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(TotalOrder / OrderPerPage); ++i) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
      {pages?.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "activeClass" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
