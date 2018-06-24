/* eslint-disable no-console */
const axios = require('axios');
const { exec } = require('child_process');

const config = require('../config.json').smartcat;

const { documentId, projectId } = config;

axios.defaults.baseURL = 'https://smartcat.ai/api/integration/v1';
axios.defaults.auth = {
  username: config.accountId,
  password: config.key,
};

const exportDocument = async (document) => {
  const { data } = await axios.post('/document/export', undefined, {
    params: {
      documentIds: [document.id],
    },
  });

  return data;
};

const deleteDocuments = async (documentIds) =>
  axios.delete('/document', { params: { documentIds } });

const getDocuments = async () => {
  const {
    data: { documents },
  } = await axios.get(`/project/${projectId}`);

  return documents;
};

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function* getTask(taskId) {
  while (true) {
    yield axios.get(`/document/export/${taskId}`);
    yield timeout(1000);
  }
}

const getTranslation = async (taskId) => {
  // eslint-disable-next-line no-restricted-syntax
  for await (const result of getTask(taskId)) {
    if (result) {
      const { data, status } = result;

      if (status === 200 && data) {
        return data;
      }
    }
  }

  return undefined;
};

const updateDocument = (filePath) => {
  exec(
    `curl -X PUT --user ${config.accountId}:${
      config.key
    } -F "file=@${filePath}" ${
      axios.defaults.baseURL
    }/document/update?documentId=${documentId}`,
    (error, stdout) => {
      if (error) {
        console.log('error', error);
      } else {
        console.log(stdout);
      }
    },
  );
};

module.exports = {
  deleteDocuments,
  exportDocument,
  getDocuments,
  getTranslation,
  updateDocument,
};
