import { useState } from "react";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    const maxPages = 4;
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav
      aria-label="Page navigation"
      className="mt-[120px] flex items-center justify-center"
    >
      <ul className="flex gap-x-[12px] items-center">
        <li>
          <a
            href="#"
            className="flex items-center justify-center font-mont text-[16px] font-bold"
            onClick={() => handlePrevClick()}
          >
            Prev
          </a>
        </li>
        {[1, 2].map((pageNumber) => (
          <li key={pageNumber}>
            <a
              href="#"
              className={`flex items-center justify-center px-[12px] rounded-[4px] py-[4px] font-mont text-[16px] font-bold ${
                currentPage === pageNumber ? "bg-[#2BD17E]" : "bg-[#092C39]"
              }`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            className="flex items-center justify-center font-mont text-[16px] font-bold"
            onClick={() => handleNextClick()}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
