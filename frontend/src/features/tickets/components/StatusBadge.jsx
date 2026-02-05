export default function StatusBadge({ status }) {
  const colors = {
    OPEN: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    RESOLVED: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${colors[status] || "bg-gray-100 text-gray-700"}`}>
      {status?.replace("_", " ")}
    </span>
  );
}
