import React, { useState } from "react";
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
  const [perPageValue, setPerPageValue] = useState(perPage);
  const [typingTimeout, setTypingTimeout] = useState(false);

  const onChangeSetPerPageValue = (value) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setPerPageValue(value);
    const delay = setTimeout(() => {
      setPerPage(value);
    }, 500);

    setTypingTimeout(delay);
  };
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
            defaultValue={perPageValue}
            onChange={(e) => {
              if (isNaN(e.target.value)) {
                window.alert("Please enter valid number");
                onChangeSetPerPageValue(DEFAULT_PER_PAGE);
                return;
              }
              if (e.target.value > 10)
                return window.alert("Enter number below or equal to 10");
              if (!e?.target?.value)
                return onChangeSetPerPageValue(DEFAULT_PER_PAGE);
              onChangeSetPerPageValue(e?.target?.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
