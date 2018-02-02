/* eslint-disable no-console */
const fs = require('fs');

const api = require('../smartcat');

api.getDocuments().then((documents) => {
  documents.forEach((document) => {
    api.exportDocument(document).then((task) => {
      api
        .getTranslation(task.id, document.targetLanguage)
        .then((translation) => {
          console.log('translation', translation);
          fs.writeFileSync(
            `./languages/${document.targetLanguage}.json`,
            JSON.stringify(translation, null, '  '),
          );
        });
    });
  });
});
