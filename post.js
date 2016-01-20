#! /usr/bin/env node

var func = require('./func.js');
var args = process.argv.slice(2);
var url = args[0];
var data = args[1];
var options = {
    encode: 'utf8'
};

if (url) {
    func.initOptions(url, 'p', options);
    if (data) {
        console.log(data);
        try {
            data = JSON.parse(data);
            func.extend(options, data);
        }
        catch (ex) {
            throw new Error('Second arg must be a json string.');
        }
    }
    func.handleRequest('p', options);
}
else {
    var help = ''
        + 'post help:\n'
        + '    POST: post [http://]www.example.com[?query=xxxx] [\'{"headers": {"User-Agent": "request"}, "form": {"name": "name"}}\']\n';
    console.log(help);
}


