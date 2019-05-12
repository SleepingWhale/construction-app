const express = require('express');
const router = express.Router();
const { getViewParamsFromQuery } = require('./helpers');
const { getCompanies } = require('../data/dataHelpers');


router.get('/', function(req, res) {
  const viewParams = getViewParamsFromQuery(req.query);
  const companies = getCompanies(viewParams);
  res.json(companies);
});

module.exports = router;
