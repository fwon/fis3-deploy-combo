/**
 * fis3-deploy-combo
 * Copyright 2016, https://github.com/fwon
 * 
 * Combo files after postpackager, which had been process
 * Useful for sprite css to combile.
 */

var _  = fis.util;
var path = require('path');
var fs = require('fs');

function combo(options, modified, total, next) {

    if (!options.combo || Object.keys(options.combo).length < 1) {
        fis.log.error('combo error, no setting files to combo!');
        return;
    }

    //将合并转换为数组
    var comboList = [];
    _.map(options.combo, function(dist, source) {
        var _source = [];
        if (_.is(source, 'String')) {
            _source = [source]
        } else if (_.is(source, 'Array')) {
            _source = source
        } else if (_.is(source, 'RegExp')) {
            _source = _.find(options.dest, source);
        } else {
            fis.log.error('source files must be Array, String or RegExp!')
            return;
        }

        comboList.push({
            dist: dist,
            source: _source
        });
    });

    var _index = 0;

    function _combo(comboList) {
        var distPath = comboList[_index]['dist'],
            source = comboList[_index]['source'],
            content = '',
            distFilePath = path.resolve(options.dest, distPath);

        source.forEach(function(filePath) {
            var sourceFile = path.resolve(options.dest, filePath);
            var _content = '';
            if (!!sourceFile) {
                if (_content = _.read(sourceFile)) {
                    content += _content
                }
                
            }
        });

        _.write(distFilePath, content);    
        
        if (!!comboList[++_index]) _combo(comboList);
        
        next();
    }

    if (!!comboList[_index]) {
        _combo(comboList);
    }

}

module.exports = combo;