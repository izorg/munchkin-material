import { promises as fs } from 'fs';

import poeditor from '../poeditor.mjs';

const projectId = process.env.POEDITOR_PROJECT_ID;

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
          order: 'terms',
          type: 'key_value_json',
        })
        .then(({ data }) => data.result.url);

      const content = await poeditor.get(url).then(({ data }) => data);

      await writeTranslation(language.toLowerCase(), content);
    }),
  );
})();
