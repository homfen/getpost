var request = require('request');
var exec = require('child_process').exec;

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
    handle(options, function (err, res, body) {
        if (err) {
            console.log(err);
        }
        else {
            if (body[0] === '{' || body[0] === '[') {
                echo(body, function (body) {
                    consoleJson(body, console.log);
                });
            }
            else {
                console.log(body);
            }
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