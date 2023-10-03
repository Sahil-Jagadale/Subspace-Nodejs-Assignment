const _ = require('lodash');
const fetchDataFromThirdParty = require("./fetchData");

function searchResults(data, query) {
    return data.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
}

const searchResultsMemoized = _.memoize(searchResults, (data, query) => JSON.stringify(data) + query, 300000);

const serachData = async (req, res) => {
    try {
        const data = await fetchDataFromThirdParty();
        const query = req.query.query;

        if (!data || !data.blogs || !Array.isArray(data.blogs)) {
            res.status(500).json({ error: "Invalid data format" });
            return;
        }

        const filteredBlogs = searchResultsMemoized(data.blogs, query);

        res.json({ blogs: filteredBlogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = serachData;