const { MAX_ITEMS_PER_PAGE } = require('../common/constants');

exports.getViewParamsFromQuery = function getViewParamsFromQuery(query) {
  const {
    search = '',
    filters = [],
    page = 0,
    count = 50,
  } = query;

  return {
    search: search.toLowerCase(),
    filters: filters.filter((f) => f.length > 0),
    page: parseInt(page, 10) || 0,
    count: Math.min(parseInt(count, 10) || 10, MAX_ITEMS_PER_PAGE),
  }
};
