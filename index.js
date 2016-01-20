#! /usr/bin/env node

var func = require('./func.js');
var args = process.argv.slice(2);
var method = args[0];
var url = args[1];
var data = args[2];
var options = {
    encode: 'utf8'
};

if (method && !url) {
    url = method;
    method = 'g';
}

if (url && method) {
    func.initOptions(url, method, options);
    if (method === 'p' && data) {
        try {
            data = JSON.parse(data);
            func.extend(options, data);
        }
        catch (ex) {
            throw new Error('Second arg must be a json string.');
        }
    }
    func.handleRequest(method, options);
}
else {
    var help = ''
        + 'getpost help:\n'
        + '    GET:\n'
        + '        getpost [g] [http://]www.example.com?query=xxxx\n'
        + '        get [http://]www.example.com?query=xxxx\n'
        + '    POST:\n'
        + '        getpost p [http://]www.example.com[?query=xxxx] [\'{"headers": {"User-Agent": "request"}, "form": {"name": "name"}}\']\n'
        + '        post [http://]www.example.com[?query=xxxx] [\'{"headers": {"User-Agent": "request"}, "form": {"name": "name"}}\']\n'
        + '    For pretty-printing JSON, run "npm install -g json"\n';
    console.log(help);
}


