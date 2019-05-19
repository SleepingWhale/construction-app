const fs = require('fs');
const companies = JSON.parse(fs.readFileSync('db/companies.json', {encoding: 'utf8'}));
const { getRandomInt } = require('../common/utils');


module.exports = {
  getCompanies({ search, filters, page, count }) {
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

    const response =  {
      hits: result.length,
      count,
      page,
      pages: Math.ceil(result.length / count),
      search,
      filters,
      data: result.slice(startIndex, endIndex),
    };

    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(response);
      }, getRandomInt(100, 400));
    })
  }
};
