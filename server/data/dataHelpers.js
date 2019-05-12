const fs = require('fs');
const companies = JSON.parse(fs.readFileSync('data/companies.json', {encoding: 'utf8'}));


exports.getCompanies = function getCompanies({ search, filters, page, count }) {
  const shouldSearch = search.length > 0;
  const shouldFilter = filters.length > 0;
  let result = companies;
  const startIndex = page * count;
  const endIndex = startIndex + count;

  if (shouldFilter || shouldSearch) {
    result = companies.filter((c) => {
      const isFound = shouldSearch
        ? c.companyName.toLowerCase().includes(search)
        : true;

      if (shouldSearch && !isFound) return false;

      return shouldFilter
        ? filters.every((f) => c.specialty.includes(f))
        : true;
    });
  }

  return {
    hits: result.length,
    count,
    page,
    pages: Math.ceil(result.length / count),
    search,
    filters,
    companies: result.slice(startIndex, endIndex),
  };
};
