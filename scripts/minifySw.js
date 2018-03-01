const fs = require('fs');
const path = require('path');

const UglifyJS = require('uglify-js');

const serviceWorkerPath = path.resolve('./site/sw.js'); // path to your outputted serviceworker

const { code: minifiedServiceworker } = UglifyJS.minify(
  fs.readFileSync(serviceWorkerPath, 'utf8'),
  {
    // options taken from https://github.com/NekR/offline-plugin/blob/master/src/service-worker.js#L71
    compress: {
      warnings: false,
      dead_code: true,
      drop_console: true,
      unused: true,
    },

    output: {
      comments: false,
    },
  },
);

fs.writeFileSync(serviceWorkerPath, minifiedServiceworker);
