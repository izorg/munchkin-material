const fs = require('fs');

const api = require('../smartcat');

api.getDocuments().then(function (documents) {
  documents.forEach(function (document) {
    api.exportDocument(document).then(function (task) {
      api.getTranslation(task.id, document.targetLanguage).then(function (translation) {
        console.log('translation', translation);
        fs.writeFileSync(
          `./languages/${document.targetLanguage}.json`,
          JSON.stringify(translation, null, '  ')
        );
      });
    });
  });
});
