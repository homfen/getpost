#! /usr/bin/env node

var func = require('./func.js');
var args = process.argv.slice(2);
var url = args[0];
var options = {
    encode: 'utf8'
};

if (url) {
    func.initOptions(url, 'g', options);
    func.handleRequest('g', options);
}
else {
    var help = ''
        + 'get help:\n'
        + '    GET: get [http://]www.example.com?query=xxxx\n';
    console.log(help);
}


