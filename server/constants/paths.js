const serverBasePath = require('path')
        .dirname(require.main.filename) + '/';

module.exports = {
    appPath: serverBasePath,
    publicPath: serverBasePath + 'public/',
    storagePath: serverBasePath + 'storage/'
};