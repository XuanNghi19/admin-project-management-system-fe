import React, { JSX } from "react";

interface PaginationProps {
  pageNo: number;
  totalPages: number;
  setPageNo: (page: number) => void;
  dataTableLength: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNo,
  totalPages,
  setPageNo,
  dataTableLength,
  totalItems,
}) => {
  const renderPageNumbers = (): JSX.Element[] => {
    const pageNumbers: JSX.Element[] = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(0, pageNo - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            className={`px-3 py-1 rounded-md text-md border ${
              pageNo === i
                ? "bg-blue-900 text-white border-blue-950"
                : "bg-white hover:bg-blue-100 border-gray-300"
            }`}
            onClick={() => setPageNo(i)}
          >
            {i + 1}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
      <p className="text-md text-gray-700">
        Hiển thị <span className="font-semibold">{dataTableLength}</span> /
        <span className="font-semibold"> {totalItems}</span> bản ghi
      </p>

      <ul className="flex items-center space-x-1">
        {/* Trước */}
        <li>
          <button
            className={`px-3 py-1 rounded-md text-sm border ${
              pageNo === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white hover:text-white hover:bg-blue-950 border-gray-300"
            }`}
            onClick={() => pageNo > 0 && setPageNo(pageNo - 1)}
            disabled={pageNo === 0}
          >
            Trước
          </button>
        </li>

        {/* Các trang */}
        {renderPageNumbers()}

        {/* Sau */}
        <li>
          <button
            className={`px-3 py-1 rounded-md text-md border ${
              pageNo === totalPages - 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white hover:text-white hover:bg-blue-950 border-gray-300"
            }`}
            onClick={() => pageNo < totalPages - 1 && setPageNo(pageNo + 1)}
            disabled={pageNo === totalPages - 1}
          >
            Sau
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
