/* eslint-disable no-console,import/no-extraneous-dependencies */
const axios = require('axios');
const exec = require('child_process').exec;

const config = require('../config.json').smartcat;

const projectId = config.projectId;
const documentId = config.documentId;

axios.defaults.baseURL = 'https://smartcat.ai/api/integration/v1';
axios.defaults.auth = {
  username: config.accountId,
  password: config.key,
};

function exportDocument(document) {
  return axios.post('/document/export', undefined, {
    params: {
      documentIds: [document.id],
    },
  }).then(({ data }) => data);
}

const deleteDocuments = documentIds => axios.delete('/document', { params: { documentIds } });

const getDocuments = () => axios.get(`/project/${projectId}`).then(({ data: { documents } }) => documents);

function getTaskResult(taskId, language, resolve) {
  console.log('getTaskResult');
  axios.get(`/document/export/${taskId}`).then(({ data, status }) => {
    console.log('status', status);
    if (status === 200 && data) {
      resolve(data);
    } else if (status === 204) {
      setTimeout(() => {
        getTaskResult(taskId, language, resolve);
      }, 1000);
    }
  });
}

function getTranslation(taskId, language) {
  return new Promise((resolve) => {
    getTaskResult(taskId, language, resolve);
  });
}

const updateDocument = (filePath) => {
  exec(
    `curl -X PUT --user ${config.accountId}:${config.key} -F "file=@${filePath}" ${axios.defaults.baseURL}/document/update?documentId=${documentId}`,
    (error, stdout) => {
      if (error) {
        console.log('error', error);
      } else {
        console.log(stdout);
      }
    });
};

module.exports = {
  deleteDocuments,
  exportDocument,
  getDocuments,
  getTranslation,
  updateDocument,
};
