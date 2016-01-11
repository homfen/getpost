#! /usr/bin/env node

var request = require('request');
var exec = require('child_process').exec;
var args = process.argv.slice(2);
var method = args[0];
var url = args[1];
var options = {
    encode: 'utf8'
};

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
