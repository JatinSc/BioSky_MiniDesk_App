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

  return (
    <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-3">
      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 text-sm w-full md:w-64"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-3 py-2 text-sm"
      >
        <option value="">All Status</option>
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="RESOLVED">Resolved</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border rounded px-3 py-2 text-sm"
      >
        <option value="">All Priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded px-3 py-2 text-sm"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      <button
        onClick={resetFilters}
        className="text-sm text-gray-600 underline"
      >
        Reset
      </button>
    </div>
  );
}
