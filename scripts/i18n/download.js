/* eslint-disable no-console */
const fs = require('fs-extra');

const api = require('../smartcat');

const downloadTranslation = async (document) => {
  const task = await api.exportDocument(document);
  const translation = await api.getTranslation(task.id);

  await fs.ensureDir('./languages');
  await fs.writeFile(
    `./languages/${document.targetLanguage}.json`,
    JSON.stringify(translation, null, '  '),
  );

  console.log(`✅ ${document.targetLanguage.toUpperCase()}`);
};

(async () => {
  console.log('Downloading locales:');

  const documents = await api.getDocuments();

  documents.forEach(downloadTranslation);
})();
