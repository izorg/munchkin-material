const fs = require('fs');
const globSync = require('glob').sync; // eslint-disable-line import/no-extraneous-dependencies
const mkdirpSync = require('mkdirp').sync; // eslint-disable-line import/no-extraneous-dependencies

const MESSAGES_PATTERN = './messages/**/*.json';
const LANG_DIR = './languages/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
const defaultMessages = globSync(MESSAGES_PATTERN)
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      // eslint-disable-next-line no-prototype-builtins
      if (collection.hasOwnProperty(id)) {
        throw new Error(`Duplicate message id: ${id}`);
      }

      // eslint-disable-next-line no-param-reassign
      collection[id] = defaultMessage;
    });

    return collection;
  }, {});

mkdirpSync(LANG_DIR);
fs.writeFileSync(`${LANG_DIR}en.json`, JSON.stringify(defaultMessages, null, 2));
