exports.getViewParamsFromQuery = function getViewParamsFromQuery(query) {
  const {
    search = '',
    filters = [],
    page = 0,
    count = 200,
  } = query;

  return {
    search: search.toLowerCase(),
    filters: filters.filter((f) => f.length > 0),
    page: parseInt(page, 10) || 0,
    count: parseInt(count, 10) || 0,
  }
};
