import React from "react";
import { DEFAULT_PER_PAGE } from "./constants";
import ReactPaginate from "react-paginate";

const Pagination = ({
  totalCount = 0,
  currentOffset = 0,
  perPage = DEFAULT_PER_PAGE,
  setPerPage,
  setCurrentPage,
  ...props
}) => {
  return (
    <div className="pagination">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        pageRangeDisplayed={0}
        onPageChange={(e) => setCurrentPage(e?.selected)}
        pageCount={Math.ceil(totalCount / perPage)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />

      {!!totalCount && (
        <div className="custom-page">
          <div>Per Page:</div>
          <input
            className="per-page-input"
            defaultValue={perPage}
            onChange={(e) => {
              if (isNaN(e.target.value)) {
                window.alert("Please enter valid number");
                setPerPage(DEFAULT_PER_PAGE);
                return;
              }
              if (!e?.target?.value) return setPerPage(DEFAULT_PER_PAGE);
              setPerPage(e?.target?.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
