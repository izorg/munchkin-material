const path = require('path');

const api = require('../smartcat');

const filePath = path.resolve(__dirname, '../../languages/en.json');

api.updateDocument(filePath);
