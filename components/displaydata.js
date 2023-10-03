const _ = require('lodash');
const fetchDataFromThirdParty = require('./fetchData');

const analyzeDataMemoized = _.memoize(analyzeData, (data) => JSON.stringify(data), 600000);

function analyzeData(data) {
    const totalBlogs = data.blogs.length;
    const blogWithLongestTitle = _.maxBy(data.blogs, (blog) => blog.title.length);
    const blogsWithPrivacy = _.filter(data.blogs, (blog) =>
        _.includes(_.toLower(blog.title), 'privacy')
    );
    const uniqueBlogTitles = _.uniqBy(data.blogs, 'title');

    return {
        totalBlogs,
        blogWithLongestTitle: blogWithLongestTitle.title,
        blogsWithPrivacy: blogsWithPrivacy.length,
        uniqueBlogTitles: uniqueBlogTitles.map((blog) => blog.title),
    };
}

const displayData = async (req, res) => {
    try {
        const data = await fetchDataFromThirdParty(); 
        const analyzeResult = analyzeDataMemoized(data);
        res.json(analyzeResult);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = displayData;