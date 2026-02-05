import { useState } from "react";
import useTicketFiltersStore from "../../../store/ticketFilters.store";

export default function TicketFilters() {
  const {
    search,
    status,
    priority,
    sort,
    setSearch,
    setStatus,
    setPriority,
    setSort,
    resetFilters,
  } = useTicketFiltersStore();

  const [showFilters, setShowFilters] = useState(false);


  return (
    <div className="space-y-4">
      <div
       className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm animate-in fade-in slide-in-from-top-2"
      //  className="flex flex-col md:flex-row justify-between items-center gap-4"
       >

        {/* Search & Filter Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search tickets"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              showFilters
                ? "bg-gray-100 border-gray-300 text-gray-900"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Filter</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button> */}

           <div className="flex flex-wrap gap-4">
            <div className="space-y-1">
              {/* <label className="text-xs font-medium text-gray-500 uppercase">
                Status
              </label> */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block w-40 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            <div className="space-y-1">
              {/* <label className="text-xs font-medium text-gray-500 uppercase">
                Priority
              </label> */}
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="block w-40 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div className="space-y-1">
              {/* <label className="text-xs font-medium text-gray-500 uppercase">
                Sort By
              </label> */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="block w-40 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-red-500 border border-gray-200 hover:bg-red-50 hover:border-red-300 rounded-lg transition-colors font-medium"
                // className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
