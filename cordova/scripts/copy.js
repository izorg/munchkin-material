const fs = require('fs-extra');

fs.copySync('node_modules/munchkin-web/dist/fonts', 'www/fonts');
fs.copySync('node_modules/munchkin-web/dist/js', 'www/js');
