export default function StatusBadge({ status }) {
  const styles = {
    OPEN: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    RESOLVED: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 text-sm rounded ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
