const express = require("express");
const router = express.Router();

const serachData = require("../components/searchdata");

router.get("/blog-search", serachData);

module.exports = router;
