const formatDate = (dateString) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  date.setHours(24, 0, 0, 0);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  return formattedDate;
};

export default formatDate;
