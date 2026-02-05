import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange, hasNextPage, hasPrevPage }) {
  // If totalPages is provided, we can determine hasNextPage and hasPrevPage automatically
  const prevDisabled = hasPrevPage !== undefined ? !hasPrevPage : currentPage <= 1;
  const nextDisabled = hasNextPage !== undefined ? !hasNextPage : currentPage >= totalPages;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={prevDisabled}
        className="px-3 py-1 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      
      <span className="text-sm text-gray-600 px-2">
        Page {currentPage} {totalPages ? `of ${totalPages}` : ''}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={nextDisabled}
        className="px-3 py-1 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}
