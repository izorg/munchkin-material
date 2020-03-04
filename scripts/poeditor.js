const axios = require('axios');

const { poeditor: config } = require('../config');

const poeditor = axios.create({
  baseURL: 'https://api.poeditor.com/v2',
  transformRequest: (data = {}) => {
    const params = new URLSearchParams();

    params.append('api_token', config.token);

    Object.entries(data).forEach(([key, value]) => params.append(key, value));

    return params.toString();
  },
});

module.exports = poeditor;
