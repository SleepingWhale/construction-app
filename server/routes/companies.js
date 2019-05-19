const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator/check');
const { getViewParamsFromQuery } = require('./helpers');
const { getCompanies } = require('../db/dbConnector');
const { FILTERS_STUB } = require('../common/constants');

const companiesQueryValidators = [
  query('search').optional().isString(),
  query('filters').optional().isArray(),
  query('count').optional().isNumeric(),
  query('page').optional().isNumeric(),
];



router.get('/', companiesQueryValidators, async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const viewParams = getViewParamsFromQuery(req.query);
  const companies = await getCompanies(viewParams);
  res.json(companies);
});

router.get('/filters', function(req, res) {
  res.json(FILTERS_STUB);
});

module.exports = router;
