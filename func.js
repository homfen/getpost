var request = require('request');
var exec = require('child_process').exec;
var fs = require('fs');

function initOptions(url, method, options) {
    if (url.indexOf('http://') < 0) {
        url = 'http://' + url;
    }
    var index = url.indexOf('?');
    if (index > -1) {
        var params = url.slice(index + 1).split('&');
        var form = {};
        var query = [];
        params.forEach(function (param) {
            var keyvalue = param.split('=');
            var key = keyvalue[0];
            var value = keyvalue[1];
            if (/[\u4e00-\u9fa5]/.test(value)) {
                value = encodeURIComponent(value);
            }
            if (method === 'p') {
                form[key] = value;
            }
            else {
                query.push(key + '=' + value);
            }
        });
        if (method === 'p') {
            options.form = form;
        }
        url = url.slice(0, index);
        if (method === 'g') {
            url += '?' + query.join('&');
        }
    }

    options.url = url;
}

function handleRequest(method, options) {
    var handle = request.get;
    if (method === 'p') {
        handle = request.post;
    }
    var type;
    var handler = handle(options, function (err, res, body) {
        if (err) {
            console.log(err);
        }
        else {
            if (type === 'text') {
                if (body[0] === '{' || body[0] === '[') {
                    echo(body, function (body) {
                        consoleJson(body, console.log);
                    });
                }
                else {
                    console.log(body);
                }
            }
        }
    }).on('response', function (res) {
        var headers = res.headers;
        var types = headers['content-type'].split('/');
        type = types[0];
        if (type !== 'text') {
            var suffix = types[1];
            var reg = /\/([^/?]+)(\?\S+)?$/;
            var fileName = options.url.match(reg)[1];
            fileName = fileName || (new Date()).getTime();
            var path = __dirname + '/' + fileName;
            if (path.indexOf(suffix) < 0) {
                path += '.' + suffix;
            }
            handler.pipe(fs.createWriteStream(path));
            console.log('Saved as ' + path);
        }
    });
}

function echo(str, fail) {
    exec('echo \'' + str + '\' | json', function (error, stdout, stderr) {
        if ((error || stderr) && fail) {
            fail(str);
        }
        else {
            console.log(stdout);
        }
    });
}

function consoleJson(str, fail) {
    try {
        console.log(JSON.parse(str));
    }
    catch (ex) {
        if (fail) {
            fail(str);
        }
    }
}

function extend(options, data) {
    var keys = Object.keys(data);
    keys.forEach(function (key) {
        var item = data[key];
        if (!options[key]) {
            options[key] = item;
        }
        else {
            var itemKeys = Object.keys(item);
            itemKeys.forEach(function (itemKey) {
                options[key][itemKey] = item[itemKey];
            });
        }
    });
}

module.exports.initOptions = initOptions;
module.exports.handleRequest = handleRequest;
module.exports.extend = extend;
