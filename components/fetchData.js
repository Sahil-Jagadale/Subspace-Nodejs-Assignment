const axios = require('axios');

async function fetchDataFromThirdParty() {
    const url = process.env.API_URL;
    const headers = {
        [process.env.H_KEY] : process.env.H_VALUE,
    };

    try {
        const response = await axios.get(url, { headers });
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = fetchDataFromThirdParty;
