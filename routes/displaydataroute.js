const express = require('express');
const router = express.Router();

const displayData = require("../components/displaydata");

router.get('/blog-stats', displayData);

module.exports = router;
