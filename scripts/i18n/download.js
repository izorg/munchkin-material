const fs = require('fs').promises;

const {
  poeditor: { projectId },
} = require('../../config'); // eslint-disable-line import/no-unresolved
const poeditor = require('../poeditor');

const writeTranslation = async (code, data) => {
  try {
    await fs.mkdir('./languages');
  } catch (e) {
    // dir exists
  }

  await fs.writeFile(
    `./languages/${code}.json`,
    JSON.stringify(data, null, '  '),
  );

  console.log(`✅ ${code.toUpperCase()}`);
};

(async () => {
  console.log('Downloading locales:');

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
