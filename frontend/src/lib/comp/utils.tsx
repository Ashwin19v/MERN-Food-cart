export const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-500";
    case "Preparing":
      return "bg-blue-500";
    case "Ready":
      return "bg-green-500";
    case "Completed":
      return "bg-gray-500";
    case "Cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};

export const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Preparing: "bg-blue-100 text-blue-800",
  Ready: "bg-green-100 text-green-800",
  Completed: "bg-gray-100 text-gray-800",
  Cancelled: "bg-red-100 text-red-800",
};

export const statusOptions = [
  "pending",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
];
