export default function PriorityBadge({ priority }) {
  const styles = {
    LOW: "bg-green-100 text-green-700",
    MEDIUM: "bg-blue-100 text-blue-700",
    HIGH: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${styles[priority] || "bg-gray-100 text-gray-700"}`}>
      {priority}
    </span>
  );
}
