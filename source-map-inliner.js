var convert = require('convert-source-map');
var combine = require('combine-source-map');
var glob = require('glob');
var fs = require('fs');
var path = require('path');

glob('build/**/*.map', function (err, files) {

  files.forEach(function(mapFilePath) {

    if (mapFilePath.indexOf('index.js.map') !== -1) {
      return;
    }

    var sourceMap = convert.fromJSON(fs.readFileSync(mapFilePath, {encoding: 'utf8'}));
    var translatedJsPath = mapFilePath.replace('.map', '');
    var originalSrcPath = path.resolve(mapFilePath, '../' + sourceMap.getProperty('sources')[0]);

    sourceMap
      .setProperty('file', originalSrcPath)
      .setProperty('sourcesContent', [fs.readFileSync(originalSrcPath, {encoding: 'utf8'})]);

    var base64Map = '//# sourceMappingURL=data:application/json;base64,' + sourceMap.toBase64();
    var content = fs.readFileSync(mapFilePath.replace('.map', ''), {encoding: 'utf8'});

    fs.writeFileSync(translatedJsPath, content.replace(/\/\/# sourceMappingURL.*$/, base64Map));
  });
});
