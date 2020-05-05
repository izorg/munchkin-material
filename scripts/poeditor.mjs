import axios from 'axios';

const poeditor = axios.create({
  baseURL: 'https://api.poeditor.com/v2',
  transformRequest: (data = {}) => {
    const params = new URLSearchParams();

    params.append('api_token', process.env.POEDITOR_TOKEN);

    Object.entries(data).forEach(([key, value]) => params.append(key, value));

    return params.toString();
  },
});

export default poeditor;
