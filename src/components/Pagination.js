import React from "react";
import "../styles/pagination.css";

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="pagination">
      //Button to go on Previous page by decrementing page no.
      <button className="pageBut" disabled={page === 1} onClick={() => setPage(page - 1)}>
        <img className="prevImg" src="https://cdn-icons-png.flaticon.com/128/4421/4421669.png" alt="Previous" />
      </button>
      <span>{`${page} of ${totalPages}`}</span>
      //Button to go on next page by increamenting page no.
      <button className="pageBut" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        <img className="nextImg" src="https://cdn-icons-png.flaticon.com/128/6276/6276701.png" alt="Next" />
      </button>
    </div>
  );
};

export default Pagination;
