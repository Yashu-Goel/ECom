export const formatDate = (date) => {
  const orderDate = new Date(date);

  const formattedDate = orderDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formattedDate;
};