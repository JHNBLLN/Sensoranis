import React, { useContext } from "react";
import "./css/Pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { PaginationContext } from "../context/contexts";

const Pagination = () => {
  const {
    totalItem,
    itemPerPage,
    setCurrentPage,
    productDisplay,
    currentPage,
  } = useContext(PaginationContext);
  const totalPages = Math.ceil(totalItem / itemPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
    setCurrentPage(page);
    window.scrollTo({
      top: productDisplay.current.offsetTop - 120,
      behavior: "smooth",
    });
  };

  const renderPages = () => {
    const pages = [];
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
      console.log(totalPages);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === "number" && handleClick(page)}
        className={`page-button ${currentPage === page ? "active" : ""} ${
          typeof page !== "number" ? "disabled" : ""
        }`}
        disabled={typeof page !== "number"}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => currentPage > 1 && handleClick(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`prev-button ${currentPage <= 1 ? "disabled" : ""}`}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {renderPages()}

      <button
        onClick={() => currentPage < totalPages && handleClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`next-button ${currentPage >= totalPages ? "disabled" : ""}`}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
