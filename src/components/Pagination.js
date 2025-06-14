import React from "react";
import "../styles/pagination.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="pagination">
      <button className="pageBut" disabled={page === 1} onClick={() => setPage(page - 1)}>
        <NavigateBeforeIcon className="travIcon" fontSize="large" />
      </button>
      <span>{`${page} of ${totalPages}`}</span>
      <button className="pageBut" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        <NavigateNextIcon className="travIcon" fontSize="large" />
      </button>
    </div>
  );
};

export default Pagination;
