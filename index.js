#! /usr/bin/env node

var request = require('request');
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
        try {
            console.log(JSON.parse(body));
        }
        catch (ex) {
            console.log(body);
        }
    }
});
