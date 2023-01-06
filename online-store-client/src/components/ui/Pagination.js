import React from "react";
import { Pagination } from "@mui/material";

const PaginationBar = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Pagination
        defaultPage={1}
        count={pageNumbers.length}
        onChange={(_, page) => paginate(page)}
        page={currentPage}
      />
    </div>
  );
};

export default PaginationBar;
