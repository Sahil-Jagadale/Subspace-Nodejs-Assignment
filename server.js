require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const displayData = require("./routes/displaydataroute");
const searchData = require("./routes/searchdataroute");

app.use(express.json());

app.use('/api', displayData);
app.use('/api', searchData);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
