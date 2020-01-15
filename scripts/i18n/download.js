const fs = require('fs-extra');

// const api = require('../smartcat');
const poeditor = require('../poeditor');

const {
  poeditor: { projectId },
} = require('../../config'); // eslint-disable-line import/no-unresolved

const writeTranslation = async (code, data) => {
  await fs.ensureDir('./languages');
  await fs.writeFile(
    `./languages/${code}.json`,
    JSON.stringify(data, null, '  '),
  );

  console.log(`✅ ${code.toUpperCase()}`);
};

// const downloadTranslation = async (document) => {
//   const task = await api.exportDocument(document);
//   const translation = await api.getTranslation(task.id);
//
//   await writeTranslation(document.targetLanguage, translation);
// };

(async () => {
  console.log('Downloading locales:');

  // const documents = await api.getDocuments();

  // documents.forEach(downloadTranslation);

  const response = await poeditor.post('/languages/list', {
    id: projectId,
  });

  const languages = response.data.result.languages
    .map(({ code }) => code)
    .filter((code) => code !== 'en');

  await Promise.all(
    languages.map(async (language) => {
      const url = await poeditor
        .post('/projects/export', {
          id: projectId,
          language,
          type: 'key_value_json',
          order: 'terms',
        })
        .then(({ data }) => data.result.url);

      const content = await poeditor.get(url).then(({ data }) => data);

      await writeTranslation(language.toLowerCase(), content);
    }),
  );
})();
