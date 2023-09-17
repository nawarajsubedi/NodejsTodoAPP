function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function getDateTime(date, time) {
  return `${date} ${time}:00`;
}

module.exports = {
  getOffset,
  emptyOrRows,
  getDateTime,
};
