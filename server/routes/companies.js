const express = require('express');
const router = express.Router();
const { getViewParamsFromQuery } = require('./helpers');
const { getCompanies } = require('../data/dataHelpers');
const FILTERS_STUB = ["Excavation", "Plumbing", "Electrical"];


router.get('/', function(req, res) {
  const viewParams = getViewParamsFromQuery(req.query);
  const companies = getCompanies(viewParams);
  res.json(companies);
});

router.get('/filters', function(req, res) {
  res.json(FILTERS_STUB);
});

module.exports = router;
